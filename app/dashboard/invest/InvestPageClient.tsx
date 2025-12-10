'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, TrendingUp } from 'lucide-react';
import { type Plan } from '@/lib/types';
import { useProfile } from '@/contexts/profile-context';
import { toast } from 'sonner';
import { createInvestment } from './actions';

interface InvestPageClientProps {
  plans: Plan[];
}

export function InvestPageClient({ plans }: InvestPageClientProps) {
  const { profile } = useProfile();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [amount, setAmount] = useState<number | ''>('');

  const handleInvestment = async () => {
    if (!selectedPlan || !amount) {
      toast.error('Please select a plan and enter an amount.');
      return;
    }

    if (
      amount < selectedPlan.min_amount ||
      (selectedPlan.max_amount && amount > selectedPlan.max_amount)
    ) {
      toast.error(
        `For the ${selectedPlan.name}, the investment must be between $${
          selectedPlan.min_amount
        } and $${selectedPlan.max_amount || 'Unlimited'}.`
      );
      return;
    }

    if (profile && profile.wallet_balance < amount) {
      toast.error('Insufficient wallet balance.');
      return;
    }

    const { error } = await createInvestment({ planId: selectedPlan.id, amount });

    if (error) {
      toast.error(`Failed to create investment: ${error.message}`);
    } else {
      toast.success(`Successfully invested ${amount} in ${selectedPlan.name}!`);
      setAmount('');
      setSelectedPlan(null);
    }
  };

  const planColors: { [key: string]: string } = {
    'Starter Plan': 'from-green-500 to-emerald-500',
    'Professional Plan': 'from-blue-600 to-cyan-500',
    'Enterprise Plan': 'from-purple-600 to-pink-500',
  };



  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Investment Plans</h1>
        <p className="text-gray-600 mt-2">Choose a plan and start growing your wealth</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {plans.map((plan, i) => {
          const totalReturn = plan.daily_roi_percentage * plan.duration_days * 100;
          return (
            <Card key={i} className={`${plan.name === 'Professional Plan' ? 'ring-2 ring-blue-500' : ''} hover:shadow-xl transition-all`}>
              {plan.name === 'Professional Plan' && (
                <div className="bg-blue-600 text-white text-center py-2 rounded-t-lg font-semibold text-sm">
                  MOST POPULAR
                </div>
              )}
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className={`text-4xl font-bold bg-gradient-to-r ${planColors[plan.name]} bg-clip-text text-transparent mb-2`}>
                  {totalReturn.toFixed(2)}%
                </div>
                <p className="text-gray-600 mb-6">Total Return</p>

                <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Minimum:</span>
                    <span className="font-semibold">${plan.min_amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Maximum:</span>
                    <span className="font-semibold">{plan.max_amount ? `$${plan.max_amount}` : 'Unlimited'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{plan.duration_days} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Daily ROI:</span>
                    <span className="font-semibold">{(plan.daily_roi_percentage * 100).toFixed(2)}%</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features?.map((feature, j) => (
                    <li key={j} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className={`w-full bg-gradient-to-r ${planColors[plan.name]}`} onClick={() => { setSelectedPlan(plan); setAmount(plan.min_amount); }}>
                  Invest Now
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Make an Investment</h3>
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Plan</label>
              <div className="grid grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <Button
                    key={plan.name}
                    variant={selectedPlan?.id === plan.id ? 'default' : 'outline'}
                    className="h-20 flex-col"
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <span className="font-semibold">{plan.name}</span>
                    <span className="text-xs text-gray-600">{(plan.daily_roi_percentage * plan.duration_days * 100).toFixed(2)}%</span>
                  </Button>
                ))}
              </div>
            </div>

            {selectedPlan && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Investment Amount (USD)</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="5000"
                  className="h-12 text-lg"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Min: ${selectedPlan.min_amount} | Max: {selectedPlan.max_amount ? `$${selectedPlan.max_amount}` : 'Unlimited'} | Balance: ${profile?.wallet_balance || 0}
                </p>
              </div>
            )}

            {selectedPlan && amount && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Investment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Plan:</span>
                    <span className="font-semibold">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Investment Amount:</span>
                    <span className="font-semibold">${amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Duration:</span>
                    <span className="font-semibold">{selectedPlan.duration_days} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Expected Return:</span>
                    <span className="font-semibold">{(selectedPlan.daily_roi_percentage * selectedPlan.duration_days * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-300">
                    <span className="text-gray-700 font-semibold">Estimated Profit:</span>
                    <span className="font-bold text-green-600">${(amount * selectedPlan.daily_roi_percentage * selectedPlan.duration_days).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 h-12 text-lg"
              onClick={handleInvestment}
              disabled={!selectedPlan || !amount}
            >
              <TrendingUp className="mr-2" size={20} />
              Confirm Investment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
