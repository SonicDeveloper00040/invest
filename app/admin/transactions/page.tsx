

import { AdminLayout } from '@/components/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { toast } from 'sonner'; // Assuming sonner is used for toasts
import { AdminPendingDepositsTable } from "@/components/admin-pending-deposits-table";

type PendingDeposit = {
  id: string;
  user_id: string;
  crypto_symbol: string;
  expected_crypto_amount: number;
  expected_usd_amount: number;
  deposit_address: string;
  status: string;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
  } | null;
};

export default async function AdminTransactionsPage() {
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
        remove(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
      },
    }
  );

  const { data: pendingDepositsData, error: pendingDepositsError } = await supabase
    .from('pending_deposits')
    .select('*, profiles(full_name, email)')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (pendingDepositsError) {
    console.error('Error fetching pending deposits:', pendingDepositsError);
  }

  const pendingDeposits: PendingDeposit[] = pendingDepositsData || [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-2">Monitor and manage all platform transactions</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Total Deposits</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">$2.4B</p>
              <p className="text-sm text-green-600 mt-2">+$45M today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Total Withdrawals</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">$1.2B</p>
              <p className="text-sm text-gray-600 mt-2">$15M today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">{pendingDeposits.length}</p>
              <p className="text-sm text-gray-600 mt-2">Requires action</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">234</p>
              <p className="text-sm text-green-600 mt-2">$3.2M volume</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input placeholder="Search by transaction ID or user..." className="pl-10" />
              </div>
              <select className="border border-gray-300 rounded-md px-4 py-2">
                <option>All Types</option>
                <option>Deposit</option>
                <option>Withdrawal</option>
              </select>
              <select className="border border-gray-300 rounded-md px-4 py-2">
                <option>All Status</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
            </div>

            <AdminPendingDepositsTable initialPendingDeposits={pendingDeposits} />

            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600">Showing 1-{pendingDeposits.length} of {pendingDeposits.length} transactions</p>
              <div className="flex space-x-2">
                <Button variant="outline">Previous</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
