import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { HistoryPageClient } from './HistoryPageClient';
import { type Investment, type Transaction } from '@/lib/types';

export default async function HistoryPage() {
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
        remove(name: string) {
          cookieStore.delete(name);
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  let activeInvestments: Investment[] = [];
  let completedInvestments: Investment[] = [];
  let transactions: Transaction[] = [];

  if (user) {
    const { data: investments } = await supabase.from('investments').select('*, plans(*)').eq('user_id', user.id);
    if (investments) {
      activeInvestments = investments.filter(inv => inv.status === 'active');
      completedInvestments = investments.filter(inv => inv.status === 'completed');
    }

    const { data: txs } = await supabase.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    transactions = txs || [];
  }

  return (
    <HistoryPageClient
      activeInvestments={activeInvestments}
      completedInvestments={completedInvestments}
      transactions={transactions}
    />
  );
}
