CREATE OR REPLACE FUNCTION public.process_withdrawal(
  p_user_id UUID,
  p_amount NUMERIC,
  p_withdrawal_address TEXT,
  p_crypto_symbol TEXT,
  p_network_fee NUMERIC
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_balance NUMERIC;
  v_transaction_id UUID;
  v_amount_to_deduct NUMERIC;
  v_amount_received NUMERIC;
BEGIN
  -- Get current wallet balance
  SELECT wallet_balance INTO v_current_balance
  FROM public.profiles
  WHERE id = p_user_id;

  v_amount_to_deduct := p_amount;
  v_amount_received := p_amount - p_network_fee;

  -- Check if user has sufficient balance
  IF v_current_balance < v_amount_to_deduct THEN
    RETURN json_build_object('success', FALSE, 'message', 'Insufficient wallet balance.');
  END IF;

  -- Deduct amount from wallet balance
  UPDATE public.profiles
  SET wallet_balance = wallet_balance - v_amount_to_deduct
  WHERE id = p_user_id;

  -- Record the withdrawal transaction
  INSERT INTO public.transactions (user_id, type, amount, status, description)
  VALUES (p_user_id, 'withdrawal', v_amount_to_deduct, 'pending', 'Withdrawal of ' || p_amount || ' ' || p_crypto_symbol || ' to ' || p_withdrawal_address)
  RETURNING id INTO v_transaction_id;

  RETURN json_build_object('success', TRUE, 'message', 'Withdrawal request submitted successfully.', 'transaction_id', v_transaction_id);

EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object('success', FALSE, 'message', SQLERRM);
END;
$$;

-- Grant execution to authenticated users
GRANT EXECUTE ON FUNCTION public.process_withdrawal(UUID, NUMERIC, TEXT, TEXT, NUMERIC) TO authenticated;