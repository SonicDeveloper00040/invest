'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, ArrowLeft, Send } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CI</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Tandress</span>
          </div>

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
            <p className="text-gray-600">
              Enter your email and we will send you a link to reset your password
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input type="email" placeholder="john@example.com" className="pl-10 h-12" />
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 h-12 text-lg">
              Send Reset Link
              <Send className="ml-2" size={20} />
            </Button>
          </form>

          <Link href="/login">
            <Button variant="ghost" className="w-full mt-4">
              <ArrowLeft className="mr-2" size={20} />
              Back to Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
