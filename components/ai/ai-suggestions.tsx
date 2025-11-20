'use client';

import { useLanguage } from '@/app/context/language-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AiSuggestions() {
    const { t } = useLanguage();

    const suggestions = [
        {
            id: 1,
            title: 'Reduce Dining Out',
            description: 'You spent 20% more on restaurants this month. Cooking at home could save you ~2,000,000 ₫.',
            color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800'
        },
        {
            id: 2,
            title: 'Cancel Unused Subscriptions',
            description: 'We noticed a recurring payment for "Streaming Service" that you rarely use.',
            color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
        }
    ];

    return (
        <Card className="glass-card border-0 shadow-lg h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    {t('AI Features')}
                </CardTitle>
                <CardDescription>
                    {t('Saving Suggestions')}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {suggestions.map((suggestion) => (
                    <div
                        key={suggestion.id}
                        className={`p-4 rounded-lg border ${suggestion.color} transition-all hover:scale-[1.02] cursor-pointer`}
                    >
                        <h4 className="font-semibold mb-1">{suggestion.title}</h4>
                        <p className="text-sm opacity-90">{suggestion.description}</p>
                    </div>
                ))}
                <Button variant="ghost" className="w-full text-primary hover:text-primary/80 hover:bg-primary/5">
                    {t('View All')} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardContent>
        </Card>
    );
}
