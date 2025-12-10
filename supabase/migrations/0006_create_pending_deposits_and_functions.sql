-- Create Pending Deposits Table
CREATE TABLE public.pending_deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  crypto_symbol TEXT NOT NULL,
  expected_crypto_amount NUMERIC(15, 8) NOT NULL, -- Increased precision for crypto amounts
  expected_usd_amount NUMERIC(15, 2) NOT NULL,
  deposit_address TEXT NOT NULL, -- Must be unique to attribute correctly
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  admin_notes TEXT -- For disapproval reasons
);

-- Enable Row Level Security (RLS) for pending_deposits
ALTER TABLE public.pending_deposits ENABLE ROW LEVEL SECURITY;

-- Policies for pending_deposits table
-- Users can view their own pending deposits
CREATE POLICY "Users can view their own pending deposits" ON public.pending_deposits FOR SELECT USING (auth.uid() = user_id);
-- Users can create pending deposits
CREATE POLICY "Users can create pending deposits" ON public.pending_deposits FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to create a pending deposit
CREATE OR REPLACE FUNCTION public.create_pending_deposit(
  p_user_id UUID,
  p_crypto_symbol TEXT,
  p_expected_crypto_amount NUMERIC,
  p_expected_usd_amount NUMERIC,
  p_deposit_address TEXT
)
RETURNS JSON AS $$
DECLARE
  v_pending_deposit_id UUID;
  v_exists BOOLEAN;
BEGIN
  -- Check if an active pending deposit with this address already exists
  SELECT EXISTS (
    SELECT 1 FROM public.pending_deposits
    WHERE deposit_address = p_deposit_address AND status = 'pending'
  ) INTO v_exists;

  IF v_exists THEN
    RETURN json_build_object('success', FALSE, 'message', 'A pending deposit with this address already exists.');
  END IF;

  INSERT INTO public.pending_deposits (user_id, crypto_symbol, expected_crypto_amount, expected_usd_amount, deposit_address, status)
  VALUES (p_user_id, p_crypto_symbol, p_expected_crypto_amount, p_expected_usd_amount, p_deposit_address, 'pending')
  RETURNING id INTO v_pending_deposit_id;

  -- Insert a pending transaction history record
  INSERT INTO public.transactions (user_id, type, amount, status, description)
  VALUES (p_user_id, 'deposit', p_expected_usd_amount, 'pending', 'Pending deposit of $' || p_expected_usd_amount || ' (' || p_expected_crypto_amount || ' ' || p_crypto_symbol || ')');

  RETURN json_build_object('success', TRUE, 'message', 'Pending deposit created successfully.', 'id', v_pending_deposit_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Function to approve a pending deposit
CREATE OR REPLACE FUNCTION public.approve_deposit(
  p_pending_deposit_id UUID
)
RETURNS JSON AS $$
DECLARE
  v_user_id UUID;
  v_expected_crypto_amount NUMERIC;
  v_deposit_address TEXT;
  v_current_status TEXT;
  v_crypto_symbol TEXT;
  v_message TEXT;
BEGIN
  SELECT user_id, expected_crypto_amount, expected_usd_amount, deposit_address, status, crypto_symbol
  INTO v_user_id, v_expected_crypto_amount, v_expected_usd_amount, v_deposit_address, v_current_status, v_crypto_symbol
  FROM public.pending_deposits
  WHERE id = p_pending_deposit_id;

  IF NOT FOUND THEN
    RETURN json_build_object('success', FALSE, 'message', 'Pending deposit not found.');
  END IF;

  IF v_current_status != 'pending' THEN
    RETURN json_build_object('success', FALSE, 'message', 'Deposit is not in pending status.');
  END IF;

  -- Update pending_deposits status
  UPDATE public.pending_deposits
  SET status = 'approved', updated_at = NOW()
  WHERE id = p_pending_deposit_id;

  -- Update user's wallet balance
  UPDATE public.profiles
  SET wallet_balance = wallet_balance + v_expected_usd_amount
  WHERE id = v_user_id;

  -- Insert into transactions
  INSERT INTO public.transactions (user_id, type, amount, status, description)
  VALUES (v_user_id, 'deposit', v_expected_usd_amount, 'completed', 'Deposit of $' || v_expected_usd_amount || ' (' || v_expected_crypto_amount || ' ' || v_crypto_symbol || ')');

  RETURN json_build_object('success', TRUE, 'message', 'Deposit approved and wallet updated.');

EXCEPTION
  WHEN OTHERS THEN
    v_message := SQLERRM;
    RETURN json_build_object('success', FALSE, 'message', 'An error occurred: ' || v_message);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Function to disapprove a pending deposit
CREATE OR REPLACE FUNCTION public.disapprove_deposit(
  p_pending_deposit_id UUID,
  p_admin_notes TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
  v_user_id UUID;
  v_current_status TEXT;
  v_message TEXT;
BEGIN
  SELECT user_id, status
  INTO v_user_id, v_current_status
  FROM public.pending_deposits
  WHERE id = p_pending_deposit_id;

  IF NOT FOUND THEN
    RETURN json_build_object('success', FALSE, 'message', 'Pending deposit not found.');
  END IF;

  IF v_current_status != 'pending' THEN
    RETURN json_build_object('success', FALSE, 'message', 'Deposit is not in pending status.');
  END IF;

  -- Update pending_deposits status
  UPDATE public.pending_deposits
  SET status = 'rejected', updated_at = NOW(), admin_notes = p_admin_notes
  WHERE id = p_pending_deposit_id;

  -- Optionally, insert a failed transaction record
  -- INSERT INTO public.transactions (user_id, type, amount, status, description)
  -- VALUES (v_user_id, 'deposit', 0, 'failed', 'Deposit rejected by admin: ' || COALESCE(p_admin_notes, 'No reason provided.'));

  RETURN json_build_object('success', TRUE, 'message', 'Deposit disapproved.');

EXCEPTION
  WHEN OTHERS THEN
    v_message := SQLERRM;
    RETURN json_build_object('success', FALSE, 'message', 'An error occurred: ' || v_message);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;