'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { type Plan } from '@/lib/types';

const investmentSchema = z.object({
  planId: z.string().uuid('Invalid plan ID'),
  amount: z.number().positive('Amount must be positive'),
});

export async function createInvestment(formData: { planId: string, amount: number }) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: { message: 'User not found' } };
  }

  const validatedFields = investmentSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      error: {
        message: validatedFields.error.flatten().fieldErrors,
      }
    };
  }

  const { planId, amount } = validatedFields.data;

  // 1. Get plan and profile
  const { data: plan, error: planError } = await supabase
    .from('plans')
    .select('*')
    .eq('id', planId)
    .single<Plan>();
  if (planError) {
    return { error: { message: `Failed to get plan: ${planError.message}` } };
  }
  if (!plan) {
    return { error: { message: 'Invalid plan.' } };
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  if (profileError) {
    return {
      error: { message: `Failed to get profile: ${profileError.message}` },
    };
  }
  if (!profile) {
    return { error: { message: 'Invalid user profile.' } };
  }

  // 2. Validate investment amount
  if (amount < plan.min_amount || (plan.max_amount && amount > plan.max_amount)) {
    return {
      error: {
        message: `Amount must be between ${plan.min_amount} and ${
          plan.max_amount || 'infinity'
        }`,
      },
    };
  }

  if (profile.wallet_balance < amount) {
    return { error: { message: 'Insufficient wallet balance.' } };
  }

  // 3. Create investment and update wallet in a transaction
  const { error } = await supabase.rpc('create_investment_and_update_wallet', {
    p_user_id: user.id,
    p_plan_id: plan.id,
    p_amount: amount,
    p_duration_days: plan.duration_days,
  });


  if (error) {
    return { error: { message: `Transaction failed: ${error.message}` } };
  }

  return { error: null };
}
