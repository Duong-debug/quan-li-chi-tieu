'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AvatarUpload } from '@/components/profile/avatar-upload';
import { Moon, Sun, Globe, User, Shield, LogOut, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData(prev => ({
        ...prev,
        fullName: parsedUser.fullName || '',
        email: parsedUser.email || '',
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call or implement actual update endpoint
      // await api.put('/users/profile', { fullName: formData.fullName });

      // Update local storage
      const updatedUser = { ...user, fullName: formData.fullName };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast.success(t('Profile updated successfully'));
    } catch (error) {
      toast.error(t('Failed to update profile'));
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error(t('Please fill in all password fields'));
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error(t('New passwords do not match'));
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error(t('Password must be at least 6 characters'));
      return;
    }

    setChangingPassword(true);
    try {
      await api.post('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      toast.success(t('Password changed successfully'));
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      console.error('Error changing password:', error);
      const errorMessage = error.response?.data?.message || t('Failed to change password');
      toast.error(errorMessage);
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-gradient">{t('Settings')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('Manage your account preferences and application settings.')}
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]" suppressHydrationWarning>
          <TabsTrigger value="general">{t('General')}</TabsTrigger>
          <TabsTrigger value="profile">{t('Profile')}</TabsTrigger>
          <TabsTrigger value="security">{t('Security')}</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* Appearance */}
          <Card className="glass-card border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                {t('Appearance')}
              </CardTitle>
              <CardDescription>
                {t('Customize the look and feel of the application.')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>{t('Theme')}</Label>
                <div className="flex gap-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('light')}
                    className="gap-2"
                    suppressHydrationWarning
                  >
                    <Sun className="h-4 w-4" /> {t('Light')}
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                    className="gap-2"
                    suppressHydrationWarning
                  >
                    <Moon className="h-4 w-4" /> {t('Dark')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Language */}
          <Card className="glass-card border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {t('Language')}
              </CardTitle>
              <CardDescription>
                {t('Select your preferred language.')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label>{t('Select Language')}</Label>
                <div className="flex gap-2">
                  <Button
                    variant={language === 'vi' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLanguage('vi')}
                    className={language === 'vi' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  >
                    Tiếng Việt
                  </Button>
                  <Button
                    variant={language === 'en' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLanguage('en')}
                    className={language === 'en' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  >
                    English
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card className="glass-card border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t('Profile Settings')}
              </CardTitle>
              <CardDescription>
                {t('Update your profile information.')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Upload */}
              <div>
                <Label className="mb-3 block">{t('Profile Picture')}</Label>
                <AvatarUpload
                  currentAvatar={user?.avatar}
                  userName={user?.fullName || 'User'}
                  onAvatarUpdate={(avatarUrl) => {
                    const updatedUser = { ...user, avatar: avatarUrl };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setUser(updatedUser);
                  }}
                />
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">{t('Full Name')}</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t('Enter your full name')}
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t('Email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('Saving...')}
                    </>
                  ) : (
                    t('Save Changes')
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="glass-card border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t('Security')}
              </CardTitle>
              <CardDescription>
                {t('Manage your password and account security.')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">{t('Current Password')}</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="bg-background/50"
                    placeholder={t('Enter current password')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">{t('New Password')}</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="bg-background/50"
                    placeholder={t('Enter new password')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('Confirm New Password')}</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="bg-background/50"
                    placeholder={t('Confirm new password')}
                  />
                </div>
                <Button type="submit" disabled={changingPassword}>
                  {changingPassword ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('Changing...')}
                    </>
                  ) : (
                    t('Change Password')
                  )}
                </Button>
              </form>

              <div className="pt-6 border-t mt-6">
                <h4 className="text-sm font-medium text-destructive mb-2">{t('Danger Zone')}</h4>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full sm:w-auto"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('Logout')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
