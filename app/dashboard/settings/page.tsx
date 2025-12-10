'use client';

import { useState, useEffect } from 'react';
import { useProfile } from '@/contexts/profile-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { User, Lock, Bell, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { updateProfile, updatePassword } from './actions';

export default function SettingsPage() {
  const { profile } = useProfile();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setEmail(profile.email || '');
    }
  }, [profile]);

  const handleProfileUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    const { error } = await updateProfile({ fullName });
    if (error) {
      toast.error('Failed to update profile: ' + error.message);
    } else {
      toast.success('Profile updated successfully!');
    }
  };

  const handlePasswordUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match.');
      return;
    }
    const { error } = await updatePassword({ currentPassword, newPassword });
    if (error) {
      toast.error('Failed to update password: ' + error.message);
    } else {
      toast.success('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  };

  const userInitials = profile?.full_name
    ? profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : '??';

  return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="profile">
              <User className="mr-2" size={18} />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="mr-2" size={18} />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2" size={18} />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="password">
              <Lock className="mr-2" size={18} />
              Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <form onSubmit={handleProfileUpdate}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
                  <div className="space-y-6 max-w-2xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                        {userInitials}
                      </div>
                      <Button variant="outline" type="button">Change Avatar</Button>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <Input type="email" value={email} disabled />
                    </div>

                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-500" type="submit">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Enable 2FA</p>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                  <Button variant="outline" className="mt-4">
                    Configure 2FA
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
                  <div className="space-y-4">
                    {[
                      { device: 'Chrome on Windows', location: 'New York, USA', time: 'Active Now' },
                      { device: 'Safari on iPhone', location: 'New York, USA', time: '2 hours ago' },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">{session.device}</p>
                          <p className="text-sm text-gray-600">{session.location}</p>
                          <p className="text-xs text-gray-500">{session.time}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Investment Updates</p>
                      <p className="text-sm text-gray-600">Receive updates about your active investments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Deposit/Withdrawal Alerts</p>
                      <p className="text-sm text-gray-600">Get notified about transactions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Daily Profit Reports</p>
                      <p className="text-sm text-gray-600">Daily summary of your earnings</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Referral Updates</p>
                      <p className="text-sm text-gray-600">When someone uses your referral link</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Promotional Emails</p>
                      <p className="text-sm text-gray-600">News and special offers</p>
                    </div>
                    <Switch />
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card>
              <form onSubmit={handlePasswordUpdate}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
                  <div className="space-y-6 max-w-2xl">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                      <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                      <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                      <Input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="••••••••" />
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
                      <p className="font-semibold mb-2">Password Requirements:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>At least 8 characters long</li>
                        <li>Contains uppercase and lowercase letters</li>
                        <li>Contains at least one number</li>
                        <li>Contains at least one special character</li>
                      </ul>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-500" type="submit">
                      Update Password
                    </Button>
                  </div>
                </CardContent>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
}
