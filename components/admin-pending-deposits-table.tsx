'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client'; // Supabase client for client-side actions

type PendingDeposit = {
  id: string;
  user_id: string;
  crypto_symbol: string;
  expected_crypto_amount: number;
  expected_usd_amount: number;
  deposit_address: string;
  status: string; // Should always be 'pending' for this component
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
  } | null;
};

interface AdminPendingDepositsTableProps {
  initialPendingDeposits: PendingDeposit[];
}

export function AdminPendingDepositsTable({ initialPendingDeposits }: AdminPendingDepositsTableProps) {
  const [pendingDeposits, setPendingDeposits] = useState<PendingDeposit[]>(initialPendingDeposits);
  const supabase = createClient();

  const refreshDeposits = async () => {
    const { data: refreshedDeposits, error } = await supabase
      .from('pending_deposits')
      .select('*, profiles(full_name, email)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error refreshing pending deposits:', error);
      toast.error('Failed to refresh pending deposits.');
    } else {
      setPendingDeposits(refreshedDeposits || []);
    }
  };

  const handleApprove = async (id: string) => {
    const { data, error } = await supabase.rpc('approve_deposit', { p_pending_deposit_id: id });
    if (error) {
      toast.error(`Approval failed: ${error.message}`);
      console.error('Approve deposit RPC error:', error);
    } else if (data && data.success) {
      toast.success(data.message);
      refreshDeposits(); // Refresh list after approval
    } else if (data && !data.success) {
      toast.error(`Approval failed: ${data.message}`);
    } else {
      toast.error('An unexpected error occurred during approval.');
    }
  };

  const handleDisapprove = async (id: string) => {
    // Optionally, could prompt for admin notes here
    const { data, error } = await supabase.rpc('disapprove_deposit', { p_pending_deposit_id: id, p_admin_notes: 'Manually rejected by admin.' });
    if (error) {
      toast.error(`Rejection failed: ${error.message}`);
      console.error('Disapprove deposit RPC error:', error);
    } else if (data && data.success) {
      toast.success(data.message);
      refreshDeposits(); // Refresh list after disapproval
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
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Deposit ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User (Email)</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Crypto</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Expected Crypto Amt</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Expected USD Amt</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Deposit Address</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {pendingDeposits.length > 0 ? (
            pendingDeposits.map((deposit) => (
              <tr key={deposit.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-sm text-gray-900">{deposit.id.substring(0, 8)}...</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {deposit.profiles?.full_name} ({deposit.profiles?.email})
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{deposit.crypto_symbol}</td>
                <td className="px-6 py-4 font-semibold text-sm text-gray-900">{deposit.expected_crypto_amount}</td>
                <td className="px-6 py-4 text-sm text-gray-900">${deposit.expected_usd_amount.toFixed(2)}</td>
                <td className="px-6 py-4 font-mono text-xs text-gray-600 break-all">{deposit.deposit_address}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    deposit.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''
                  }`}>
                    {deposit.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(deposit.created_at).toUTCString()}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(deposit.id)}>
                      <CheckCircle size={16} className="mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50" onClick={() => handleDisapprove(deposit.id)}>
                      <XCircle size={16} className="mr-1" />
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500">
                No pending deposits found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
