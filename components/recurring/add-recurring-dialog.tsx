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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Loader2, Plus, Repeat } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface AddRecurringDialogProps {
    onRecurringAdded: () => void;
    editingRecurring?: any;
    onClose?: () => void;
}

const CATEGORIES = [
    'Food', 'Transportation', 'Entertainment', 'Utilities',
    'Health', 'Education', 'Shopping', 'Other'
];

const FREQUENCIES = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
];

const TYPES = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
];

export function AddRecurringDialog({ onRecurringAdded, editingRecurring, onClose }: AddRecurringDialogProps) {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: editingRecurring?.title || '',
        category: editingRecurring?.category || '',
        amount: editingRecurring?.amount || '',
        type: editingRecurring?.type || 'expense',
        frequency: editingRecurring?.frequency || 'monthly',
        startDate: editingRecurring?.startDate ? new Date(editingRecurring.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        endDate: editingRecurring?.endDate ? new Date(editingRecurring.endDate).toISOString().split('T')[0] : '',
        dayOfMonth: editingRecurring?.dayOfMonth || '',
        dayOfWeek: editingRecurring?.dayOfWeek || '',
        note: editingRecurring?.note || '',
    });

    const handleChange = (name: string, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                amount: parseFloat(formData.amount),
                endDate: formData.endDate || undefined,
                dayOfMonth: formData.dayOfMonth ? parseInt(formData.dayOfMonth) : undefined,
                dayOfWeek: formData.dayOfWeek ? parseInt(formData.dayOfWeek) : undefined,
            };

            if (editingRecurring) {
                await api.put(`/recurring/${editingRecurring._id}`, payload);
                toast.success(t('Recurring transaction updated successfully'));
            } else {
                await api.post('/recurring', payload);
                toast.success(t('Recurring transaction created successfully'));
            }

            setOpen(false);
            setFormData({
                title: '',
                category: '',
                amount: '',
                type: 'expense',
                frequency: 'monthly',
                startDate: new Date().toISOString().split('T')[0],
                endDate: '',
                dayOfMonth: '',
                dayOfWeek: '',
                note: '',
            });
            onRecurringAdded();
            if (onClose) onClose();
        } catch (error: any) {
            console.error('Error saving recurring transaction:', error);
            toast.error(error.response?.data?.message || 'Failed to save recurring transaction');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen && onClose) onClose();
    };

    return (
        <Dialog open={editingRecurring ? true : open} onOpenChange={handleOpenChange}>
            {!editingRecurring && (
                <DialogTrigger asChild>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" /> {t('Add Recurring')}
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[550px] glass-card border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gradient flex items-center gap-2">
                        <Repeat className="h-6 w-6" />
                        {editingRecurring ? t('Edit Recurring') : t('Add Recurring')}
                    </DialogTitle>
                    <DialogDescription>
                        {editingRecurring
                            ? t('Update your recurring transaction.')
                            : t('Set up automatic transactions for bills and subscriptions.')}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">{t('Title')}</Label>
                        <Input
                            id="title"
                            placeholder="Netflix Subscription"
                            value={formData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">{t('Category')}</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => handleChange('category', value)}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('Select category')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {CATEGORIES.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {t(cat)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">{t('Type')}</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value) => handleChange('type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {TYPES.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {t(type.label)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">{t('Amount')}</Label>
                            <Input
                                id="amount"
                                type="number"
                                min="0"
                                step="1000"
                                placeholder="100,000"
                                value={formData.amount}
                                onChange={(e) => handleChange('amount', e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="frequency">{t('Frequency')}</Label>
                            <Select
                                value={formData.frequency}
                                onValueChange={(value) => handleChange('frequency', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {FREQUENCIES.map((freq) => (
                                        <SelectItem key={freq.value} value={freq.value}>
                                            {t(freq.label)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startDate">{t('Start Date')}</Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => handleChange('startDate', e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="endDate">{t('End Date')} ({t('Optional')})</Label>
                            <Input
                                id="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => handleChange('endDate', e.target.value)}
                                min={formData.startDate}
                            />
                        </div>
                    </div>

                    {formData.frequency === 'monthly' && (
                        <div className="space-y-2">
                            <Label htmlFor="dayOfMonth">{t('Day of Month')} (1-31)</Label>
                            <Input
                                id="dayOfMonth"
                                type="number"
                                min="1"
                                max="31"
                                placeholder="15"
                                value={formData.dayOfMonth}
                                onChange={(e) => handleChange('dayOfMonth', e.target.value)}
                            />
                        </div>
                    )}

                    {formData.frequency === 'weekly' && (
                        <div className="space-y-2">
                            <Label htmlFor="dayOfWeek">{t('Day of Week')}</Label>
                            <Select
                                value={formData.dayOfWeek}
                                onValueChange={(value) => handleChange('dayOfWeek', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('Select day')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Sunday</SelectItem>
                                    <SelectItem value="1">Monday</SelectItem>
                                    <SelectItem value="2">Tuesday</SelectItem>
                                    <SelectItem value="3">Wednesday</SelectItem>
                                    <SelectItem value="4">Thursday</SelectItem>
                                    <SelectItem value="5">Friday</SelectItem>
                                    <SelectItem value="6">Saturday</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="note">{t('Note')} ({t('Optional')})</Label>
                        <Input
                            id="note"
                            placeholder="Monthly subscription"
                            value={formData.note}
                            onChange={(e) => handleChange('note', e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                        >
                            {loading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            {editingRecurring ? t('Update Recurring') : t('Create Recurring')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
