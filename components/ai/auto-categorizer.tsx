'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function AutoCategorizer() {
  const { t } = useLanguage();
  const [description, setDescription] = useState('');
  const [suggestedCategory, setSuggestedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // AI categorization logic (simulated)
  const categorizeDescription = (text: string) => {
    const lowerText = text.toLowerCase();
    const categoryMap: { [key: string]: string } = {
      food: ['eat', 'lunch', 'dinner', 'breakfast', 'restaurant', 'coffee', 'pizza', 'burger', 'rice', 'food'],
      transportation: ['taxi', 'bus', 'car', 'train', 'travel', 'transport', 'flight', 'ticket'],
      entertainment: ['movie', 'cinema', 'game', 'play', 'concert', 'theater', 'show'],
      utilities: ['electric', 'water', 'bill', 'internet', 'phone', 'utility'],
      health: ['doctor', 'medicine', 'hospital', 'health', 'clinic', 'pharmacy'],
      education: ['school', 'course', 'book', 'learn', 'education', 'tuition'],
      shopping: ['shop', 'buy', 'store', 'mall', 'purchase', 'clothes'],
    };

    for (const [category, keywords] of Object.entries(categoryMap)) {
      if (keywords.some((kw) => lowerText.includes(kw))) {
        return category;
      }
    }
    return 'other';
  };

  const handleSuggest = async () => {
    setLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      const category = categorizeDescription(description);
      setSuggestedCategory(category);
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="border-0 shadow-md h-full">
      <CardHeader>
        <CardTitle>{t('ai.autoCategory')}</CardTitle>
        <CardDescription>
          {t('ai.enterDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="e.g., Lunch at Italian restaurant"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          onClick={handleSuggest}
          disabled={!description.trim() || loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {loading ? 'Analyzing...' : 'Suggest Category'}
        </Button>
        
        {suggestedCategory && (
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              {t('ai.suggestedCategory')}
            </p>
            <p className="text-lg font-bold text-green-900 dark:text-green-300 mt-1">
              {t(`categories.${suggestedCategory}`)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
