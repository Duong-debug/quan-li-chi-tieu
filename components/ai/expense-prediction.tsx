'use client';

import { useLanguage } from '@/app/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function ExpensePrediction() {
  const { t } = useLanguage();

  const predictionData = [
    { month: 'Jan', actual: 2400, predicted: 2400 },
    { month: 'Feb', actual: 2210, predicted: 2350 },
    { month: 'Mar', actual: 2290, predicted: 2400 },
    { month: 'Apr', actual: 2000, predicted: 2200 },
    { month: 'May', actual: 2181, predicted: 2300 },
    { month: 'Jun', actual: 2500, predicted: 2600 },
    { month: 'Jul', predicted: 2700 },
    { month: 'Aug', predicted: 2750 },
  ];

  return (
    <Card className="border-0 shadow-md w-full">
      <CardHeader>
        <CardTitle>{t('ai.prediction')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }}
              labelStyle={{ color: 'var(--foreground)' }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', r: 4 }}
              name={t('Actual')}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#3b82f6', r: 4 }}
              name={t('Predicted')}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 flex gap-6 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-foreground">{t('Actual')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-foreground">{t('Predicted')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
