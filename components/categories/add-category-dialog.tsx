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
import { Loader2, Plus, Palette } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface AddCategoryDialogProps {
    onCategoryAdded: () => void;
    editingCategory?: any;
    onClose?: () => void;
}

const PRESET_COLORS = [
    '#ef4444', // red
    '#f97316', // orange
    '#f59e0b', // amber
    '#eab308', // yellow
    '#84cc16', // lime
    '#22c55e', // green
    '#10b981', // emerald
    '#14b8a6', // teal
    '#06b6d4', // cyan
    '#0ea5e9', // sky
    '#3b82f6', // blue
    '#6366f1', // indigo
    '#8b5cf6', // violet
    '#a855f7', // purple
    '#d946ef', // fuchsia
    '#ec4899', // pink
];

export function AddCategoryDialog({ onCategoryAdded, editingCategory, onClose }: AddCategoryDialogProps) {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: editingCategory?.name || '',
        color: editingCategory?.color || '#3b82f6',
        icon: editingCategory?.icon || '',
        budgetLimit: editingCategory?.budgetLimit || 5000000,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingCategory) {
                await api.put(`/categories/${editingCategory._id}`, formData);
                toast.success(t('Category updated successfully'));
            } else {
                await api.post('/categories', formData);
                toast.success(t('Category created successfully'));
            }

            setOpen(false);
            setFormData({ name: '', color: '#3b82f6', icon: '', budgetLimit: 5000000 });
            onCategoryAdded();
            if (onClose) onClose();
        } catch (error: any) {
            console.error('Error saving category:', error);
            toast.error(error.response?.data?.message || 'Failed to save category');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            setFormData({ name: '', color: '#3b82f6', icon: '', budgetLimit: 5000000 });
            if (onClose) onClose();
        }
    };

    return (
        <Dialog open={editingCategory ? true : open} onOpenChange={handleOpenChange}>
            {!editingCategory && (
                <DialogTrigger asChild>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" /> {t('Add')}
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[450px] glass-card border-0 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gradient">
                        {editingCategory ? t('Edit Category') : t('Add Category')}
                    </DialogTitle>
                    <DialogDescription>
                        {editingCategory
                            ? t('Update the details of your category.')
                            : t('Create a new category to organize your expenses.')}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                {t('Category Name')}
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder={t('e.g. Food, Transport')}
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-background/50 border-input/50 focus:border-primary focus:ring-primary/20"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="budgetLimit" className="text-sm font-medium">
                                {t('Budget Limit')} ({t('Optional')})
                            </Label>
                            <Input
                                id="budgetLimit"
                                name="budgetLimit"
                                type="number"
                                placeholder="5000000"
                                value={formData.budgetLimit}
                                onChange={handleChange}
                                className="bg-background/50 border-input/50 focus:border-primary focus:ring-primary/20"
                                min="0"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium flex items-center gap-2">
                                <Palette className="h-4 w-4" />
                                {t('Color')}
                            </Label>
                            <div className="grid grid-cols-8 gap-2">
                                {PRESET_COLORS.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setFormData((prev) => ({ ...prev, color }))}
                                        className={`h-10 w-10 rounded-lg transition-all hover:scale-110 ${formData.color === color ? 'ring-2 ring-primary ring-offset-2' : ''
                                            }`}
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <Input
                                    type="color"
                                    value={formData.color}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                                    className="h-10 w-20 cursor-pointer"
                                />
                                <Input
                                    type="text"
                                    value={formData.color}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                                    className="flex-1 bg-background/50"
                                    placeholder="#3b82f6"
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
                                editingCategory ? t('Update Expense') : t('Save Expense')
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
