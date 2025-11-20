'use client';

import { ReactNode } from 'react';
import { useRole } from '@/app/context/role-context';
import { useLanguage } from '@/app/context/language-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RoleGuardProps {
    children: ReactNode;
    requiredRole: 'user' | 'manager' | 'admin';
    fallback?: ReactNode;
    redirectTo?: string;
}

export function RoleGuard({ children, requiredRole, fallback, redirectTo }: RoleGuardProps) {
    const { canAccess } = useRole();
    const { t } = useLanguage();
    const router = useRouter();

    useEffect(() => {
        if (!canAccess(requiredRole) && redirectTo) {
            router.push(redirectTo);
        }
    }, [canAccess, requiredRole, redirectTo, router]);

    if (!canAccess(requiredRole)) {
        if (fallback) {
            return <>{fallback}</>;
        }
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-destructive mb-2">{t('Access Denied')}</h2>
                    <p className="text-muted-foreground">{t('You don\'t have permission to access this resource.')}</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
