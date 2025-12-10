'use client';

import { AdminLayout } from '@/components/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Edit, Ban, CheckCircle, DollarSign } from 'lucide-react';

export default function AdminUsersPage() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', balance: '$127,459.82', invested: '$85,000', status: 'Active', kyc: 'Verified', joined: 'Jan 15, 2025' },
    { id: 2, name: 'Alice Johnson', email: 'alice@example.com', balance: '$45,230.00', invested: '$30,000', status: 'Active', kyc: 'Verified', joined: 'Feb 20, 2025' },
    { id: 3, name: 'Bob Smith', email: 'bob@example.com', balance: '$89,750.50', invested: '$55,000', status: 'Active', kyc: 'Pending', joined: 'Mar 10, 2025' },
    { id: 4, name: 'Carol Davis', email: 'carol@example.com', balance: '$32,100.00', invested: '$20,000', status: 'Suspended', kyc: 'Verified', joined: 'Apr 5, 2025' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', balance: '$156,890.75', invested: '$100,000', status: 'Active', kyc: 'Verified', joined: 'May 12, 2025' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">View and manage all platform users</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
            Add New User
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input placeholder="Search users by name or email..." className="pl-10" />
              </div>
              <select className="border border-gray-300 rounded-md px-4 py-2">
                <option>All Status</option>
                <option>Active</option>
                <option>Suspended</option>
                <option>Pending</option>
              </select>
              <select className="border border-gray-300 rounded-md px-4 py-2">
                <option>All KYC</option>
                <option>Verified</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Invested</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">KYC</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{user.balance}</td>
                      <td className="px-6 py-4 text-gray-900">{user.invested}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.kyc === 'Verified' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {user.kyc}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit size={16} />
                          </Button>
                          <Button size="sm" variant="outline">
                            <DollarSign size={16} />
                          </Button>
                          <Button size="sm" variant="outline">
                            {user.status === 'Active' ? <Ban size={16} /> : <CheckCircle size={16} />}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600">Showing 1-5 of 50,234 users</p>
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
