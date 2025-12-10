'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Wallet, TrendingUp, History, Users, Settings, LogOut, Menu, X, Bell } from 'lucide-react';
import { type Profile } from '@/lib/types';
import { ProfileContext } from '@/contexts/profile-context';

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  profile: Profile | null;
}

export function DashboardLayoutClient({ children, profile }: DashboardLayoutClientProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
    { name: 'Investment Plans', href: '/dashboard/invest', icon: TrendingUp },
    { name: 'History', href: '/dashboard/history', icon: History },
    { name: 'Referrals', href: '/dashboard/referral', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const userInitials = profile?.full_name
    ? profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : '??';

  return (
    <ProfileContext.Provider value={{ profile }}>
      <div className="min-h-screen bg-gray-50">
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">CI</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Tandress
                </span>
              </div>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                          >
                            <item.icon className="h-6 w-6 shrink-0" />
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li className="mt-auto">
                  <Link
                    href="/login"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-6 w-6 shrink-0" />
                    Logout
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex flex-1 items-center justify-end gap-x-4 lg:gap-x-6">
                <button className="relative p-2 text-gray-700 hover:text-blue-600">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  <div className="hidden lg:block text-right">
                    <p className="text-sm font-semibold text-gray-900">{profile?.full_name || 'User'}</p>
                    <p className="text-xs text-gray-500">{profile?.email || ''}</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                    {userInitials}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>

        {sidebarOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-50 bg-gray-900/80" onClick={() => setSidebarOpen(false)}></div>
            <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white">
              <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">CI</span>
                  </div>
                  <span className="text-xl font-bold">Tandress</span>
                </div>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="px-6 py-4">
                <ul className="space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors ${
                            isActive
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                          }`}
                        >
                          <item.icon className="h-6 w-6 shrink-0" />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </ProfileContext.Provider>
  );
}
