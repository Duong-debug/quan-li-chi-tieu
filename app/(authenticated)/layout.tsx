'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { Footer } from '@/components/layout/footer';
import { NotificationProvider } from '@/app/context/notification-context';
import { SidebarProvider, useSidebar } from '@/app/context/sidebar-context';
import { RoleProvider, useRole } from '@/app/context/role-context';
import { isAuthenticated } from '@/lib/auth';

function AuthenticatedLayoutContent({ children }: { children: React.ReactNode }) {
    const { isOpen } = useSidebar();
    const { role } = useRole();

    return (
        <div className="min-h-screen bg-background flex flex-col" suppressHydrationWarning>
            <Sidebar />
            <Topbar />
            <main className={`pt-16 flex-1 transition-all duration-300 ${isOpen ? 'md:pl-64' : 'md:pl-20'}`}>
                <div className="container mx-auto p-6 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {children}
                </div>
            </main>
            {/* Only show footer for regular users */}
            {role === 'user' && <Footer />}
        </div>
    );
}

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [userRole, setUserRole] = useState<'user' | 'manager' | 'admin'>('user');

    useEffect(() => {
        setMounted(true);
        if (!isAuthenticated()) {
            router.push('/');
            return;
        }

        // Get user role from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                setUserRole(user.role || 'user');
            } catch (error) {
                console.error('Failed to parse user data:', error);
            }
        }
    }, [router]);

    if (!mounted) {
        return null;
    }

    if (!isAuthenticated()) {
        return null;
    }

    return (
        <RoleProvider userRole={userRole}>
            <SidebarProvider>
                <NotificationProvider>
                    <AuthenticatedLayoutContent>{children}</AuthenticatedLayoutContent>
                </NotificationProvider>
            </SidebarProvider>
        </RoleProvider>
    );
}
