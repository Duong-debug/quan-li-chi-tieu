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
import { Slider } from '@/components/ui/slider';
import { Loader2, Plus, TrendingUp } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface AddBudgetDialogProps {
    onBudgetAdded: () => void;
    editingBudget?: any;
    onClose?: () => void;
}

const CATEGORIES = [
    'Food', 'Transportation', 'Entertainment', 'Utilities',
    'Health', 'Education', 'Shopping', 'Other'
];

const PERIODS = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
];

export function AddBudgetDialog({ onBudgetAdded, editingBudget, onClose }: AddBudgetDialogProps) {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        category: editingBudget?.category || '',
        amount: editingBudget?.amount || '',
        period: editingBudget?.period || 'monthly',
        startDate: editingBudget?.startDate ? new Date(editingBudget.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        endDate: editingBudget?.endDate ? new Date(editingBudget.endDate).toISOString().split('T')[0] : '',
        alertThreshold: editingBudget?.alertThreshold || 80,
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
            };

            console.log('Sending budget payload:', payload);

            if (editingBudget) {
                await api.put(`/budgets/${editingBudget._id}`, payload);
                toast.success(t('Budget updated successfully'));
            } else {
                await api.post('/budgets', payload);
                toast.success(t('Budget created successfully'));
            }

            setOpen(false);
            setFormData({
                category: '',
                amount: '',
                period: 'monthly',
                startDate: new Date().toISOString().split('T')[0],
                endDate: '',
                alertThreshold: 80,
            });
            onBudgetAdded();
            if (onClose) onClose();
        } catch (error: any) {
            console.error('Error saving budget:', error);
            console.error('Error response:', error.response?.data);
            const errorMessage = error.response?.data?.message || 'Failed to save budget';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen && onClose) onClose();
    };

    return (
        <Dialog open={editingBudget ? true : open} onOpenChange={handleOpenChange}>
            {!editingBudget && (
                <DialogTrigger asChild>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" /> {t('Add Budget')}
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[500px] glass-card border-0 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gradient flex items-center gap-2">
                        <TrendingUp className="h-6 w-6" />
                        {editingBudget ? t('Edit Budget') : t('Add Budget')}
                    </DialogTitle>
                    <DialogDescription>
                        {editingBudget
                            ? t('Update your budget details.')
                            : t('Set a spending limit for a category.')}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
                            <Label htmlFor="amount">{t('Budget Amount')}</Label>
                            <Input
                                id="amount"
                                type="number"
                                min="0"
                                step="1000"
                                placeholder="5,000,000"
                                value={formData.amount}
                                onChange={(e) => handleChange('amount', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="period">{t('Period')}</Label>
                            <Select
                                value={formData.period}
                                onValueChange={(value) => handleChange('period', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {PERIODS.map((period) => (
                                        <SelectItem key={period.value} value={period.value}>
                                            {t(period.label)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

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

                    <div className="space-y-2">
                        <Label htmlFor="alertThreshold">
                            {t('Alert Threshold')}: {formData.alertThreshold}%
                        </Label>
                        <Slider
                            id="alertThreshold"
                            min={50}
                            max={100}
                            step={5}
                            value={[formData.alertThreshold]}
                            onValueChange={(value) => handleChange('alertThreshold', value[0])}
                            className="w-full"
                        />
                        <p className="text-xs text-muted-foreground">
                            {t('Get notified when spending reaches this percentage')}
                        </p>
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
                            {editingBudget ? t('Update Budget') : t('Create Budget')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
