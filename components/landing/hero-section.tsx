'use client';

import { useLanguage } from '@/app/context/language-context';
import { TrendingUp, Brain, Globe, BarChart3, PiggyBank, Shield } from 'lucide-react';

export function HeroSection() {
    const { t } = useLanguage();

    const features = [
        {
            icon: Brain,
            title: t('AI-Powered Insights') || 'Phân tích thông minh AI',
            description: t('Get smart financial advice powered by AI') || 'Nhận tư vấn tài chính thông minh từ AI',
        },
        {
            icon: TrendingUp,
            title: t('Expense Tracking') || 'Theo dõi chi tiêu',
            description: t('Track every expense automatically') || 'Tự động theo dõi mọi khoản chi',
        },
        {
            icon: BarChart3,
            title: t('Visual Reports') || 'Báo cáo trực quan',
            description: t('Beautiful charts and analytics') || 'Biểu đồ đẹp mắt và phân tích chi tiết',
        },
        {
            icon: PiggyBank,
            title: t('Savings Goals') || 'Mục tiêu tiết kiệm',
            description: t('Set and achieve your financial goals') || 'Đặt và đạt được mục tiêu tài chính',
        },
        {
            icon: Globe,
            title: t('Multi-language') || 'Đa ngôn ngữ',
            description: t('Vietnamese and English support') || 'Hỗ trợ tiếng Việt và tiếng Anh',
        },
        {
            icon: Shield,
            title: t('Secure & Private') || 'An toàn & Bảo mật',
            description: t('Your data is encrypted and protected') || 'Dữ liệu được mã hóa và bảo vệ',
        },
    ];

    return (
        <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5 py-20 border-b border-border">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        {t('Manage Your Finances Smarter') || 'Quản lý tài chính thông minh hơn'}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                        {t('hero.description') || 'Theo dõi chi tiêu, phân tích xu hướng và nhận gợi ý tiết kiệm từ trợ lý AI của bạn'}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:scale-105 duration-300"
                        >
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <feature.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
