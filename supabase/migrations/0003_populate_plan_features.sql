UPDATE public.plans
SET features = '["Daily Returns", "Basic Support", "Secure Wallet", "Withdraw Anytime"]'::jsonb
WHERE name = 'Starter Plan';

UPDATE public.plans
SET features = '["Higher Returns", "Priority Support", "Advanced Analytics", "Dedicated Manager"]'::jsonb
WHERE name = 'Professional Plan';

UPDATE public.plans
SET features = '["Maximum Returns", "VIP Support", "Personal Strategy", "Insurance Coverage"]'::jsonb
WHERE name = 'Enterprise Plan';