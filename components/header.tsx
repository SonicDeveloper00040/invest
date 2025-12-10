'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">TD</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Tandress
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-foreground/70 hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="/plans" className="text-foreground/70 hover:text-foreground transition-colors">
              Plans
            </Link>
            <Link href="/faqs" className="text-foreground/70 hover:text-foreground transition-colors">
              FAQs
            </Link>
            <Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white">
                Get Started
              </Button>
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              className="ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/" className="block text-foreground/70 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/about" className="block text-foreground/70 hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/how-it-works" className="block text-foreground/70 hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="/plans" className="block text-foreground/70 hover:text-foreground transition-colors">
              Plans
            </Link>
            <Link href="/faqs" className="block text-foreground/70 hover:text-foreground transition-colors">
              FAQs
            </Link>
            <Link href="/contact" className="block text-foreground/70 hover:text-foreground transition-colors">
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
