import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        <section className="py-12 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-blue-100">Last updated: December 8, 2025</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Personal identification information (name, email, phone number, address)</li>
                    <li>Government-issued identification documents for KYC verification</li>
                    <li>Financial information related to transactions and investments</li>
                    <li>Communication data when you contact our support team</li>
                    <li>Device and usage information when you access our platform</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process your transactions and manage your investments</li>
                    <li>Verify your identity and comply with legal requirements</li>
                    <li>Send you technical notices, updates, and security alerts</li>
                    <li>Respond to your comments, questions, and customer service requests</li>
                    <li>Detect, prevent, and address fraud and security issues</li>
                    <li>Provide personalized investment recommendations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We may share your information in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>With service providers who perform services on our behalf</li>
                    <li>To comply with legal obligations and law enforcement requests</li>
                    <li>To protect the rights, property, and safety of Tandress and our users</li>
                    <li>In connection with a merger, acquisition, or sale of assets</li>
                    <li>With your consent or at your direction</li>
                  </ul>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    We do not sell your personal information to third parties.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We implement industry-standard security measures to protect your information, including encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We retain your information for as long as necessary to provide our services and comply with legal obligations. When you close your account, we will delete or anonymize your data within a reasonable timeframe, except where we are required to retain it for legal purposes.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Depending on your location, you may have the following rights:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Request deletion of your information</li>
                    <li>Object to processing of your information</li>
                    <li>Request data portability</li>
                    <li>Withdraw consent for certain data processing</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings. Some features of our platform may not function properly if you disable cookies.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children&apos;s Privacy</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete it.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
                  </p>
                </div>

                <div className="pt-8 border-t">
                  <p className="text-gray-600">
                    For questions about this Privacy Policy, please contact us at{' '}
                    <a href="mailto:privacy@tandress.com" className="text-blue-600 hover:underline">
                      privacy@tandress.com
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
