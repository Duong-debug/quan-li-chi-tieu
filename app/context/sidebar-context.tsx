'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
    isOpen: boolean;
    toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <SidebarContext.Provider value={{ isOpen, toggle }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    // Return default values if not in SidebarProvider (e.g., on landing page)
    if (context === undefined) {
        return { isOpen: false, toggle: () => { } };
    }
    return context;
}
