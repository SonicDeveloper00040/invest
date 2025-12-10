'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';

export default function FAQsPage() {
  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Creating an account is simple. Click the "Get Started" button, fill in your email and create a password. You will receive a verification email to activate your account. Complete the KYC verification to unlock all features.'
        },
        {
          q: 'What is KYC and why is it required?',
          a: 'KYC (Know Your Customer) is a verification process required by financial regulations. It helps us maintain security and comply with international laws. You will need to provide a government-issued ID and proof of address.'
        },
        {
          q: 'How long does verification take?',
          a: 'Account verification typically takes 24-48 hours. Once submitted, our team reviews your documents and notifies you via email. For urgent cases, contact our support team.'
        },
      ]
    },
    {
      category: 'Deposits & Withdrawals',
      questions: [
        {
          q: 'What cryptocurrencies can I deposit?',
          a: 'We currently support Bitcoin (BTC), Ethereum (ETH), USDT (TRC20/ERC20), Litecoin (LTC), and Bitcoin Cash (BCH). We are continuously adding support for more cryptocurrencies.'
        },
        {
          q: 'How long do deposits take?',
          a: 'Deposits are processed instantly after receiving blockchain confirmations. Bitcoin typically requires 3 confirmations, Ethereum requires 12, and USDT requires 20 confirmations.'
        },
        {
          q: 'What is the minimum withdrawal amount?',
          a: 'Minimum withdrawal amounts vary by cryptocurrency: BTC: 0.001, ETH: 0.01, USDT: $50. There are no maximum limits on withdrawals.'
        },
        {
          q: 'How fast are withdrawals processed?',
          a: 'Withdrawals are typically processed within 24 hours. VIP and Enterprise members enjoy priority processing within 6 hours. All withdrawals are manually reviewed for security.'
        },
      ]
    },
    {
      category: 'Investment Plans',
      questions: [
        {
          q: 'Can I invest in multiple plans?',
          a: 'Yes! You can invest in multiple plans simultaneously. This allows you to diversify your investment strategy and maximize returns across different timeframes.'
        },
        {
          q: 'When do I start earning returns?',
          a: 'Returns begin accumulating immediately after your investment is confirmed. Daily returns are credited to your account automatically and can be viewed in your dashboard.'
        },
        {
          q: 'Can I withdraw my investment before the plan ends?',
          a: 'Yes, you can withdraw your principal at any time. However, early withdrawal may incur a small fee depending on your plan. Check your specific plan terms for details.'
        },
        {
          q: 'What happens after my investment plan ends?',
          a: 'When your plan reaches maturity, your principal and all accumulated returns are returned to your wallet. You can then choose to reinvest, withdraw, or select a different plan.'
        },
      ]
    },
    {
      category: 'Security & Safety',
      questions: [
        {
          q: 'How secure is my investment?',
          a: 'We employ military-grade encryption, cold storage for the majority of funds, and multi-signature wallets. Our platform undergoes regular security audits by third-party firms.'
        },
        {
          q: 'Is two-factor authentication mandatory?',
          a: '2FA is highly recommended and mandatory for withdrawals above certain thresholds. We support Google Authenticator and SMS-based 2FA for enhanced security.'
        },
        {
          q: 'What if I lose access to my account?',
          a: 'Contact our support team immediately with your registered email. We have a secure account recovery process that includes identity verification to restore your access.'
        },
        {
          q: 'Are investments insured?',
          a: 'Yes! Professional and higher tier plans include insurance coverage. Enterprise and VIP Elite plans offer comprehensive insurance on all deposits. Review your plan details for specific coverage.'
        },
      ]
    },
    {
      category: 'Referral Program',
      questions: [
        {
          q: 'How does the referral program work?',
          a: 'Share your unique referral link with friends. When they sign up and make their first investment, you earn a commission. The more people you refer, the more you earn!'
        },
        {
          q: 'What is the referral commission rate?',
          a: 'You earn 5% commission on your direct referrals first investment and 2% on second-level referrals. VIP members enjoy higher rates up to 10%.'
        },
        {
          q: 'When do I receive referral bonuses?',
          a: 'Referral bonuses are credited instantly after your referral makes their first qualifying investment. Bonuses can be withdrawn or reinvested immediately.'
        },
      ]
    },
    {
      category: 'Support & Help',
      questions: [
        {
          q: 'How can I contact customer support?',
          a: 'We offer 24/7 support via live chat, email (support@tandress.com), and phone. Premium members have access to priority support channels and dedicated account managers.'
        },
        {
          q: 'What if I have a technical issue?',
          a: 'Report technical issues through our support portal or live chat. Our technical team typically responds within 2 hours and works to resolve issues quickly.'
        },
        {
          q: 'Can I speak with an investment advisor?',
          a: 'Absolutely! Professional tier and above members have access to investment advisors. Schedule a call through your dashboard or contact our support team.'
        },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <main className="pt-24 pb-16">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
              <p className="text-xl text-gray-600">
                Find answers to common questions about our platform, investments, and services.
              </p>
            </div>

            <div className="space-y-8">
              {faqs.map((category, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">{category.category}</h2>
                  </div>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((item, j) => (
                        <AccordionItem key={j} value={`item-${i}-${j}`}>
                          <AccordionTrigger className="text-left text-lg font-semibold text-gray-900">
                            {item.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 leading-relaxed">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
                <p className="text-blue-100 mb-6">
                  Our support team is available 24/7 to help you with any questions or concerns.
                </p>
                <a href="mailto:support@tandress.com" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Contact Support
                </a>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
