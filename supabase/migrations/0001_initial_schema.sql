-- Create Profiles Table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  wallet_balance NUMERIC(15, 2) DEFAULT 0.00,
  total_profit NUMERIC(15, 2) DEFAULT 0.00,
  referral_earnings NUMERIC(15, 2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Plans Table
CREATE TABLE public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  min_amount NUMERIC(15, 2) NOT NULL,
  max_amount NUMERIC(15, 2),
  duration_days INTEGER NOT NULL,
  daily_roi_percentage NUMERIC(5, 4) NOT NULL,
  description TEXT
);

-- Create Investments Table
CREATE TABLE public.investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.plans(id) ON DELETE RESTRICT,
  amount NUMERIC(15, 2) NOT NULL,
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  status TEXT CHECK (status IN ('active', 'completed', 'cancelled')) DEFAULT 'active',
  profit_earned NUMERIC(15, 2) DEFAULT 0.00
);

-- Create Transactions Table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('deposit', 'withdrawal', 'investment', 'profit', 'referral_bonus')),
  amount NUMERIC(15, 2) NOT NULL,
  status TEXT CHECK (status IN ('completed', 'pending', 'failed')),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Referrals Table
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  referred_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  commission_earned NUMERIC(15, 2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX ON public.investments (user_id);
CREATE INDEX ON public.transactions (user_id);
CREATE INDEX ON public.referrals (referrer_id);
CREATE INDEX ON public.referrals (referred_id);


-- Function to automatically create a profile for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- Seed initial investment plans
INSERT INTO public.plans (name, min_amount, max_amount, duration_days, daily_roi_percentage, description) VALUES
('Starter Plan', 500.00, 4999.00, 30, 0.005, 'A great way to get started with smaller investments.'),
('Professional Plan', 5000.00, 24999.00, 60, 0.007, 'For serious investors looking for higher returns.'),
('Enterprise Plan', 25000.00, NULL, 90, 0.01, 'Maximum returns for enterprise-level investments.');

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Policies for profiles table
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Policies for plans table
CREATE POLICY "Users can view all plans" ON public.plans FOR SELECT USING (true);

-- Policies for investments table
CREATE POLICY "Users can view their own investments" ON public.investments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own investments" ON public.investments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for transactions table
CREATE POLICY "Users can view their own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for referrals table
CREATE POLICY "Users can view their own referrals" ON public.referrals FOR SELECT USING (auth.uid() = referrer_id);
CREATE POLICY "Users can create referrals" ON public.referrals FOR INSERT WITH CHECK (auth.uid() = referrer_id);

-- Function to create an investment and update wallet
CREATE OR REPLACE FUNCTION public.create_investment_and_update_wallet(
  p_user_id UUID,
  p_plan_id UUID,
  p_amount NUMERIC,
  p_duration_days INTEGER
)
RETURNS VOID AS $$
DECLARE
  v_end_date TIMESTAMPTZ;
  v_plan_name TEXT;
BEGIN
  -- Calculate end date
  v_end_date := NOW() + (p_duration_days * INTERVAL '1 day');
  
  -- Get plan name for transaction description
  SELECT name INTO v_plan_name FROM public.plans WHERE id = p_plan_id;

  -- Insert into investments
  INSERT INTO public.investments (user_id, plan_id, amount, end_date, status)
  VALUES (p_user_id, p_plan_id, p_amount, v_end_date, 'active');

  -- Update user's wallet balance
  UPDATE public.profiles
  SET wallet_balance = wallet_balance - p_amount
  WHERE id = p_user_id;

  -- Insert into transactions
  INSERT INTO public.transactions (user_id, type, amount, status, description)
  VALUES (p_user_id, 'investment', p_amount, 'completed', 'Investment in ' || v_plan_name);

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;