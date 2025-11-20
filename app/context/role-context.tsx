'use client';

import { createContext, useContext, ReactNode } from 'react';

interface RoleContextType {
    role: 'user' | 'manager' | 'admin';
    isAdmin: () => boolean;
    isManager: () => boolean;
    canAccess: (requiredRole: 'user' | 'manager' | 'admin') => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children, userRole }: { children: ReactNode; userRole: 'user' | 'manager' | 'admin' }) {
    const isAdmin = () => userRole === 'admin';
    const isManager = () => userRole === 'manager' || userRole === 'admin';

    const canAccess = (requiredRole: 'user' | 'manager' | 'admin') => {
        const roleHierarchy = { user: 1, manager: 2, admin: 3 };
        return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
    };

    return (
        <RoleContext.Provider value={{ role: userRole, isAdmin, isManager, canAccess }}>
            {children}
        </RoleContext.Provider>
    );
}

export function useRole() {
    const context = useContext(RoleContext);
    if (context === undefined) {
        // Return default user role if not in RoleProvider
        return {
            role: 'user' as const,
            isAdmin: () => false,
            isManager: () => false,
            canAccess: (requiredRole: 'user' | 'manager' | 'admin') => requiredRole === 'user'
        };
    }
    return context;
}
