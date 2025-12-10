'use client';

import { AdminLayout } from '@/components/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Platform overview and key metrics</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">50,234</p>
                  <p className="text-sm text-green-600 flex items-center mt-2">
                    <ArrowUpRight size={16} className="mr-1" />
                    +12.5% this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                  <Users className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Deposits</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">$2.4B</p>
                  <p className="text-sm text-green-600 flex items-center mt-2">
                    <ArrowUpRight size={16} className="mr-1" />
                    +8.3% this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center">
                  <DollarSign className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Withdrawals</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">$1.2B</p>
                  <p className="text-sm text-gray-600 mt-2">This month: $45M</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center">
                  <ArrowDownRight className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Investments</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">15,432</p>
                  <p className="text-sm text-gray-600 mt-2">Total: $850M</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Growth</h3>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-end p-6">
                <div className="w-full flex items-end justify-between space-x-2">
                  {[30, 45, 35, 55, 48, 65, 58, 75, 70, 85, 80, 90].map((height, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-500 rounded-t" style={{ height: `${height}%` }}></div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div>
                  <p className="text-sm text-gray-600">New Users</p>
                  <p className="text-2xl font-bold text-gray-900">+2,345</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-gray-900">1,890</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">12,456</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { user: 'john@example.com', action: 'New deposit', amount: '$25,000', time: '5 min ago' },
                  { user: 'alice@example.com', action: 'Withdrawal request', amount: '$5,000', time: '12 min ago' },
                  { user: 'bob@example.com', action: 'New investment', amount: '$50,000', time: '18 min ago' },
                  { user: 'carol@example.com', action: 'KYC submitted', amount: '-', time: '22 min ago' },
                  { user: 'david@example.com', action: 'Account created', amount: '-', time: '35 min ago' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{activity.user}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{activity.amount}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Plans Performance</h3>
            <div className="space-y-4">
              {[
                { plan: 'Starter', users: '12,456', invested: '$124.5M', profit: '$14.9M', roi: '12%' },
                { plan: 'Professional', users: '8,234', invested: '$411.7M', profit: '$74.1M', roi: '18%' },
                { plan: 'Enterprise', users: '2,145', invested: '$536.2M', profit: '$134.0M', roi: '25%' },
                { plan: 'VIP Elite', users: '234', invested: '$234.0M', profit: '$105.3M', roi: '45%' },
              ].map((plan, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{plan.plan}</h4>
                      <p className="text-sm text-gray-600">{plan.users} active users</p>
                    </div>
                    <div className="grid grid-cols-3 gap-8 text-right">
                      <div>
                        <p className="text-sm text-gray-600">Invested</p>
                        <p className="font-semibold text-gray-900">{plan.invested}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Profit Paid</p>
                        <p className="font-semibold text-green-600">{plan.profit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Avg ROI</p>
                        <p className="font-semibold text-blue-600">{plan.roi}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Actions</h3>
              <div className="space-y-3">
                {[
                  { type: 'KYC Verification', count: 23, color: 'blue' },
                  { type: 'Withdrawal Requests', count: 8, color: 'yellow' },
                  { type: 'Support Tickets', count: 15, color: 'red' },
                  { type: 'Deposit Confirmations', count: 5, color: 'green' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-900">{item.type}</span>
                    <span className={`px-4 py-2 bg-${item.color}-100 text-${item.color}-700 rounded-full font-bold`}>
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-4">
                {[
                  { service: 'API Server', status: 'Operational', uptime: '99.9%' },
                  { service: 'Database', status: 'Operational', uptime: '100%' },
                  { service: 'Payment Gateway', status: 'Operational', uptime: '99.8%' },
                  { service: 'Email Service', status: 'Operational', uptime: '99.7%' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{item.service}</p>
                      <p className="text-sm text-gray-600">Uptime: {item.uptime}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
