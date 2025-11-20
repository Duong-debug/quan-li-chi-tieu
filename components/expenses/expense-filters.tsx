'use client';

import { useLanguage } from '@/app/context/language-context';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface ExpenseFiltersProps {
  filters: {
    date: string;
    category: string;
    amount: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function ExpenseFilters({ filters, onFiltersChange }: ExpenseFiltersProps) {
  const { t } = useLanguage();

  const handleChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({ date: '', category: '', amount: '' });
  };

  return (
    <div className="bg-card/50 p-4 rounded-xl border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          {t('Filters')}
        </h3>
        {(filters.date || filters.category || filters.amount) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 text-muted-foreground hover:text-foreground"
          >
            <X className="mr-2 h-3 w-3" />
            {t('Clear')}
          </Button>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label className="text-xs">{t('Date')}</Label>
          <Input
            type="date"
            value={filters.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">{t('Category')}</Label>
          <Select value={filters.category} onValueChange={(value) => handleChange('category', value)}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder={t('All')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('All')}</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Transport">Transport</SelectItem>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs">{t('Max Amount')}</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="number"
              placeholder="e.g. 100000"
              value={filters.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
