'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, DollarSign, Users } from 'lucide-react';
import Link from 'next/link';
import { useProfile } from '@/contexts/profile-context';
import { type Investment, type Transaction, type PortfolioData } from '@/lib/types';

interface DashboardPageClientProps {
  activeInvestments: Investment[];
  recentTransactions: Transaction[];
  portfolioData: PortfolioData | null;
}

export function DashboardPageClient({ activeInvestments, recentTransactions, portfolioData }: DashboardPageClientProps) {
  const { profile } = useProfile();

  const totalActiveInvestments = activeInvestments.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back, {profile?.full_name || 'User'}! Here is your investment summary.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Balance</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">${portfolioData?.current_portfolio_value?.toFixed(2) || '0.00'}</p>
                            {portfolioData && (
                              <p className={`text-sm flex items-center mt-2 ${portfolioData.roi_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {portfolioData.roi_percentage >= 0 ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                                {portfolioData.roi_percentage ? `${portfolioData.roi_percentage >= 0 ? '+' : ''}${portfolioData.roi_percentage.toFixed(2)}% ROI` : '0.00% ROI'}
                              </p>
                            )}              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                <Wallet className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Investments</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${totalActiveInvestments.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-2">{activeInvestments.length} investments</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center">
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Profit</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">${portfolioData?.total_profit_loss?.toFixed(2) || '0.00'}</p>
                            {portfolioData && (
                              <p className={`text-sm flex items-center mt-2 ${portfolioData.roi_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {portfolioData.roi_percentage >= 0 ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                                {portfolioData.roi_percentage ? `${portfolioData.roi_percentage >= 0 ? '+' : ''}${portfolioData.roi_percentage.toFixed(2)}% ROI` : '0.00% ROI'}
                              </p>
                            )}              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                <DollarSign className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Referral Earnings</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${profile?.referral_earnings?.toFixed(2) || '0.00'}</p>

              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Historical data not yet available.</p>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Current Portfolio Value:</p>
              <p className="text-3xl font-bold text-gray-900">${portfolioData?.current_portfolio_value?.toFixed(2) || '0.00'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Investments</h3>
            <div className="space-y-4">
              {activeInvestments.length > 0 ? activeInvestments.map((investment, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{investment.plans?.name}</p>
                      <p className="text-sm text-gray-600">Invested: ${investment.amount.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-semibold">${investment.profit_earned.toFixed(2)}</p>
                      <p className="text-xs text-gray-600">{new Date(investment.end_date).toLocaleDateString('en-CA')}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2 rounded-full" style={{ width: `${(investment.profit_earned / investment.amount) * 100}%` }}></div>
                  </div>
                </div>
              )) : <p>No active investments.</p>}
            </div>
            <Link href="/dashboard/invest">
              <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-500">
                New Investment
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {recentTransactions.length > 0 ? recentTransactions.map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'deposit' ? 'bg-green-100' : tx.type === 'withdrawal' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {tx.amount > 0 ? <ArrowDownRight className="text-green-600" size={20} /> : <ArrowUpRight className="text-red-600" size={20} />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 capitalize">{tx.type}</p>
                    <p className="text-sm text-gray-600">{tx.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>{tx.amount > 0 ? '+' : ''}${tx.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{new Date(tx.created_at).toLocaleDateString('en-CA')}</p>
                </div>
              </div>
            )) : <p>No recent transactions.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
