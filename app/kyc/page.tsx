'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, Image, Shield, CheckCircle } from 'lucide-react';

export default function KYCPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">KYC Verification</h1>
            <p className="text-blue-100">Complete your identity verification to unlock all features</p>
          </div>
          <CardContent className="p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3].map((step, i) => (
                  <div key={i} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${i === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {step}
                    </div>
                    {i < 2 && <div className="w-24 h-1 bg-gray-200 mx-2"></div>}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="font-semibold text-blue-600">Personal Info</div>
                <div className="text-gray-600">Document Upload</div>
                <div className="text-gray-600">Review</div>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <Input placeholder="John Doe" className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                  <Input type="date" className="h-12" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <Input placeholder="+1 (555) 123-4567" className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                <Input placeholder="123 Main Street" className="h-12" />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <Input placeholder="New York" className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State/Province</label>
                  <Input placeholder="NY" className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code</label>
                  <Input placeholder="10001" className="h-12" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Document Type</label>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="license">Drivers License</SelectItem>
                    <SelectItem value="id">National ID Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">Upload Documents</label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <FileText className="mx-auto text-gray-400 mb-3" size={40} />
                    <p className="text-sm font-semibold text-gray-700 mb-1">ID Document Front</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    <Button variant="outline" className="mt-4" size="sm">
                      <Upload className="mr-2" size={16} />
                      Upload
                    </Button>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <FileText className="mx-auto text-gray-400 mb-3" size={40} />
                    <p className="text-sm font-semibold text-gray-700 mb-1">ID Document Back</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    <Button variant="outline" className="mt-4" size="sm">
                      <Upload className="mr-2" size={16} />
                      Upload
                    </Button>
                  </div>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Image className="mx-auto text-gray-400 mb-3" size={40} alt="" />
                  <p className="text-sm font-semibold text-gray-700 mb-1">Selfie with ID</p>
                  <p className="text-xs text-gray-500">Clear photo holding your ID next to your face</p>
                  <Button variant="outline" className="mt-4" size="sm">
                    <Upload className="mr-2" size={16} />
                    Upload
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
                <Shield className="inline mr-2 text-blue-600" size={18} />
                Your documents are encrypted and stored securely. We never share your information with third parties.
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 h-12 text-lg">
                Submit for Verification
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What happens after submission?</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Our team will review your documents within 24-48 hours</li>
                  <li>• You will receive an email notification once verification is complete</li>
                  <li>• Once approved, you can access all platform features without limits</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
