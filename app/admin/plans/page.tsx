'use client';

import { AdminLayout } from '@/components/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function AdminPlansPage() {
  const plans = [
    { id: 1, name: 'Starter', minDeposit: '$500', maxDeposit: '$4,999', returnRate: '8-12%', duration: '30 days', active: true, users: 12456, totalInvested: '$124.5M' },
    { id: 2, name: 'Professional', minDeposit: '$5,000', maxDeposit: '$24,999', returnRate: '15-20%', duration: '60 days', active: true, users: 8234, totalInvested: '$411.7M' },
    { id: 3, name: 'Enterprise', minDeposit: '$25,000', maxDeposit: 'Unlimited', returnRate: '25-35%', duration: '90 days', active: true, users: 2145, totalInvested: '$536.2M' },
    { id: 4, name: 'VIP Elite', minDeposit: '$100,000', maxDeposit: 'Unlimited', returnRate: '40-50%', duration: '180 days', active: true, users: 234, totalInvested: '$234.0M' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Investment Plans</h1>
            <p className="text-gray-600 mt-2">Manage investment plans and settings</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
            <Plus className="mr-2" size={20} />
            Create New Plan
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        plan.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {plan.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6 mt-3">
                      <div>
                        <p className="text-sm text-gray-600">Active Users</p>
                        <p className="text-xl font-semibold text-gray-900">{plan.users.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Invested</p>
                        <p className="text-xl font-semibold text-gray-900">{plan.totalInvested}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit size={16} className="mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Minimum Deposit</p>
                    <p className="font-semibold text-gray-900">{plan.minDeposit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Maximum Deposit</p>
                    <p className="font-semibold text-gray-900">{plan.maxDeposit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Return Rate</p>
                    <p className="font-semibold text-green-600">{plan.returnRate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Duration</p>
                    <p className="font-semibold text-gray-900">{plan.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Daily ROI</p>
                    <p className="font-semibold text-blue-600">0.3%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Create/Edit Investment Plan</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Plan Name</label>
                <Input placeholder="e.g., Starter" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (days)</label>
                <Input type="number" placeholder="30" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Deposit ($)</label>
                <Input type="number" placeholder="500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Deposit ($)</label>
                <Input type="number" placeholder="4999" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Min Return Rate (%)</label>
                <Input type="number" placeholder="8" step="0.1" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Max Return Rate (%)</label>
                <Input type="number" placeholder="12" step="0.1" />
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
                Save Plan
              </Button>
              <Button variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
