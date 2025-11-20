'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface QuickAddModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickAddModal({ open, onOpenChange }: QuickAddModalProps) {
  const { t } = useLanguage();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [note, setNote] = useState('');

  const categories = [
    { id: 'food', name: t('categories.food') },
    { id: 'transportation', name: t('categories.transportation') },
    { id: 'entertainment', name: t('categories.entertainment') },
    { id: 'utilities', name: t('categories.utilities') },
    { id: 'health', name: t('categories.health') },
    { id: 'education', name: t('categories.education') },
    { id: 'shopping', name: t('categories.shopping') },
    { id: 'other', name: t('categories.other') },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
    setAmount('');
    setCategory('food');
    setNote('');
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md border-0">
        <CardHeader>
          <CardTitle>{t('dashboard.quickAddTransaction')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('expenses.amount')}</label>
              <Input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('expenses.category')}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('expenses.note')}</label>
              <Input
                type="text"
                placeholder="Add a note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {t('expenses.add')}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                {t('settings.logout')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
