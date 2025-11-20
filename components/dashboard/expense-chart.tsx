'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function ExpenseChart() {
  const { t } = useLanguage();

  const data = [
    { month: 'Jan', expense: 2400 },
    { month: 'Feb', expense: 2210 },
    { month: 'Mar', expense: 2290 },
    { month: 'Apr', expense: 2000 },
    { month: 'May', expense: 2181 },
    { month: 'Jun', expense: 2500 },
  ];

  return (
    <Link href="/reports" className="block transition-transform hover:scale-[1.02]">
      <Card className="border-0 shadow-md h-full">
        <CardHeader>
          <CardTitle>{t('Expense by Month')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ fill: '#4f46e5', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Link>
  );
}
