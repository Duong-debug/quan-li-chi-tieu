'use client';

import { useLanguage } from '@/app/context/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SavingSuggestions() {
  const { t } = useLanguage();

  const suggestions = [
    {
      title: 'Reduce Food Expenses',
      description: 'Your food spending increased 20% this month',
      savings: '500,000đ',
      color: 'bg-orange-50 dark:bg-orange-950',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      title: 'Use Public Transportation',
      description: 'Switch to bus for daily commute',
      savings: '300,000đ',
      color: 'bg-purple-50 dark:bg-purple-950',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Limit Entertainment',
      description: 'Average spending on entertainment: 20%',
      savings: '400,000đ',
      color: 'bg-pink-50 dark:bg-pink-950',
      textColor: 'text-pink-600 dark:text-pink-400',
    },
  ];

  return (
    <Card className="border-0 shadow-md h-full">
      <CardHeader>
        <CardTitle>{t('ai.savingSuggestions')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.length > 0 ? (
          suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              className={`${suggestion.color} p-4 rounded-lg border border-opacity-20`}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <h4 className={`font-semibold text-sm ${suggestion.textColor}`}>
                    {suggestion.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {suggestion.description}
                  </p>
                </div>
                <div className={`text-sm font-bold ${suggestion.textColor} whitespace-nowrap`}>
                  {suggestion.savings}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">{t('ai.noSuggestions')}</p>
        )}
      </CardContent>
    </Card>
  );
}
