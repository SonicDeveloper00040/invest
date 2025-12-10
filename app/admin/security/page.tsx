'use client';

import { AdminLayout } from '@/components/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, Activity, Lock } from 'lucide-react';

export default function AdminSecurityPage() {
  const securityAlerts = [
    { severity: 'high', message: 'Multiple failed login attempts detected', user: 'john@example.com', time: '5 min ago' },
    { severity: 'medium', message: 'Unusual withdrawal pattern', user: 'alice@example.com', time: '15 min ago' },
    { severity: 'low', message: 'New device login', user: 'bob@example.com', time: '1 hour ago' },
  ];

  const activityLog = [
    { action: 'Admin Login', user: 'admin@tandress.com', ip: '192.168.1.1', time: '10 min ago', status: 'Success' },
    { action: 'User Account Modified', user: 'admin@tandress.com', ip: '192.168.1.1', time: '25 min ago', status: 'Success' },
    { action: 'Transaction Approved', user: 'admin@tandress.com', ip: '192.168.1.1', time: '45 min ago', status: 'Success' },
    { action: 'Failed Login Attempt', user: 'unknown', ip: '45.67.89.123', time: '1 hour ago', status: 'Failed' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security & Audit</h1>
          <p className="text-gray-600 mt-2">Monitor security events and system activity</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Security Alerts</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">3</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="text-red-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Sessions</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">1,234</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Activity className="text-green-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Blocked IPs</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">45</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="text-blue-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">2FA Enabled</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">78%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Lock className="text-purple-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Alerts</h3>
            <div className="space-y-3">
              {securityAlerts.map((alert, i) => (
                <div key={i} className={`p-4 rounded-lg border-l-4 ${
                  alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                  alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${
                          alert.severity === 'high' ? 'bg-red-600 text-white' :
                          alert.severity === 'medium' ? 'bg-yellow-600 text-white' :
                          'bg-blue-600 text-white'
                        }`}>
                          {alert.severity}
                        </span>
                        <span className="text-sm text-gray-600">{alert.time}</span>
                      </div>
                      <p className="font-semibold text-gray-900">{alert.message}</p>
                      <p className="text-sm text-gray-600 mt-1">User: {alert.user}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Investigate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Log</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">IP Address</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {activityLog.map((log, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{log.action}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{log.user}</td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-600">{log.ip}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{log.time}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          log.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-6">
              <Button variant="outline">View Full Log</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
