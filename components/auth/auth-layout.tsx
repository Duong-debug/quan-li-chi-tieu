'use client';

import { Globe } from 'lucide-react';
import { useLanguage } from '@/app/context/language-context';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div className="min-h-screen w-full flex bg-background">
            {/* Language Switcher - Fixed Position */}
            <div className="fixed top-4 right-4 z-50">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2 bg-background/95 backdrop-blur">
                            <Globe className="h-4 w-4" />
                            {language === 'vi' ? 'Tiếng Việt' : 'English'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setLanguage('vi')} className={language === 'vi' ? 'bg-accent' : ''}>
                            🇻🇳 Tiếng Việt
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-accent' : ''}>
                            🇺🇸 English
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Left Column - Illustration */}
            <div className="hidden lg:flex w-1/2 bg-primary p-12 flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <img src="/logo.png" alt="NDFolio" className="h-10 w-10" />
                        <span className="text-2xl font-bold text-white">NDFolio</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {t('auth.heroTitle') || 'Quản lý tài chính thông minh với AI'}
                    </h1>
                    <p className="text-blue-100 text-lg max-w-md">
                        {t('auth.heroSubtitle') || 'Theo dõi chi tiêu, phân tích xu hướng và nhận gợi ý tiết kiệm từ trợ lý ảo thông minh của bạn.'}
                    </p>
                </div>

                {/* Abstract Shapes/Pattern */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />

                <div className="relative z-10 text-blue-100 text-sm">
                    © 2024 NDFolio. All rights reserved.
                </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
                        <p className="mt-2 text-muted-foreground">{subtitle}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
