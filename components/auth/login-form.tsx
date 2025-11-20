'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { toast } from 'sonner';
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginFormProps {
  onToggle: () => void;
}

export function LoginForm({ onToggle }: LoginFormProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success(t('auth.loginSuccess'));
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || t('auth.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">{t('auth.email')}</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 h-11 bg-muted/50 border-border focus:border-primary focus:ring-primary/20 rounded-xl"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <a href="#" className="text-sm font-medium text-primary hover:underline">
              {t('auth.forgotPassword')}
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 h-11 bg-muted/50 border-border focus:border-primary focus:ring-primary/20 rounded-xl"
              required
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-11 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <>
            {t('auth.login')} <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">{t('auth.noAccount')} </span>
        <button
          type="button"
          onClick={onToggle}
          className="font-medium text-primary hover:underline transition-colors"
        >
          {t('auth.registerNow')}
        </button>
      </div>
    </form>
  );
}
