'use client';

import { AdminLayout } from '@/components/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mail, Bell } from 'lucide-react';

export default function AdminNotificationsPage() {
  const recentNotifications = [
    { id: 1, title: 'System Maintenance', message: 'Scheduled maintenance on Dec 15', recipients: 'All Users', sent: 'Dec 8, 2025 2:30 PM' },
    { id: 2, title: 'New Investment Plan', message: 'VIP Elite plan now available', recipients: 'VIP Users', sent: 'Dec 7, 2025 10:00 AM' },
    { id: 3, title: 'Security Update', message: 'Please enable 2FA for enhanced security', recipients: 'Unverified Users', sent: 'Dec 6, 2025 9:15 AM' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-2">Send announcements and notifications to users</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email Notification</h3>
                  <p className="text-sm text-gray-600">Send email to users</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <Input placeholder="Email subject..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Recipients</label>
                  <select className="w-full border border-gray-300 rounded-md px-4 py-2">
                    <option>All Users</option>
                    <option>Active Users</option>
                    <option>VIP Users</option>
                    <option>Unverified Users</option>
                    <option>Custom List</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <Textarea rows={6} placeholder="Email message..." />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500">
                  <Send className="mr-2" size={20} />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                  <Bell className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Dashboard Alert</h3>
                  <p className="text-sm text-gray-600">Send alert to dashboard</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <Input placeholder="Alert title..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Recipients</label>
                  <select className="w-full border border-gray-300 rounded-md px-4 py-2">
                    <option>All Users</option>
                    <option>Active Users</option>
                    <option>VIP Users</option>
                    <option>Unverified Users</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <Textarea rows={6} placeholder="Alert message..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                  <select className="w-full border border-gray-300 rounded-md px-4 py-2">
                    <option>Info</option>
                    <option>Warning</option>
                    <option>Critical</option>
                  </select>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500">
                  <Send className="mr-2" size={20} />
                  Send Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
            <div className="space-y-3">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>Recipients: {notification.recipients}</span>
                        <span>Sent: {notification.sent}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Resend
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
