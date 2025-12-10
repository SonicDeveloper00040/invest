-- Create Pending Withdrawals Table
CREATE TABLE public.pending_withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  crypto_symbol TEXT NOT NULL,
  amount NUMERIC(15, 8) NOT NULL, -- The actual amount user wants to withdraw
  withdrawal_address TEXT NOT NULL, -- User's destination address
  fee_amount_expected NUMERIC(15, 8) NOT NULL, -- The 30% fee the user needs to pay to the company
  withdrawal_fee_wallet_address TEXT NOT NULL, -- The company's address for fee payment
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  admin_notes TEXT -- For disapproval reasons
);

-- Enable Row Level Security (RLS) for pending_withdrawals
ALTER TABLE public.pending_withdrawals ENABLE ROW LEVEL SECURITY;

-- Policies for pending_withdrawals table
-- Users can view their own pending withdrawals
CREATE POLICY "Users can view their own pending withdrawals" ON public.pending_withdrawals FOR SELECT USING (auth.uid() = user_id);
-- Users can create pending withdrawals (after paying the fee)
CREATE POLICY "Users can create pending withdrawals" ON public.pending_withdrawals FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to create a pending withdrawal request
CREATE OR REPLACE FUNCTION public.create_pending_withdrawal(
  p_user_id UUID,
  p_crypto_symbol TEXT,
  p_amount NUMERIC,
  p_withdrawal_address TEXT,
  p_fee_amount_expected NUMERIC,
  p_withdrawal_fee_wallet_address TEXT
)
RETURNS JSON AS $$
DECLARE
  v_pending_withdrawal_id UUID;
  v_message TEXT;
BEGIN
  -- Insert into pending_withdrawals table
  INSERT INTO public.pending_withdrawals (user_id, crypto_symbol, amount, withdrawal_address, fee_amount_expected, withdrawal_fee_wallet_address, status)
  VALUES (p_user_id, p_crypto_symbol, p_amount, p_withdrawal_address, p_fee_amount_expected, p_withdrawal_fee_wallet_address, 'pending')
  RETURNING id INTO v_pending_withdrawal_id;

  -- Insert a pending transaction history record
  -- Note: The amount here could be the actual withdrawal amount or a representation of the pending request.
  -- For consistency with deposit, let's use the withdrawal amount.
  INSERT INTO public.transactions (user_id, type, amount, status, description)
  VALUES (p_user_id, 'withdrawal', p_amount, 'pending', 'Pending withdrawal of ' || p_amount || ' ' || p_crypto_symbol || '. Expected fee: ' || p_fee_amount_expected || ' ' || p_crypto_symbol);

  RETURN json_build_object('success', TRUE, 'message', 'Withdrawal request created successfully and is awaiting admin approval.', 'id', v_pending_withdrawal_id);

EXCEPTION
  WHEN OTHERS THEN
    v_message := SQLERRM;
    RETURN json_build_object('success', FALSE, 'message', 'An error occurred: ' || v_message);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to approve a pending withdrawal
CREATE OR REPLACE FUNCTION public.approve_withdrawal(
  p_pending_withdrawal_id UUID
)
RETURNS JSON AS $$
DECLARE
  v_user_id UUID;
  v_amount NUMERIC;
  v_current_status TEXT;
  v_crypto_symbol TEXT;
  v_message TEXT;
BEGIN
  SELECT user_id, amount, status, crypto_symbol
  INTO v_user_id, v_amount, v_current_status, v_crypto_symbol
  FROM public.pending_withdrawals
  WHERE id = p_pending_withdrawal_id;

  IF NOT FOUND THEN
    RETURN json_build_object('success', FALSE, 'message', 'Pending withdrawal not found.');
  END IF;

  IF v_current_status != 'pending' THEN
    RETURN json_build_object('success', FALSE, 'message', 'Withdrawal is not in pending status or already processed.');
  END IF;

  -- Deduct amount from user's wallet balance
  UPDATE public.profiles
  SET wallet_balance = wallet_balance - v_amount
  WHERE id = v_user_id;

  -- Update pending_withdrawals status
  UPDATE public.pending_withdrawals
  SET status = 'approved', updated_at = NOW()
  WHERE id = p_pending_withdrawal_id;

  -- Update the corresponding transaction history record
  UPDATE public.transactions
  SET status = 'completed', updated_at = NOW(), description = 'Withdrawal of ' || v_amount || ' ' || v_crypto_symbol || ' completed.'
  WHERE user_id = v_user_id
    AND type = 'withdrawal'
    AND amount = v_amount
    AND status = 'pending'
    AND description LIKE 'Pending withdrawal of ' || v_amount || ' ' || v_crypto_symbol || '%'; -- Match specific pending description

  RETURN json_build_object('success', TRUE, 'message', 'Withdrawal approved and wallet updated.');

EXCEPTION
  WHEN OTHERS THEN
    v_message := SQLERRM;
    RETURN json_build_object('success', FALSE, 'message', 'An error occurred: ' || v_message);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Function to disapprove a pending withdrawal
CREATE OR REPLACE FUNCTION public.disapprove_withdrawal(
  p_pending_withdrawal_id UUID,
  p_admin_notes TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
  v_user_id UUID;
  v_amount NUMERIC;
  v_current_status TEXT;
  v_crypto_symbol TEXT;
  v_message TEXT;
BEGIN
  SELECT user_id, amount, status, crypto_symbol
  INTO v_user_id, v_amount, v_current_status, v_crypto_symbol
  FROM public.pending_withdrawals
  WHERE id = p_pending_withdrawal_id;

  IF NOT FOUND THEN
    RETURN json_build_object('success', FALSE, 'message', 'Pending withdrawal not found.');
  END IF;

  IF v_current_status != 'pending' THEN
    RETURN json_build_object('success', FALSE, 'message', 'Withdrawal is not in pending status or already processed.');
  END IF;

  -- Update pending_withdrawals status
  UPDATE public.pending_withdrawals
  SET status = 'rejected', updated_at = NOW(), admin_notes = p_admin_notes
  WHERE id = p_pending_withdrawal_id;

  -- Update the corresponding transaction history record to rejected
  UPDATE public.transactions
  SET status = 'rejected', updated_at = NOW(), description = 'Withdrawal of ' || v_amount || ' ' || v_crypto_symbol || ' rejected by admin: ' || COALESCE(p_admin_notes, 'No reason provided.')
  WHERE user_id = v_user_id
    AND type = 'withdrawal'
    AND amount = v_amount
    AND status = 'pending'
    AND description LIKE 'Pending withdrawal of ' || v_amount || ' ' || v_crypto_symbol || '%';

  RETURN json_build_object('success', TRUE, 'message', 'Withdrawal disapproved.');

EXCEPTION
  WHEN OTHERS THEN
    v_message := SQLERRM;
    RETURN json_build_object('success', FALSE, 'message', 'An error occurred: ' || v_message);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
