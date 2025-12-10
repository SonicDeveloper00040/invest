import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { DashboardPageClient } from './DashboardPageClient';
import { type Investment, type Transaction, type PortfolioData } from '@/lib/types';

export default async function DashboardPage() {
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

  let activeInvestments: Investment[] = [];
  let recentTransactions: Transaction[] = [];
  let portfolioData: PortfolioData | null = null; // Initialize portfolioData

  if (user) {
    const { data: investments } = await supabase.from('investments').select('*, plans(*)').eq('user_id', user.id).eq('status', 'active');
    activeInvestments = investments || [];

    const { data: transactions } = await supabase.from('transactions').select('*').eq('user_id', user.id).order('created_at', { descending: true }).limit(4);
    recentTransactions = transactions || [];

    // Fetch portfolio data
    const { data, error } = await supabase.rpc('get_user_portfolio_data', { p_user_id: user.id });

    if (error) {
      console.error('Error fetching portfolio data:', error);
    } else if (data && data.length > 0) {
      portfolioData = data[0];
    }
  }

  return <DashboardPageClient activeInvestments={activeInvestments} recentTransactions={recentTransactions} portfolioData={portfolioData} />;
}
