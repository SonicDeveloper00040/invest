'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Smartphone, Key, ArrowLeft } from 'lucide-react';

export default function TwoFactorPage() {
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

          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-blue-600" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Two-Factor Authentication</h2>
            <p className="text-gray-600">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Authentication Code</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  className="pl-10 h-12 text-center text-2xl tracking-widest font-mono"
                />
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 h-12 text-lg">
              Verify & Continue
            </Button>
          </form>

          <div className="mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <Smartphone className="inline mr-2 text-blue-600" size={18} />
              <span className="text-gray-700">Open your authenticator app (Google Authenticator, Authy, etc.) to get the code</span>
            </div>
          </div>

          <div className="mt-6 text-center space-y-2">
            <button className="text-sm text-blue-600 hover:underline">
              Lost access to your device?
            </button>
            <Link href="/login">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="mr-2" size={20} />
                Back to Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
