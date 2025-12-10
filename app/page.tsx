'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Shield, TrendingUp, Zap, Users, Award, Lock, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <main className="pt-16">
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-500/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-block">
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                    Trusted by 50,000+ investors worldwide
                  </span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Invest in
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Crypto</span>
                  <br />
                  Grow Your Wealth
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Professional cryptocurrency investment platform with proven strategies, transparent operations, and consistent returns. Start building your digital asset portfolio today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-lg px-8 h-14 w-full sm:w-auto">
                      Start Investing
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </Link>
                  <Link href="/plans">
                    <Button size="lg" variant="outline" className="text-lg px-8 h-14 w-full sm:w-auto">
                      View Plans
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-8 pt-8 border-t">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">$2.4B+</div>
                    <div className="text-sm text-gray-600">Assets Managed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">50K+</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Portfolio Value</span>
                      <span className="text-green-600 text-sm font-semibold">+24.5%</span>
                    </div>
                    <div className="text-4xl font-bold text-gray-900">$127,459.82</div>
                    <div className="h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-end p-4">
                      <div className="w-full flex items-end justify-between space-x-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85].map((height, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-500 rounded-t" style={{ height: `${height}%` }}></div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-600">Bitcoin</div>
                        <div className="text-lg font-bold text-gray-900">2.45 BTC</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-600">Ethereum</div>
                        <div className="text-lg font-bold text-gray-900">18.7 ETH</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-600">USDT</div>
                        <div className="text-lg font-bold text-gray-900">$45K</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-2xl -z-0"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Tandress?</h2>
              <p className="text-xl text-gray-600">Industry-leading features and security for your peace of mind</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Bank-Grade Security', desc: 'Military-grade encryption and multi-layer security protocols protect your assets 24/7.' },
                { icon: TrendingUp, title: 'Proven Returns', desc: 'Consistent performance with transparent tracking and detailed analytics.' },
                { icon: Zap, title: 'Instant Transactions', desc: 'Lightning-fast deposits and withdrawals processed within minutes.' },
                { icon: Users, title: 'Expert Team', desc: 'Seasoned professionals with decades of combined trading experience.' },
                { icon: Award, title: 'Licensed & Regulated', desc: 'Fully compliant with international financial regulations and standards.' },
                { icon: Lock, title: 'Asset Protection', desc: 'Insurance coverage and cold storage for maximum security.' },
              ].map((feature, i) => (
                <Card key={i} className="border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Investment Plans</h2>
              <p className="text-xl text-blue-100">Choose the plan that fits your investment goals</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Starter', min: '$500', max: '$4,999', return: '8-12%', duration: '30 days', features: ['Daily Returns', 'Basic Support', 'Secure Wallet', 'Withdrawal Anytime'] },
                { name: 'Professional', min: '$5,000', max: '$24,999', return: '15-20%', duration: '60 days', features: ['Higher Returns', 'Priority Support', 'Advanced Analytics', 'Dedicated Manager'], popular: true },
                { name: 'Enterprise', min: '$25,000', max: 'Unlimited', return: '25-35%', duration: '90 days', features: ['Maximum Returns', '24/7 VIP Support', 'Personal Strategy', 'Insurance Coverage'] },
              ].map((plan, i) => (
                <Card key={i} className={`${plan.popular ? 'ring-4 ring-yellow-400 transform scale-105' : ''} bg-white`}>
                  {plan.popular && (
                    <div className="bg-yellow-400 text-center py-2 rounded-t-lg">
                      <span className="text-sm font-bold text-gray-900">MOST POPULAR</span>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-blue-600 mb-2">{plan.return}</div>
                    <div className="text-gray-600 mb-6">Expected Return</div>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Minimum:</span>
                        <span className="font-semibold">{plan.min}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Maximum:</span>
                        <span className="font-semibold">{plan.max}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold">{plan.duration}</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center text-gray-700">
                          <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={18} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/signup">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                        Choose Plan
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Investors Worldwide</h2>
              <p className="text-xl text-gray-600">Join thousands of satisfied investors</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Sarah Johnson', role: 'Professional Trader', text: 'Best crypto investment platform I have used. The returns are consistent and withdrawals are always processed on time.', rating: 5 },
                { name: 'Michael Chen', role: 'Business Owner', text: 'Started with the Starter plan and upgraded to Professional. The support team is excellent and very responsive.', rating: 5 },
                { name: 'Emma Williams', role: 'Digital Nomad', text: 'I have been investing for 8 months now. The platform is user-friendly and the profits are impressive.', rating: 5 },
              ].map((testimonial, i) => (
                <Card key={i} className="bg-white hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <span key={j} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">{testimonial.text}</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Investment Journey?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of investors who are already growing their wealth with Tandress
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-12 h-14">
                Create Free Account
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
