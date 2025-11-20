'use client';

import { useLanguage } from '@/app/context/language-context';
import { useSidebar } from '@/app/context/sidebar-context';
import { Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
    const { t } = useLanguage();
    const { isOpen } = useSidebar();

    const footerLinks = {
        product: [
            { label: t('Features') || 'Tính năng', href: '#features' },
            { label: t('AI Assistant') || 'Trợ lý AI', href: '#ai' },
            { label: t('Reports') || 'Báo cáo', href: '#reports' },
        ],
        company: [
            { label: t('About Us') || 'Về chúng tôi', href: '#about' },
            { label: t('Contact') || 'Liên hệ', href: '#contact' },
            { label: t('Privacy Policy') || 'Chính sách bảo mật', href: '#privacy' },
        ],
        support: [
            { label: t('Help Center') || 'Trung tâm trợ giúp', href: '#help' },
            { label: t('Documentation') || 'Tài liệu', href: '#docs' },
            { label: 'FAQ', href: '#faq' },
        ],
    };

    return (
        <footer className={`bg-muted/50 border-t border-border transition-all duration-300 ${isOpen ? 'md:ml-64' : 'md:ml-20'}`}>
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img src="/logo.png" alt="NDFolio" className="h-8 w-8" />
                            <span className="text-xl font-bold">NDFolio</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {t('footer.tagline') || 'Quản lý tài chính thông minh với sức mạnh của AI'}
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="h-9 w-9 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors">
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a href="#" className="h-9 w-9 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href="#" className="h-9 w-9 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors">
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a href="#" className="h-9 w-9 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors">
                                <Linkedin className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-semibold mb-4">{t('Product') || 'Sản phẩm'}</h3>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold mb-4">{t('Company') || 'Công ty'}</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-semibold mb-4">{t('Support') || 'Hỗ trợ'}</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>support@ndfolio.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{t('Vietnam') || 'Việt Nam'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} NDFolio. {t('All rights reserved') || 'Bản quyền thuộc về NDFolio'}.</p>
                </div>
            </div>
        </footer>
    );
}
