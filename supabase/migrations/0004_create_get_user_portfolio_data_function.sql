CREATE OR REPLACE FUNCTION public.get_user_portfolio_data(p_user_id UUID)
RETURNS TABLE (
  total_invested NUMERIC,
  current_portfolio_value NUMERIC,
  total_profit_loss NUMERIC,
  roi_percentage NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_total_invested NUMERIC := 0;
  v_current_portfolio_value NUMERIC := 0;
  v_total_profit_loss NUMERIC := 0;
  v_wallet_balance NUMERIC := 0;
BEGIN
  -- Get wallet balance
  SELECT wallet_balance INTO v_wallet_balance
  FROM public.profiles
  WHERE id = p_user_id;

  -- Calculate total invested
  SELECT COALESCE(SUM(i.amount), 0)
  INTO v_total_invested
  FROM public.investments i
  WHERE i.user_id = p_user_id AND i.status = 'active';

  -- Calculate current portfolio value from active investments using each plan's daily ROI
  SELECT COALESCE(SUM(
    i.amount + (i.amount * pl.daily_roi_percentage * EXTRACT(EPOCH FROM (NOW() - i.start_date)) / (60*60*24))
  ), 0)
  INTO v_current_portfolio_value
  FROM public.investments i
  JOIN public.plans pl ON i.plan_id = pl.id
  WHERE i.user_id = p_user_id AND i.status = 'active';

  -- Sum profit from completed investments
  SELECT COALESCE(SUM(profit_earned), 0) INTO v_total_profit_loss
  FROM public.investments
  WHERE user_id = p_user_id AND status = 'completed';

  -- Add current calculated profit from active investments to total profit/loss
  v_total_profit_loss := v_total_profit_loss + (v_current_portfolio_value - v_total_invested);

  -- Calculate ROI percentage
  IF v_total_invested > 0 THEN
    roi_percentage := (v_total_profit_loss / v_total_invested) * 100;
  ELSE
    roi_percentage := 0;
  END IF;

  -- Set output columns; include wallet balance in portfolio value
  total_invested := v_total_invested;
  current_portfolio_value := v_current_portfolio_value + v_wallet_balance;
  total_profit_loss := v_total_profit_loss;

  RETURN NEXT;
END;
$$;

-- Grant usage to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_portfolio_data(UUID) TO authenticated;