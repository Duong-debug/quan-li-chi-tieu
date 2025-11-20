'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function CategoryChart() {
  const { t } = useLanguage();

  const data = [
    { name: t('Food'), value: 30 },
    { name: t('Transportation'), value: 25 },
    { name: t('Entertainment'), value: 20 },
    { name: t('Utilities'), value: 15 },
    { name: t('Other'), value: 10 },
  ];

  const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <Link href="/categories" className="block transition-transform hover:scale-[1.02]">
      <Card className="border-0 shadow-md h-full">
        <CardHeader>
          <CardTitle>{t('Expense by Category')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Link>
  );
}
