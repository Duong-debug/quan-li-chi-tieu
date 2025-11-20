'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { AddIncomeDialog } from '@/components/income/add-income-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, TrendingUp, Trash2, Edit2, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import api from '@/lib/api';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/currency';

export default function IncomePage() {
    const { t, language } = useLanguage();
    const [incomes, setIncomes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalIncome, setTotalIncome] = useState(0);

    const fetchIncomes = async () => {
        try {
            setLoading(true);
            const response = await api.get('/transactions?type=income');
            const incomeData = response.data.filter((t: any) => t.type === 'income');
            setIncomes(incomeData);
            
            // Calculate total
            const total = incomeData.reduce((sum: number, income: any) => sum + income.amount, 0);
            setTotalIncome(total);
        } catch (error: any) {
            console.error('Error fetching incomes:', error);
            toast.error(t('Failed to load incomes'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncomes();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm(t('Are you sure you want to delete this income?'))) return;

        try {
            await api.delete(`/transactions/${id}`);
            toast.success(t('Income deleted successfully'));
            fetchIncomes();
        } catch (error) {
            console.error('Error deleting income:', error);
            toast.error(t('Failed to delete income'));
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Salary': return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
            case 'Freelance': return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
            case 'Investment': return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
            case 'Gift': return 'bg-pink-500/10 text-pink-500 hover:bg-pink-500/20';
            default: return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gradient">
                        {t('Income')}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {t('Track and manage your income sources')}
                    </p>
                </div>
                <AddIncomeDialog onIncomeAdded={fetchIncomes} />
            </div>

            {/* Total Income Card */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="h-6 w-6" />
                    <h2 className="text-lg font-medium">{t('Total Income')}</h2>
                </div>
                <p className="text-4xl font-bold">{formatCurrency(totalIncome, language)}</p>
            </div>

            {/* Income Table */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[180px]">{t('Date')}</TableHead>
                            <TableHead>{t('Category')}</TableHead>
                            <TableHead>{t('Title')}</TableHead>
                            <TableHead className="text-right">{t('Amount')}</TableHead>
                            <TableHead className="w-[100px] text-right">{t('Actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                </TableCell>
                            </TableRow>
                        ) : incomes.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    {t('No income records yet')}
                                </TableCell>
                            </TableRow>
                        ) : (
                            incomes.map((income) => (
                                <TableRow key={income._id} className="group hover:bg-muted/50 transition-colors">
                                    <TableCell className="font-medium">
                                        {new Date(income.date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={`gap-1 ${getCategoryColor(income.category)} border-0`}>
                                            {t(income.category)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{income.title}</TableCell>
                                    <TableCell className="text-right font-bold text-green-600">
                                        +{formatCurrency(income.amount, language)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>{t('Actions')}</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(income._id)}
                                                    className="text-destructive focus:text-destructive"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    {t('Delete')}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
