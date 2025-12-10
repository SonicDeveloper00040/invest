'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, TrendingUp, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { type Investment, type Transaction } from '@/lib/types';

interface HistoryPageClientProps {
  activeInvestments: Investment[];
  completedInvestments: Investment[];
  transactions: Transaction[];
}

export function HistoryPageClient({ activeInvestments, completedInvestments, transactions }: HistoryPageClientProps) {
  const calculateProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const totalDuration = end - start;
    const elapsedTime = now - start;
    if (totalDuration <= 0) return 100;
    const progress = Math.min(100, (elapsedTime / totalDuration) * 100);
    return Math.round(progress);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Investment History</h1>
        <p className="text-gray-600 mt-2">Track all your investments and transactions</p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="active">Active Investments</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="transactions">All Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeInvestments.length > 0 ? activeInvestments.map((investment, i) => {
            const progress = calculateProgress(investment.start_date, investment.end_date);
            return (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{investment.plans?.name}</h3>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center">
                          <Clock size={12} className="mr-1" />
                          {investment.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Invested: {new Date(investment.start_date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">Matures: {new Date(investment.end_date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">${investment.amount}</p>
                      <p className="text-green-600 font-semibold">+${investment.profit_earned}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-3 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          }) : <p>No active investments.</p>}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedInvestments.length > 0 ? completedInvestments.map((investment, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{investment.plans?.name}</h3>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold flex items-center">
                        <CheckCircle size={12} className="mr-1" />
                        {investment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Invested: {new Date(investment.start_date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Completed: {new Date(investment.end_date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${investment.amount}</p>
                    <p className="text-green-600 font-semibold">+${investment.profit_earned}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )) : <p>No completed investments.</p>}
        </TabsContent>

        <TabsContent value="transactions" className="space-y-3">
          {transactions.length > 0 ? transactions.map((tx, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      tx.type === 'deposit' ? 'bg-green-100' :
                      tx.type === 'withdrawal' ? 'bg-red-100' :
                      tx.type === 'profit' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {tx.type === 'deposit' ? <ArrowDownCircle className="text-green-600" size={24} /> :
                       tx.type === 'withdrawal' ? <ArrowUpCircle className="text-red-600" size={24} /> :
                       tx.type === 'profit' ? <TrendingUp className="text-blue-600" size={24} /> :
                       <TrendingUp className="text-purple-600" size={24} />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 capitalize">{tx.type}</p>
                      <p className="text-sm text-gray-600">{tx.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(tx.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                      {tx.amount > 0 ? '+' : ''}${tx.amount}
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      tx.status === 'completed' ? 'bg-green-100 text-green-700' :
                      tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )) : <p>No transactions yet.</p>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
