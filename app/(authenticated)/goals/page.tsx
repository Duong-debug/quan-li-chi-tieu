'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Target, Loader2 } from 'lucide-react';
import { AddGoalDialog } from '@/components/goals/add-goal-dialog';
import { GoalCard } from '@/components/goals/goal-card';
import api from '@/lib/api';

export default function GoalsPage() {
    const { t } = useLanguage();
    const [goals, setGoals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchGoals = async () => {
        try {
            setLoading(true);
            const response = await api.get('/goals');
            setGoals(response.data);
        } catch (error) {
            console.error('Error fetching goals:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gradient flex items-center gap-2">
                        <Target className="h-8 w-8" />
                        {t('Goals')}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {t('Set savings goals and track your progress.')}
                    </p>
                </div>
                <AddGoalDialog onGoalAdded={fetchGoals} />
            </div>

            {/* Goals Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : goals.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <Target className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{t('No goals yet')}</h3>
                    <p className="text-muted-foreground mb-4">
                        {t('Start setting your financial goals and track your progress.')}
                    </p>
                    <AddGoalDialog onGoalAdded={fetchGoals} />
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {goals.map((goal) => (
                        <GoalCard key={goal._id} goal={goal} onUpdate={fetchGoals} />
                    ))}
                </div>
            )}
        </div>
    );
}
