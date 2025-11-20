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

interface ContributeDialogProps {
    goal: any;
    onContribute: () => void;
}

export function ContributeDialog({ goal, onContribute }: ContributeDialogProps) {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        note: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const amount = parseFloat(formData.amount);
            if (amount <= 0) {
                toast.error('Amount must be greater than 0');
                return;
            }

            await api.post(`/goals/${goal._id}/contribute`, {
                amount,
                note: formData.note || null
            });

            toast.success(t('Contribution added successfully'));
            setOpen(false);
            setFormData({ amount: '', note: '' });
            onContribute();
        } catch (error: any) {
            console.error('Error adding contribution:', error);
            toast.error(error.response?.data?.message || 'Failed to add contribution');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 flex-1">
                    <Plus className="h-4 w-4" />
                    {t('Contribute')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>{t('Add Contribution')}</DialogTitle>
                    <DialogDescription>
                        {t('Add money to your goal')} "{goal.name}"
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="amount">{t('Contribution Amount')}</Label>
                        <Input
                            id="amount"
                            name="amount"
                            type="number"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="100000"
                            required
                            autoFocus
                        />
                    </div>

                    <div>
                        <Label htmlFor="note">{t('Note')} ({t('Optional')})</Label>
                        <Textarea
                            id="note"
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            placeholder={t('Add a note...')}
                            rows={3}
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            {t('Cancel')}
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? t('Adding...') : t('Add')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
