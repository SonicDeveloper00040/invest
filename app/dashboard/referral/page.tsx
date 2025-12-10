import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { ReferralPageClient } from './ReferralPageClient';
import { type Referral, type Profile } from '@/lib/types';

interface ReferralWithProfile extends Referral {
  referred: Profile;
}

export default async function ReferralPage() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  let referrals: ReferralWithProfile[] = [];
  let totalEarnings = 0;
  let referralLink = '';

  if (user) {
    const { data } = await supabase
      .from('referrals')
      .select('*, referred:profiles!referred_id(*)')
      .eq('referrer_id', user.id);

    if (data) {
      referrals = data as unknown as ReferralWithProfile[];
      totalEarnings = referrals.reduce((acc, ref) => acc + ref.commission_earned, 0);
    }
    
    referralLink = `${process.env.NEXT_PUBLIC_BASE_URL}/signup?ref=${user.id}`;
  }

  return <ReferralPageClient referrals={referrals} totalEarnings={totalEarnings} referralLink={referralLink} />;
}
