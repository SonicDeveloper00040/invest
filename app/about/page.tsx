import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Award, TrendingUp, Shield, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl font-bold mb-6">About Tandress</h1>
              <p className="text-xl text-blue-100">
                Leading the future of cryptocurrency investment with innovation, transparency, and unwavering commitment to our clients success.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Founded in 2018, Tandress emerged from a vision to democratize cryptocurrency investment and make it accessible to everyone, regardless of their technical expertise or investment experience.
                  </p>
                  <p>
                    What started as a small team of blockchain enthusiasts and financial experts has grown into a global platform serving over 50,000 active investors across 120 countries. Our success is built on three core pillars: transparency, security, and consistent returns.
                  </p>
                  <p>
                    Today, we manage over $2.4 billion in assets and continue to innovate in the cryptocurrency investment space, offering cutting-edge strategies and technology to help our clients achieve their financial goals.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
                    <div className="text-gray-700 font-semibold">Active Investors</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">120+</div>
                    <div className="text-gray-700 font-semibold">Countries</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">$2.4B+</div>
                    <div className="text-gray-700 font-semibold">Assets Under Management</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                    <div className="text-gray-700 font-semibold">Client Satisfaction</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600">Principles that guide everything we do</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Security First', desc: 'Your assets security is our top priority. We employ military-grade encryption and industry-leading security protocols.' },
                { icon: Target, title: 'Transparency', desc: 'Complete visibility into your investments with real-time tracking, detailed reports, and clear communication.' },
                { icon: Award, title: 'Excellence', desc: 'We strive for excellence in every aspect of our service, from our platform to our customer support.' },
                { icon: Users, title: 'Client-Centric', desc: 'Your success is our success. We put our clients needs and goals at the center of everything we do.' },
                { icon: TrendingUp, title: 'Innovation', desc: 'Continuously evolving our strategies and technology to stay ahead in the dynamic crypto market.' },
                { icon: Globe, title: 'Accessibility', desc: 'Making cryptocurrency investment accessible to everyone, anywhere in the world.' },
              ].map((value, i) => (
                <Card key={i} className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                      <value.icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
              <p className="text-xl text-gray-600">Experienced professionals leading the way</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'John Anderson', role: 'Chief Executive Officer', exp: '15 years in FinTech' },
                { name: 'Sarah Mitchell', role: 'Chief Technology Officer', exp: '12 years in Blockchain' },
                { name: 'David Park', role: 'Chief Investment Officer', exp: '20 years in Trading' },
                { name: 'Emily Roberts', role: 'Head of Operations', exp: '10 years in Finance' },
              ].map((member, i) => (
                <Card key={i} className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <div className="text-blue-600 font-semibold mb-2">{member.role}</div>
                    <div className="text-sm text-gray-600">{member.exp}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Join Us on This Journey</h2>
            <p className="text-xl text-blue-100 mb-8">
              Be part of a global community that is shaping the future of digital asset investment.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
