'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { LoginForm } from '@/components/auth/login-form';
import { RegisterForm } from '@/components/auth/register-form';
import { AuthLayout } from '@/components/auth/auth-layout';
import { HeroSection } from '@/components/landing/hero-section';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <AuthLayout
          title={isLogin ? t('auth.loginTitle') : t('auth.registerTitle')}
          subtitle={isLogin ? t('auth.loginSubtitle') : t('auth.registerSubtitle')}
        >
          {isLogin ? (
            <LoginForm onToggle={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggle={() => setIsLogin(true)} />
          )}
        </AuthLayout>
      </div>
    </div>
  );
}
