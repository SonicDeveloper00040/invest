import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Clock, DollarSign, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';

export default function PlansPage() {
  const plans = [
    {
      name: 'Starter',
      badge: 'BEGINNER FRIENDLY',
      badgeColor: 'bg-green-500',
      min: '$500',
      max: '$4,999',
      return: '8-12%',
      duration: '30 days',
      daily: '0.27-0.40%',
      features: [
        'Daily returns credited automatically',
        'Basic email support',
        'Secure wallet with 2FA',
        'Withdraw anytime without penalty',
        'Mobile app access',
        'Investment analytics dashboard',
      ]
    },
    {
      name: 'Professional',
      badge: 'MOST POPULAR',
      badgeColor: 'bg-yellow-400',
      min: '$5,000',
      max: '$24,999',
      return: '15-20%',
      duration: '60 days',
      daily: '0.25-0.33%',
      popular: true,
      features: [
        'Higher daily returns',
        'Priority customer support 24/7',
        'Advanced analytics & reporting',
        'Dedicated account manager',
        'Lower withdrawal fees',
        'Early access to new features',
        'Investment diversification options',
        'Quarterly performance reviews',
      ]
    },
    {
      name: 'Enterprise',
      badge: 'MAXIMUM RETURNS',
      badgeColor: 'bg-blue-600',
      min: '$25,000',
      max: 'Unlimited',
      return: '25-35%',
      duration: '90 days',
      daily: '0.28-0.39%',
      features: [
        'Maximum return potential',
        'VIP support - 24/7 priority line',
        'Personalized investment strategy',
        'Insurance coverage on deposits',
        'Exclusive investment opportunities',
        'Monthly strategy calls',
        'Tax reporting assistance',
        'Dedicated portfolio manager',
        'Private Telegram group',
      ]
    },
    {
      name: 'VIP Elite',
      badge: 'EXCLUSIVE',
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      min: '$100,000',
      max: 'Unlimited',
      return: '40-50%',
      duration: '180 days',
      daily: '0.22-0.28%',
      features: [
        'Highest tier returns available',
        'White-glove concierge service',
        'Custom investment strategies',
        'Full insurance coverage',
        'Direct line to C-level executives',
        'Quarterly in-person meetings',
        'Priority withdrawal processing',
        'Exclusive market insights',
        'Private investment opportunities',
        'Dedicated team of experts',
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <main className="pt-24 pb-16">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Investment Plans</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the perfect investment plan tailored to your financial goals. All plans feature transparent pricing, secure transactions, and consistent returns.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {plans.map((plan, i) => (
                <Card key={i} className={`${plan.popular ? 'ring-4 ring-blue-500 transform lg:scale-105' : 'border-2'} hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
                  <div className={`${plan.badgeColor} text-center py-2`}>
                    <span className="text-sm font-bold text-white">{plan.badge}</span>
                  </div>
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{plan.return}</span>
                        <span className="text-gray-600">Total Return</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Minimum</div>
                        <div className="text-xl font-bold text-gray-900">{plan.min}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Maximum</div>
                        <div className="text-xl font-bold text-gray-900">{plan.max}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Duration</div>
                        <div className="text-xl font-bold text-gray-900">{plan.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Daily ROI</div>
                        <div className="text-xl font-bold text-gray-900">{plan.daily}</div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="font-semibold text-gray-900 mb-4">Plan Features:</h4>
                      <ul className="space-y-3">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-start text-gray-700">
                            <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={18} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href="/signup">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-lg py-6">
                        Get Started with {plan.name}
                        <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Our Plans Stand Out</h2>
              <p className="text-xl text-gray-600">Competitive advantages that make us the preferred choice</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: TrendingUp, title: 'Consistent Returns', desc: 'Proven track record of delivering consistent returns across all market conditions.' },
                { icon: Shield, title: 'Fully Insured', desc: 'All investments are protected with comprehensive insurance coverage.' },
                { icon: Clock, title: 'Flexible Terms', desc: 'Choose plans that fit your timeline and adjust as your needs change.' },
                { icon: DollarSign, title: 'No Hidden Fees', desc: 'Transparent pricing with no surprise charges or hidden fees.' },
              ].map((item, i) => (
                <Card key={i} className="text-center hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Not Sure Which Plan to Choose?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Our investment advisors are here to help you select the perfect plan based on your financial goals.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-12 h-14">
                Talk to an Advisor
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
