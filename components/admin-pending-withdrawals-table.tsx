'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client'; // Supabase client for client-side actions

type PendingWithdrawal = {
  id: string;
  user_id: string;
  crypto_symbol: string;
  amount: number; // The actual amount user wants to withdraw
  withdrawal_address: string; // User's destination address
  fee_amount_expected: number; // The 30% fee the user needs to pay to the company
  withdrawal_fee_wallet_address: string; // The company's address for fee payment
  status: string; // Should always be 'pending' for this component
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
  } | null;
};

interface AdminPendingWithdrawalsTableProps {
  initialPendingWithdrawals: PendingWithdrawal[];
}

export function AdminPendingWithdrawalsTable({ initialPendingWithdrawals }: AdminPendingWithdrawalsTableProps) {
  const [pendingWithdrawals, setPendingWithdrawals] = useState<PendingWithdrawal[]>(initialPendingWithdrawals);
  const supabase = createClient();

  const refreshWithdrawals = async () => {
    const { data: refreshedWithdrawals, error } = await supabase
      .from('pending_withdrawals')
      .select('*, profiles(full_name, email)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error refreshing pending withdrawals:', error);
      toast.error('Failed to refresh pending withdrawals.');
    } else {
      setPendingWithdrawals(refreshedWithdrawals || []);
    }
  };

  const handleApprove = async (id: string) => {
    const { data, error } = await supabase.rpc('approve_withdrawal', { p_pending_withdrawal_id: id });
    if (error) {
      toast.error(`Approval failed: ${error.message}`);
      console.error('Approve withdrawal RPC error:', error);
    } else if (data && data.success) {
      toast.success(data.message);
      refreshWithdrawals(); // Refresh list after approval
    } else if (data && !data.success) {
      toast.error(`Approval failed: ${data.message}`);
    } else {
      toast.error('An unexpected error occurred during approval.');
    }
  };

  const handleDisapprove = async (id: string) => {
    // Optionally, could prompt for admin notes here
    const { data, error } = await supabase.rpc('disapprove_withdrawal', { p_pending_withdrawal_id: id, p_admin_notes: 'Manually rejected by admin.' });
    if (error) {
      toast.error(`Rejection failed: ${error.message}`);
      console.error('Disapprove withdrawal RPC error:', error);
    } else if (data && data.success) {
      toast.success(data.message);
      refreshWithdrawals(); // Refresh list after disapproval
    } else if (data && !data.success) {
      toast.error(`Rejection failed: ${data.message}`);
    } else {
      toast.error('An unexpected error occurred during rejection.');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Withdrawal ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User (Email)</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Crypto</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User Address</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Expected Fee</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fee Address</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {pendingWithdrawals.length > 0 ? (
            pendingWithdrawals.map((withdrawal) => (
              <tr key={withdrawal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-sm text-gray-900">{withdrawal.id.substring(0, 8)}...</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {withdrawal.profiles?.full_name} ({withdrawal.profiles?.email})
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{withdrawal.crypto_symbol}</td>
                <td className="px-6 py-4 font-semibold text-sm text-gray-900">{withdrawal.amount}</td>
                <td className="px-6 py-4 font-mono text-xs text-gray-600 break-all">{withdrawal.withdrawal_address}</td>
                <td className="px-6 py-4 font-semibold text-sm text-gray-900">{withdrawal.fee_amount_expected}</td>
                <td className="px-6 py-4 font-mono text-xs text-gray-600 break-all">{withdrawal.withdrawal_fee_wallet_address}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    withdrawal.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''
                  }`}>
                    {withdrawal.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(withdrawal.created_at).toUTCString()}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(withdrawal.id)}>
                      <CheckCircle size={16} className="mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50" onClick={() => handleDisapprove(withdrawal.id)}>
                      <XCircle size={16} className="mr-1" />
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="px-6 py-4 text-center text-sm text-gray-500">
                No pending withdrawals found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
