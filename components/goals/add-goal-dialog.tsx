'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface AddGoalDialogProps {
    onGoalAdded?: () => void;
    goal?: any;
}

const ICONS = ['🎯', '💰', '🏠', '🚗', '✈️', '🎓', '💍', '🎮', '📱', '⌚'];

export function AddGoalDialog({ onGoalAdded, goal }: AddGoalDialogProps) {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: goal?.name || '',
        targetAmount: goal?.targetAmount || '',
        currentAmount: goal?.currentAmount || 0,
        deadline: goal?.deadline ? new Date(goal.deadline).toISOString().split('T')[0] : '',
        description: goal?.description || '',
        icon: goal?.icon || '🎯'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                targetAmount: parseFloat(formData.targetAmount),
                currentAmount: parseFloat(formData.currentAmount) || 0,
                deadline: formData.deadline || null
            };

            if (goal) {
                await api.put(`/goals/${goal._id}`, payload);
                toast.success(t('Goal updated successfully'));
            } else {
                await api.post('/goals', payload);
                toast.success(t('Goal created successfully'));
            }

            setOpen(false);
            setFormData({
                name: '',
                targetAmount: '',
                currentAmount: 0,
                deadline: '',
                description: '',
                icon: '🎯'
            });
            onGoalAdded?.();
        } catch (error: any) {
            console.error('Error saving goal:', error);
            toast.error(error.response?.data?.message || 'Failed to save goal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {goal ? (
                    <Button variant="ghost" size="sm">{t('Edit')}</Button>
                ) : (
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        {t('Add Goal')}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{goal ? t('Edit Goal') : t('Add Goal')}</DialogTitle>
                    <DialogDescription>
                        {t('Set savings goals and track your progress.')}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>{t('Icon')}</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {ICONS.map((icon) => (
                                <button
                                    key={icon}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, icon }))}
                                    className={`text-2xl p-2 rounded-lg border-2 transition-all ${formData.icon === icon
                                            ? 'border-primary bg-primary/10'
                                            : 'border-transparent hover:border-gray-300'
                                        }`}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="name">{t('Goal Name')}</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t('e.g., Emergency Fund')}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="targetAmount">{t('Target Amount')}</Label>
                            <Input
                                id="targetAmount"
                                name="targetAmount"
                                type="number"
                                value={formData.targetAmount}
                                onChange={handleChange}
                                placeholder="10000000"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="currentAmount">{t('Current Amount')}</Label>
                            <Input
                                id="currentAmount"
                                name="currentAmount"
                                type="number"
                                value={formData.currentAmount}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="deadline">{t('Deadline')} ({t('Optional')})</Label>
                        <Input
                            id="deadline"
                            name="deadline"
                            type="date"
                            value={formData.deadline}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">{t('Description')} ({t('Optional')})</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder={t('Add notes about this goal...')}
                            rows={2}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            {t('Cancel')}
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? t('Saving...') : goal ? t('Update') : t('Create')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
