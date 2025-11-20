'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/lib/api';
import { toast } from 'sonner';
import { Plus, Loader2, Calendar as CalendarIcon, DollarSign, Tag, Type } from 'lucide-react';

interface AddExpenseDialogProps {
    onExpenseAdded: () => void;
}

export function AddExpenseDialog({ onExpenseAdded }: AddExpenseDialogProps) {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (value: string) => {
        setFormData((prev) => ({ ...prev, category: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/transactions', {
                ...formData,
                amount: parseFloat(formData.amount),
                type: 'expense', // Hardcoded for now, could be dynamic
            });
            toast.success(t('Expense added successfully'));
            setOpen(false);
            setFormData({
                title: '',
                amount: '',
                category: '',
                date: new Date().toISOString().split('T')[0],
                description: '',
            });
            onExpenseAdded();
        } catch (error: any) {
            console.error('Error adding expense:', error);
            toast.error(error.response?.data?.message || t('Failed to add expense'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg transition-all hover:scale-105" suppressHydrationWarning>
                    <Plus className="mr-2 h-4 w-4" /> {t('Quick Add Transaction')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] glass-card border-0 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gradient">{t('Add New Expense')}</DialogTitle>
                    <DialogDescription>
                        {t('Enter the details of your expense here.')}
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
                                    placeholder={t('e.g. Grocery Shopping')}
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
                                            <SelectValue placeholder={t('Select category')} />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Food">{t('Food')}</SelectItem>
                                        <SelectItem value="Transport">{t('Transportation')}</SelectItem>
                                        <SelectItem value="Utilities">{t('Utilities')}</SelectItem>
                                        <SelectItem value="Health">{t('Health')}</SelectItem>
                                        <SelectItem value="Education">{t('Education')}</SelectItem>
                                        <SelectItem value="Shopping">{t('Shopping')}</SelectItem>
                                        <SelectItem value="Entertainment">{t('Entertainment')}</SelectItem>
                                        <SelectItem value="Other">{t('Other')}</SelectItem>
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
                                t('Save Expense')
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
