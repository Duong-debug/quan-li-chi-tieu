'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus } from 'lucide-react';
import { AddGoalDialog } from './add-goal-dialog';
import { ContributeDialog } from './contribute-dialog';
import api from '@/lib/api';
import { toast } from 'sonner';
import { formatCurrency as formatCurrencyUtil } from '@/lib/currency';

interface GoalCardProps {
    goal: any;
    onUpdate: () => void;
}

export function GoalCard({ goal, onUpdate }: GoalCardProps) {
    const { t, language } = useLanguage();
    const [deleting, setDeleting] = useState(false);

    const formatCurrency = (amount: number) => {
        return formatCurrencyUtil(amount, language);
    };

    const handleDelete = async () => {
        if (!confirm(t('Are you sure you want to delete this goal?'))) return;

        setDeleting(true);
        try {
            await api.delete(`/goals/${goal._id}`);
            toast.success(t('Goal deleted successfully'));
            onUpdate();
        } catch (error) {
            console.error('Error deleting goal:', error);
            toast.error('Failed to delete goal');
        } finally {
            setDeleting(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500';
            case 'overdue':
                return 'bg-red-500';
            default:
                return 'bg-blue-500';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return t('Completed');
            case 'overdue':
                return t('Overdue');
            default:
                return t('In Progress');
        }
    };

    return (
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-4xl">{goal.icon}</span>
                        <div>
                            <h3 className="font-semibold text-lg">{goal.name}</h3>
                            {goal.description && (
                                <p className="text-sm text-muted-foreground">{goal.description}</p>
                            )}
                        </div>
                    </div>
                    <Badge className={getStatusColor(goal.status)}>
                        {getStatusText(goal.status)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('Progress')}</span>
                        <span className="font-semibold">{goal.progress.percentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={Math.min(goal.progress.percentage, 100)} className="h-3" />
                </div>

                {/* Amounts */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">{t('Current Amount')}</p>
                        <p className="font-semibold text-lg text-green-600">
                            {formatCurrency(goal.currentAmount)}
                        </p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">{t('Target Amount')}</p>
                        <p className="font-semibold text-lg">
                            {formatCurrency(goal.targetAmount)}
                        </p>
                    </div>
                </div>

                {/* Remaining */}
                {goal.progress.remaining > 0 && (
                    <div className="text-sm">
                        <p className="text-muted-foreground">{t('Remaining')}</p>
                        <p className="font-semibold text-lg text-orange-600">
                            {formatCurrency(goal.progress.remaining)}
                        </p>
                    </div>
                )}

                {/* Deadline */}
                {goal.deadline && (
                    <div className="text-sm">
                        <p className="text-muted-foreground">{t('Deadline')}</p>
                        <p className="font-semibold">
                            {new Date(goal.deadline).toLocaleDateString('vi-VN')}
                            {goal.daysLeft !== null && (
                                <span className={`ml-2 ${goal.daysLeft < 0 ? 'text-red-600' : 'text-blue-600'}`}>
                                    ({goal.daysLeft > 0 ? `${goal.daysLeft} ${t('Days Left')}` : t('Overdue')})
                                </span>
                            )}
                        </p>
                    </div>
                )}

                {/* Completed Message */}
                {goal.status === 'completed' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                        <p className="text-green-700 font-semibold">🎉 {t('You have reached your goal!')}</p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                    {goal.status !== 'completed' && (
                        <ContributeDialog goal={goal} onContribute={onUpdate} />
                    )}
                    <AddGoalDialog goal={goal} onGoalAdded={onUpdate} />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
