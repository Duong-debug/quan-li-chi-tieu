'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/context/language-context';
import { useSidebar } from '@/app/context/sidebar-context';
import { useRole } from '@/app/context/role-context';
import { LayoutDashboard, Receipt, Settings, LogOut, BarChart3, Wallet, Repeat, Target, FolderOpen, PieChart, TrendingUp, X, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { isOpen, toggle } = useSidebar();
  const { isManager } = useRole();

  const baseNavItems = [
    { name: t('Dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('Income'), href: '/income', icon: TrendingUp },
    { name: t('Expenses'), href: '/expenses', icon: Receipt },
    { name: t('Categories'), href: '/categories', icon: FolderOpen },
    { name: t('Budgets'), href: '/budgets', icon: Wallet },
    { name: t('Recurring'), href: '/recurring', icon: Repeat },
    { name: t('Goals'), href: '/goals', icon: Target },
    { name: t('Reports'), href: '/reports', icon: BarChart3 },
    { name: t('AI Assistant'), href: '/ai', icon: PieChart },
    { name: t('Settings'), href: '/settings', icon: Settings },
  ];

  // Add menu items for managers and admins
  const navItems = isManager()
    ? [...baseNavItems.slice(0, 10), { name: t('User Management'), href: '/users', icon: Users }, ...baseNavItems.slice(10)]
    : baseNavItems;

  const handleLinkClick = () => {
    // Close sidebar on mobile when clicking a link
    if (window.innerWidth < 768 && isOpen) {
      toggle();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col h-screen fixed left-0 top-0 bg-card border-r border-border z-50 transition-all duration-300",
          // Desktop
          "md:flex",
          isOpen ? "md:w-64" : "md:w-20",
          // Mobile
          isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full md:translate-x-0"
        )}
        suppressHydrationWarning
      >
        {/* Header with Logo and Close Button */}
        <div className={cn("p-6 flex items-center", isOpen ? "justify-between" : "md:justify-center justify-between")}>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="NDFolio" className="h-8 w-8 flex-shrink-0" />
            {isOpen && <h1 className="text-xl font-bold text-primary">NDFolio</h1>}
          </div>
          {isOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  !isOpen && "md:justify-center justify-start"
                )}
                title={!isOpen ? item.name : undefined}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                <span className={cn(!isOpen && "md:hidden")}>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <button
            className={cn(
              "flex items-center gap-3 px-4 py-3 w-full rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
              !isOpen && "md:justify-center justify-start"
            )}
            title={!isOpen ? t('Logout') : undefined}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className={cn(!isOpen && "md:hidden")}>{t('Logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
