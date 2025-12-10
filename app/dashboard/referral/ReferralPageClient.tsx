'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Copy, DollarSign, UserPlus, Gift } from 'lucide-react';
import { type Referral, type Profile } from '@/lib/types';
import { toast } from 'sonner';

interface ReferralWithProfile extends Referral {
  referred: Profile;
}

interface ReferralPageClientProps {
  referrals: ReferralWithProfile[];
  totalEarnings: number;
  referralLink: string;
}

export function ReferralPageClient({ referrals, totalEarnings, referralLink }: ReferralPageClientProps) {

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const referralsThisMonth = referrals.filter(ref => {
    const refDate = new Date(ref.created_at);
    return refDate.getMonth() === currentMonth && refDate.getFullYear() === currentYear;
  }).length;

  const referralStats = [
    { label: 'Total Referrals', value: referrals.length, icon: Users, color: 'from-blue-600 to-cyan-500' },
    { label: 'Total Earnings', value: `$${totalEarnings.toFixed(2)}`, icon: DollarSign, color: 'from-green-600 to-emerald-500' },
    { label: 'This Month', value: referralsThisMonth, icon: UserPlus, color: 'from-purple-600 to-pink-500' },
    { label: 'Pending Bonus', value: '$0', icon: Gift, color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Referral Program</h1>
        <p className="text-gray-600 mt-2">Earn commission by referring friends and family</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {referralStats.map((stat, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Referral Link</h3>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={referralLink}
                readOnly
                className="font-mono"
              />
              <Button 
                className="bg-gradient-to-r from-blue-600 to-cyan-500 whitespace-nowrap"
                onClick={() => {
                  navigator.clipboard.writeText(referralLink);
                  toast.success('Referral link copied to clipboard!');
                }}
              >
                <Copy className="mr-2" size={18} />
                Copy Link
              </Button>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">How it works:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">1.</span>
                    <span>Share your unique referral link with friends</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">2.</span>
                    <span>They sign up and make their first investment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">3.</span>
                    <span>You earn 5% commission on their first investment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">4.</span>
                    <span>Earn 2% on second-level referrals</span>
                  </li>
                </ul>
              </div>
          </div>
        </CardContent>
      </Card>

      <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Commission Structure</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">5%</div>
                <p className="text-gray-700 font-semibold mb-1">Direct Referrals</p>
                <p className="text-sm text-gray-600">Level 1 Commission</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">2%</div>
                <p className="text-gray-700 font-semibold mb-1">Second Level</p>
                <p className="text-sm text-gray-600">Level 2 Commission</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">10%</div>
                <p className="text-gray-700 font-semibold mb-1">VIP Bonus</p>
                <p className="text-sm text-gray-600">For Premium Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Referrals</h3>
          <div className="space-y-3">
            {referrals.length > 0 ? referrals.map((referral, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                    {referral.referred.full_name?.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{referral.referred.full_name}</p>
                    <p className="text-sm text-gray-600">{referral.referred.email}</p>
                    <p className="text-xs text-gray-500">Joined: {new Date(referral.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-semibold">Your Earnings: ${referral.commission_earned.toFixed(2)}</p>
                </div>
              </div>
            )) : <p>No referrals yet.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
