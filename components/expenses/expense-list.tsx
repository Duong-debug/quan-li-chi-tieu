'use client';

import { useLanguage } from '@/app/context/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, ShoppingBag, Car, Zap, Film, HelpCircle, TrendingUp, Briefcase, PiggyBank, Gift as GiftIcon } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/currency';

interface Expense {
    _id: string;
    title: string;
    amount: number;
    category: string;
    date: string;
    type?: 'income' | 'expense';
}

interface ExpenseListProps {
    expenses: Expense[];
    onExpenseDeleted: () => void;
}

const getCategoryIcon = (category: string, type?: string) => {
    // Income icons
    if (type === 'income') {
        switch (category) {
            case 'Salary': return <Briefcase className="h-5 w-5" />;
            case 'Freelance': return <TrendingUp className="h-5 w-5" />;
            case 'Investment': return <PiggyBank className="h-5 w-5" />;
            case 'Gift': return <GiftIcon className="h-5 w-5" />;
            default: return <TrendingUp className="h-5 w-5" />;
        }
    }
    
    // Expense icons
    switch (category) {
        case 'Food': return <ShoppingBag className="h-5 w-5" />;
        case 'Transport': return <Car className="h-5 w-5" />;
        case 'Utilities': return <Zap className="h-5 w-5" />;
        case 'Entertainment': return <Film className="h-5 w-5" />;
        default: return <HelpCircle className="h-5 w-5" />;
    }
};

const getCategoryColor = (category: string, type?: string) => {
    // Income colors (green shades)
    if (type === 'income') {
        return 'bg-green-500/10 text-green-600';
    }
    
    // Expense colors
    switch (category) {
        case 'Food': return 'bg-orange-500/10 text-orange-500';
        case 'Transport': return 'bg-blue-500/10 text-blue-500';
        case 'Utilities': return 'bg-yellow-500/10 text-yellow-500';
        case 'Entertainment': return 'bg-purple-500/10 text-purple-500';
        default: return 'bg-gray-500/10 text-gray-500';
    }
};

export function ExpenseList({ expenses, onExpenseDeleted }: ExpenseListProps) {
    const { t, language } = useLanguage();

    const handleDelete = async (id: string) => {
        if (!confirm(t('Are you sure you want to delete this expense?'))) return;

        try {
            await api.delete(`/transactions/${id}`);
            toast.success(t('Expense deleted successfully'));
            onExpenseDeleted();
        } catch (error: any) {
            console.error('Error deleting expense:', error);
            toast.error(error.response?.data?.message || 'Failed to delete expense');
        }
    };

    if (expenses.length === 0) {
        return (
            <div className="text-center py-12 glass-card rounded-xl border-dashed border-2 border-muted">
                <div className="h-12 w-12 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">{t('No transactions yet')}</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {expenses.map((expense) => (
                <div
                    key={expense._id}
                    className="group flex items-center justify-between p-4 rounded-xl bg-card/50 hover:bg-card border border-transparent hover:border-border/50 transition-all duration-200 hover:shadow-md"
                >
                    <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${getCategoryColor(expense.category, expense.type)} transition-colors`}>
                            {getCategoryIcon(expense.category, expense.type)}
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">{expense.title || t(expense.category)}</p>
                            <p className="text-sm text-muted-foreground">
                                {new Date(expense.date).toLocaleDateString()} • {t(expense.category)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`font-bold ${expense.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {expense.type === 'income' ? '+' : '-'}{formatCurrency(expense.amount, language)}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                            onClick={() => handleDelete(expense._id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
