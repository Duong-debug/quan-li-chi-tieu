'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Repeat, Loader2, Pause, Play, Calendar } from 'lucide-react';
import { AddRecurringDialog } from '@/components/recurring/add-recurring-dialog';
import api from '@/lib/api';
import { toast } from 'sonner';

export default function RecurringPage() {
    const { t } = useLanguage();
    const [recurring, setRecurring] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRecurring = async () => {
        try {
            setLoading(true);
            const response = await api.get('/recurring');
            setRecurring(response.data);
        } catch (error: any) {
            console.error('Error fetching recurring transactions:', error);
            toast.error('Failed to load recurring transactions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecurring();
    }, []);

    const handleToggle = async (id: string) => {
        try {
            await api.post(`/recurring/${id}/toggle`);
            toast.success(t('Status updated'));
            fetchRecurring();
        } catch (error: any) {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(t('Are you sure you want to delete this recurring transaction?'))) {
            return;
        }

        try {
            await api.delete(`/recurring/${id}`);
            toast.success(t('Recurring transaction deleted successfully'));
            fetchRecurring();
        } catch (error: any) {
            toast.error('Failed to delete');
        }
    };

    const formatNextOccurrence = (date: string) => {
        return new Date(date).toLocaleDateString('vi-VN');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gradient flex items-center gap-2">
                        <Repeat className="h-8 w-8" />
                        {t('Recurring Transactions')}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {t('Manage automatic transactions for bills and subscriptions')}
                    </p>
                </div>
                <AddRecurringDialog onRecurringAdded={fetchRecurring} />
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : recurring.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Repeat className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">{t('No recurring transactions yet')}</h3>
                        <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
                            {t('Set up automatic transactions for bills and subscriptions.')}
                        </p>
                        <AddRecurringDialog onRecurringAdded={fetchRecurring} />
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {recurring.map((item) => (
                        <Card key={item._id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-lg">{item.title}</CardTitle>
                                    <Badge variant={item.isActive ? 'default' : 'secondary'}>
                                        {item.isActive ? t('Active') : t('Paused')}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">{t('Amount')}</span>
                                        <span className={`font-semibold ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                            {item.type === 'income' ? '+' : '-'}{item.amount.toLocaleString('vi-VN')}₫
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">{t('Category')}</span>
                                        <span>{t(item.category)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">{t('Frequency')}</span>
                                        <span>{t(item.frequency.charAt(0).toUpperCase() + item.frequency.slice(1))}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {t('Next Occurrence')}
                                        </span>
                                        <span className="font-medium">{formatNextOccurrence(item.nextOccurrence)}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleToggle(item._id)}
                                    >
                                        {item.isActive ? (
                                            <><Pause className="h-4 w-4 mr-1" /> {t('Pause')}</>
                                        ) : (
                                            <><Play className="h-4 w-4 mr-1" /> {t('Resume')}</>
                                        )}
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        {t('Delete')}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
