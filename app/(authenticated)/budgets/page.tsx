'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Wallet, Loader2, TrendingUp } from 'lucide-react';
import { AddBudgetDialog } from '@/components/budgets/add-budget-dialog';
import api from '@/lib/api';
import { toast } from 'sonner';

export default function BudgetsPage() {
    const { t } = useLanguage();
    const [budgets, setBudgets] = useState<any[]>([]);
    const [budgetsWithProgress, setBudgetsWithProgress] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBudgets = async () => {
        try {
            setLoading(true);
            const response = await api.get('/budgets/current');
            setBudgets(response.data);

            // Fetch progress for each budget
            const progressPromises = response.data.map((budget: any) =>
                api.get(`/budgets/${budget._id}/progress`)
            );
            const progressResults = await Promise.all(progressPromises);
            setBudgetsWithProgress(progressResults.map(r => r.data));
        } catch (error: any) {
            console.error('Error fetching budgets:', error);
            toast.error('Failed to load budgets');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'exceeded': return 'text-red-500';
            case 'warning': return 'text-yellow-500';
            default: return 'text-green-500';
        }
    };

    const getProgressColor = (percentage: number) => {
        if (percentage >= 100) return '[&>div]:bg-red-500';
        if (percentage >= 80) return '[&>div]:bg-yellow-500';
        return '[&>div]:bg-green-500';
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gradient flex items-center gap-2">
                        <Wallet className="h-8 w-8" />
                        {t('Budgets')}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {t('Track your spending limits and stay on budget')}
                    </p>
                </div>
                <AddBudgetDialog onBudgetAdded={fetchBudgets} />
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : budgetsWithProgress.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">{t('No budgets yet')}</h3>
                        <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
                            {t('Create your first budget to track spending limits.')}
                        </p>
                        <AddBudgetDialog onBudgetAdded={fetchBudgets} />
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {budgetsWithProgress.map((data) => {
                        const { budget, spent, percentage, status } = data;
                        return (
                            <Card key={budget._id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center justify-between">
                                        <span>{t(budget.category)}</span>
                                        <span className={`text-sm font-normal ${getStatusColor(status)}`}>
                                            {Math.round(percentage)}%
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{t('Spent')}</span>
                                            <span className="font-semibold">{spent.toLocaleString('vi-VN')}₫</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{t('Budget')}</span>
                                            <span>{budget.amount.toLocaleString('vi-VN')}₫</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <Progress
                                            value={Math.min(percentage, 100)}
                                            className={`h-2 ${getProgressColor(percentage)}`}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            {t('Period')}: {t(budget.period.charAt(0).toUpperCase() + budget.period.slice(1))}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
