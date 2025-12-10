import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        <section className="py-12 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-blue-100">Last updated: December 8, 2025</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-600 leading-relaxed">
                    By accessing and using Tandress platform, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Permission is granted to temporarily access the materials on Tandress platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or public display</li>
                    <li>Attempt to decompile or reverse engineer any software contained on the platform</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or mirror the materials on any other server</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Registration</h2>
                  <p className="text-gray-600 leading-relaxed">
                    To access certain features of the platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and agree not to disclose your password to any third party.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Investment Terms</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    All investments carry risk. By using our platform, you acknowledge that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Cryptocurrency investments are subject to market volatility</li>
                    <li>Past performance is not indicative of future results</li>
                    <li>You may lose some or all of your invested capital</li>
                    <li>Investment returns are not guaranteed</li>
                    <li>You have read and understood the associated risks</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Deposits and Withdrawals</h2>
                  <p className="text-gray-600 leading-relaxed">
                    All deposits and withdrawals are subject to verification and security checks. We reserve the right to delay or refuse any transaction if we suspect fraudulent activity or violation of these terms. Withdrawal requests are typically processed within 24 hours but may take longer during periods of high volume or for security reasons.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Prohibited Activities</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    You agree not to engage in any of the following prohibited activities:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Money laundering or terrorist financing</li>
                    <li>Market manipulation or fraudulent trading</li>
                    <li>Using the platform from prohibited jurisdictions</li>
                    <li>Creating multiple accounts to abuse promotions</li>
                    <li>Attempting to hack or compromise platform security</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Termination</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the platform will immediately cease.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
                  <p className="text-gray-600 leading-relaxed">
                    In no event shall Tandress or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the platform.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
                  <p className="text-gray-600 leading-relaxed">
                    These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Tandress operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the right to modify these terms at any time. We will notify users of any material changes via email or platform notification. Your continued use of the platform after such modifications constitutes acceptance of the updated terms.
                  </p>
                </div>

                <div className="pt-8 border-t">
                  <p className="text-gray-600">
                    If you have any questions about these Terms, please contact us at{' '}
                    <a href="mailto:legal@tandress.com" className="text-blue-600 hover:underline">
                      legal@tandress.com
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
