import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Wallet, TrendingUp, ArrowRight, CheckCircle, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl font-bold mb-6">How It Works</h1>
              <p className="text-xl text-blue-100">
                Start your crypto investment journey in just four simple steps. No technical knowledge required.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  icon: UserPlus,
                  title: 'Create Account',
                  desc: 'Sign up in minutes with your email. Complete KYC verification for enhanced security and higher limits.',
                  details: ['Email verification', 'Identity verification', 'Secure account setup', 'Two-factor authentication']
                },
                {
                  step: '02',
                  icon: Wallet,
                  title: 'Fund Your Wallet',
                  desc: 'Deposit cryptocurrency to your secure wallet. We support Bitcoin, Ethereum, USDT, and more.',
                  details: ['Multiple crypto support', 'Instant deposits', 'Secure wallet system', 'Transaction tracking']
                },
                {
                  step: '03',
                  icon: TrendingUp,
                  title: 'Choose Investment Plan',
                  desc: 'Select the plan that matches your investment goals and risk tolerance. Start earning immediately.',
                  details: ['Flexible plans', 'Clear returns', 'No hidden fees', 'Adjust anytime']
                },
                {
                  step: '04',
                  icon: DollarSign,
                  title: 'Earn & Withdraw',
                  desc: 'Watch your investment grow with daily returns. Withdraw your profits anytime to your wallet.',
                  details: ['Daily returns', 'Real-time tracking', 'Fast withdrawals', 'Reinvest option']
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500">
                    <CardContent className="p-6">
                      <div className="text-7xl font-bold text-blue-100 mb-4">{item.step}</div>
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                        <item.icon className="text-white" size={28} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.desc}</p>
                      <ul className="space-y-2">
                        {item.details.map((detail, j) => (
                          <li key={j} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="text-blue-300" size={32} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Investment Process</h2>
              <p className="text-xl text-gray-600">Understanding how your investment works</p>
            </div>
            <div className="max-w-4xl mx-auto space-y-8">
              {[
                {
                  title: 'Account Setup & Verification',
                  content: 'Begin by creating your account with a valid email address. Complete the KYC (Know Your Customer) verification process to unlock full platform features. This includes uploading a government-issued ID and proof of address. Verification typically takes 24-48 hours.'
                },
                {
                  title: 'Deposit & Wallet Management',
                  content: 'After verification, access your secure wallet dashboard. Generate deposit addresses for supported cryptocurrencies (BTC, ETH, USDT). Deposits are processed instantly and reflected in your account balance. All funds are stored in secure, cold storage wallets.'
                },
                {
                  title: 'Plan Selection & Investment',
                  content: 'Browse available investment plans and review their terms, minimum deposits, expected returns, and duration. Select a plan that aligns with your goals. Confirm your investment amount and the system will automatically start generating returns based on the plans structure.'
                },
                {
                  title: 'Monitoring & Earnings',
                  content: 'Track your investment performance in real-time through your dashboard. View detailed analytics, daily returns, and total earnings. Receive notifications for significant portfolio updates. Access 24/7 customer support for any questions or concerns.'
                },
                {
                  title: 'Withdrawals & Reinvestment',
                  content: 'Request withdrawals at any time through your dashboard. Withdrawals are processed within 24 hours to your specified wallet address. You can also choose to reinvest your profits to compound your returns or adjust your investment strategy.'
                },
              ].map((item, i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-12 text-white text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of investors who trust Tandress with their digital asset investments.
              </p>
              <Link href="/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-12 h-14">
                  Create Your Account Now
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
