import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { AdminPendingWithdrawalsTable } from '@/components/admin-pending-withdrawals-table';

export const dynamic = 'force-dynamic';

export default async function AdminWithdrawalsPage() {
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

  if (!user) {
    // Handle unauthorized access or redirect to login
    return <p>Unauthorized access. Please log in as an administrator.</p>;
  }

  // Check if the user is an admin (e.g., via a 'role' column in profiles table)
  // For simplicity, this example assumes any logged-in user can access admin pages.
  // In a real app, you'd add a robust role check here.
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || profileData?.role !== 'admin') {
    return <p>Access denied. You must be an administrator to view this page.</p>;
  }

  const { data: pendingWithdrawals, error } = await supabase
    .from('pending_withdrawals')
    .select('*, profiles(full_name, email)')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pending withdrawals:', error);
    return <p>Error loading pending withdrawals: {error.message}</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin - Pending Withdrawals</h1>
        <p className="text-gray-600 mt-2">Review and manage user withdrawal requests.</p>
      </div>

      <AdminPendingWithdrawalsTable initialPendingWithdrawals={pendingWithdrawals || []} />
    </div>
  );
}
