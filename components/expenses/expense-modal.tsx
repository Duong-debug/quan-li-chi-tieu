'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Calendar as CalendarIcon, DollarSign, Tag, Type, FileText } from 'lucide-react';

interface Expense {
  id?: string;
  _id?: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
  description?: string;
}

interface ExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (expense: any) => void;
  editingExpense: Expense | null;
}

export function ExpenseModal({ open, onOpenChange, onSubmit, editingExpense }: ExpenseModalProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount.toString(),
        category: editingExpense.category,
        date: editingExpense.date.split('T')[0],
        note: editingExpense.note || editingExpense.description || '',
      });
    } else {
      setFormData({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        note: '',
      });
    }
  }, [editingExpense, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay if needed, or just submit
    try {
      await onSubmit({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      // Form reset is handled by useEffect when open changes or editingExpense changes
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] glass-card border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">
            {editingExpense ? t('Edit Expense') : t('Add New Expense')}
          </DialogTitle>
          <DialogDescription>
            {editingExpense
              ? t('Update the details of your expense.')
              : t('Enter the details of your expense here.')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                {t('Title')}
              </Label>
              <div className="relative">
                <Type className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Grocery Shopping"
                  value={formData.title}
                  onChange={handleChange}
                  className="pl-10 bg-background/50 border-input/50 focus:border-primary focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium">
                  {t('Amount')}
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleChange}
                    className="pl-10 bg-background/50 border-input/50 focus:border-primary focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  {t('Category')}
                </Label>
                <Select onValueChange={handleCategoryChange} value={formData.category}>
                  <SelectTrigger className="bg-background/50 border-input/50 focus:border-primary focus:ring-primary/20">
                    <div className="flex items-center">
                      <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Select" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">
                {t('Date')}
              </Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="pl-10 bg-background/50 border-input/50 focus:border-primary focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note" className="text-sm font-medium">
                {t('Note')}
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="note"
                  name="note"
                  placeholder="Optional details..."
                  value={formData.note}
                  onChange={handleChange}
                  className="pl-10 min-h-[80px] bg-background/50 border-input/50 focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-md"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                editingExpense ? t('Update Expense') : t('Save Expense')
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
