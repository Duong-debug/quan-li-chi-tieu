'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/language-context';
import { useNotification } from '@/app/context/notification-context';
import { useSidebar } from '@/app/context/sidebar-context';
import { useRole } from '@/app/context/role-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Globe, Settings, LogOut, Bell, Menu } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export function Topbar() {
    const { language, setLanguage, t } = useLanguage();
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification();
    const { toggle, isOpen } = useSidebar();
    const { role } = useRole();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem('user');
            if (updatedUser) {
                setUser(JSON.parse(updatedUser));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    const getRoleBadgeClass = () => {
        switch (role) {
            case 'admin':
                return 'bg-red-500/10 text-red-600 border border-red-500/20';
            case 'manager':
                return 'bg-blue-500/10 text-blue-600 border border-blue-500/20';
            default:
                return 'bg-gray-500/10 text-gray-600 border border-gray-500/20';
        }
    };

    return (
        <header className={`h-16 fixed top-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-40 px-6 flex items-center justify-between transition-all duration-300 ${isOpen ? 'left-0 md:left-64' : 'left-0 md:left-20'}`}>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={toggle}>
                    <Menu className="h-5 w-5" />
                </Button>
                <div className="md:hidden">
                    <span className="font-bold text-primary">NDFolio</span>
                </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
                {/* Language Switcher */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full" suppressHydrationWarning>
                            <Globe className="h-5 w-5 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setLanguage('vi')} className={language === 'vi' ? 'bg-primary/10 text-primary' : ''}>
                            Tiếng Việt
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-primary/10 text-primary' : ''}>
                            English
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="relative p-2 rounded-lg hover:bg-accent transition-colors" suppressHydrationWarning>
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                            )}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel className="flex items-center justify-between">
                            <span>{t('Notifications')}</span>
                            {unreadCount > 0 && (
                                <span className="text-xs text-muted-foreground font-normal">
                                    {unreadCount} {t('unread')}
                                </span>
                            )}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="max-h-[400px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-4 text-center text-muted-foreground text-sm">
                                    {t('No notifications')}
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <div key={notification._id}>
                                        <DropdownMenuItem
                                            className={`flex flex-col items-start gap-1 p-3 cursor-pointer ${!notification.isRead ? 'bg-primary/5' : ''}`}
                                            onClick={() => markAsRead(notification._id)}
                                        >
                                            <div className="flex items-start justify-between w-full">
                                                <p className={`text-sm ${!notification.isRead ? 'font-semibold text-primary' : 'font-medium'}`}>
                                                    {notification.title}
                                                </p>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(notification.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric' })}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                                {notification.message}
                                            </p>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                    </div>
                                ))
                            )}
                        </div>
                        {notifications.length > 0 && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-center justify-center text-sm text-primary cursor-pointer"
                                    onClick={markAllAsRead}
                                >
                                    {t('Mark all as read')}
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors" suppressHydrationWarning>
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src={user?.avatar ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${user.avatar}` : undefined}
                                    alt={user?.fullName || 'User'}
                                />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    {user?.fullName ? user.fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-left hidden sm:block">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium">{user?.fullName || 'User'}</p>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${getRoleBadgeClass()}`}>
                                        {role.toUpperCase()}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</p>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>{t('My Account')}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push('/settings')}>
                            <Settings className="mr-2 h-4 w-4" />
                            {t('Settings')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            {t('Logout')}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
