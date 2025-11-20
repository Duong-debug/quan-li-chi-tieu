'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CountUp } from '@/components/ui/count-up';

export function SummaryCards() {
  const { t } = useLanguage();

  // Sample data
  const totalIncome = 15000000;
  const totalExpense = 8500000;
  const balance = totalIncome - totalExpense;

  const cards = [
    {
      title: t('Total Income'),
      rawValue: totalIncome,
      color: 'bg-green-50 dark:bg-green-950',
      titleColor: 'text-green-600 dark:text-green-400',
      href: '/expenses',
    },
    {
      title: t('Total Expense'),
      rawValue: totalExpense,
      color: 'bg-red-50 dark:bg-red-950',
      titleColor: 'text-red-600 dark:text-red-400',
      href: '/expenses',
    },
    {
      title: t('Total Balance'),
      rawValue: balance,
      color: 'bg-blue-50 dark:bg-blue-950',
      titleColor: 'text-blue-600 dark:text-blue-400',
      href: '/reports',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <Link href={card.href} key={i} className="block transition-transform hover:scale-105">
          <Card className={`${card.color} border-0 h-full`}>
            <CardHeader className="pb-3">
              <CardTitle className={`text-sm font-medium ${card.titleColor}`}>
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                <CountUp
                  end={card.rawValue}
                  suffix="đ"
                  duration={2000}
                />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
