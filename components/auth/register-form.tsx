'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { toast } from 'sonner';
import { Loader2, User, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

interface RegisterFormProps {
  onToggle: () => void;
}

export function RegisterForm({ onToggle }: RegisterFormProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error(t('auth.passwordMismatch'));
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      toast.success(t('auth.registerSuccess'));
      onToggle();
    } catch (error: any) {
      console.error('Register error:', error);
      toast.error(error.response?.data?.message || t('auth.registerFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">{t('auth.fullName')}</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="fullName"
              name="fullName"
              placeholder="Nguyễn Văn A"
              value={formData.fullName}
              onChange={handleChange}
              className="pl-10 h-11 bg-muted/50 border-border focus:border-primary focus:ring-primary/20 rounded-xl"
              required
            />
          </div>
        </div>
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
          <Label htmlFor="password">{t('auth.password')}</Label>
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
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
          <div className="relative">
            <CheckCircle2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
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
            {t('auth.register')} <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">{t('auth.hasAccount')} </span>
        <button
          type="button"
          onClick={onToggle}
          className="font-medium text-primary hover:underline transition-colors"
        >
          {t('auth.loginNow')}
        </button>
      </div>
    </form>
  );
}
