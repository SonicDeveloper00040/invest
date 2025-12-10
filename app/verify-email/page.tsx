import { MailCheck } from 'lucide-react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg">
        <MailCheck className="mx-auto h-16 w-16 text-blue-600" />
        <h1 className="mt-6 text-3xl font-bold text-gray-900">Check your email</h1>
        <p className="mt-4 text-lg text-gray-600">
          We&apos;ve sent a verification link to your email address. Please click the link to complete your registration.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Didn&apos;t receive an email? Check your spam folder or wait a few minutes.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            &larr; Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}