import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function RiskDisclaimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        <section className="py-12 bg-gradient-to-br from-red-600 to-orange-500 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4 mb-4">
              <AlertTriangle size={48} />
              <h1 className="text-4xl font-bold">Risk Disclaimer</h1>
            </div>
            <p className="text-red-100">Important information about investment risks</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <div className="flex items-start">
                <AlertTriangle className="text-yellow-600 mr-3 flex-shrink-0 mt-1" size={24} />
                <p className="text-yellow-800 font-semibold">
                  Please read this Risk Disclaimer carefully before investing. Cryptocurrency investments carry significant risks and may not be suitable for all investors.
                </p>
              </div>
            </div>

            <Card>
              <CardContent className="p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">General Investment Risks</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    All investments involve risk and the possibility of loss. The value of your investment can go down as well as up, and you may not get back the amount you invested. Past performance is not a reliable indicator of future results.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cryptocurrency-Specific Risks</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Cryptocurrencies are subject to unique risks including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li><strong>Extreme Volatility:</strong> Cryptocurrency prices can fluctuate dramatically in short periods, potentially resulting in significant losses.</li>
                    <li><strong>Regulatory Risk:</strong> Changes in regulations or government policies may adversely affect the value and legality of cryptocurrencies.</li>
                    <li><strong>Technology Risk:</strong> Blockchain technology is relatively new and may be subject to technical failures, bugs, or security vulnerabilities.</li>
                    <li><strong>Market Risk:</strong> Cryptocurrency markets operate 24/7 and can be influenced by market manipulation, lack of liquidity, and low trading volumes.</li>
                    <li><strong>Cybersecurity Risk:</strong> Despite security measures, cryptocurrency platforms and wallets can be targets for hacking and theft.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">No Guarantee of Returns</h2>
                  <p className="text-gray-600 leading-relaxed">
                    While we provide estimated returns on our investment plans, these are projections only and are not guaranteed. Actual returns may be lower than projected, and you may lose some or all of your invested capital. Market conditions, regulatory changes, and other factors beyond our control can significantly impact investment performance.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Liquidity Risk</h2>
                  <p className="text-gray-600 leading-relaxed">
                    While we aim to process withdrawals promptly, there may be circumstances where withdrawals are delayed or restricted, particularly during periods of high market volatility, technical issues, or regulatory compliance requirements. Investment plans may have specific lock-up periods during which funds cannot be withdrawn.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Counterparty Risk</h2>
                  <p className="text-gray-600 leading-relaxed">
                    When you invest through Tandress, you are exposed to counterparty risk - the risk that we may be unable to meet our obligations due to business failure, insolvency, or other unforeseen circumstances. While we maintain insurance and security measures, these may not fully protect your investment in all scenarios.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Geographic Restrictions</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our services may not be available in all jurisdictions. You are responsible for ensuring that your use of our platform complies with local laws and regulations. We reserve the right to restrict or terminate services in certain jurisdictions without prior notice.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Tax Implications</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Cryptocurrency investments may have tax implications. You are responsible for determining and paying any applicable taxes in your jurisdiction. We recommend consulting with a qualified tax professional before investing.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Suitability</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Cryptocurrency investments may not be suitable for all investors. Before investing, you should:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Carefully consider your investment objectives, experience level, and risk tolerance</li>
                    <li>Only invest money that you can afford to lose</li>
                    <li>Understand the features and risks of cryptocurrency investments</li>
                    <li>Seek independent financial advice if you have any doubts</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">No Financial Advice</h2>
                  <p className="text-gray-600 leading-relaxed">
                    The information provided on our platform is for informational purposes only and does not constitute financial, investment, or legal advice. We do not provide personalized investment recommendations. Any investment decisions you make are solely your responsibility.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Forward-Looking Statements</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our platform may contain forward-looking statements about future performance, growth projections, or market trends. These statements are based on current expectations and assumptions and are subject to significant risks and uncertainties. Actual results may differ materially from those expressed or implied.
                  </p>
                </div>

                <div className="pt-8 border-t bg-red-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-red-900 mb-4">Important Acknowledgment</h3>
                  <p className="text-red-800 leading-relaxed">
                    By using our platform and making investments, you acknowledge that you have read, understood, and accepted this Risk Disclaimer. You confirm that you understand the risks involved and that you are making investment decisions at your own risk. You agree that Tandress, its officers, directors, and employees are not liable for any losses you may incur.
                  </p>
                </div>

                <div className="pt-8 border-t">
                  <p className="text-gray-600">
                    For questions about investment risks, please contact us at{' '}
                    <a href="mailto:compliance@tandress.com" className="text-blue-600 hover:underline">
                      compliance@tandress.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
