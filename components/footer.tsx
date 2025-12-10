import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CI</span>
              </div>
              <span className="text-xl font-bold text-white">Tandress</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted partner in cryptocurrency investment. Building wealth through innovative digital asset strategies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-blue-500 transition-colors">How It Works</Link></li>
              <li><Link href="/plans" className="hover:text-blue-500 transition-colors">Investment Plans</Link></li>
              <li><Link href="/faqs" className="hover:text-blue-500 transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-blue-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/risk-disclaimer" className="hover:text-blue-500 transition-colors">Risk Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                <span>support@tandress.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>123 Crypto Street, Digital City, DC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Tandress. All rights reserved.</p>
          <p className="mt-2">
            Trading and investing in cryptocurrencies involves substantial risk of loss. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
