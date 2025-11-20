'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Receipt, Loader2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ExportPDFButton } from '@/components/reports/export-pdf-button';
import api from '@/lib/api';
import { toast } from 'sonner';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function ReportsPage() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [period, setPeriod] = useState('this-month');
    const [customDates, setCustomDates] = useState({
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });

    const [summary, setSummary] = useState<any>(null);
    const [categoryBreakdown, setCategoryBreakdown] = useState<any[]>([]);
    const [trends, setTrends] = useState<any[]>([]);
    const [topExpenses, setTopExpenses] = useState<any[]>([]);

    const getDateRange = () => {
        const now = new Date();
        let startDate, endDate;

        switch (period) {
            case 'this-month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                endDate = now;
                break;
            case 'last-month':
                startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                endDate = new Date(now.getFullYear(), now.getMonth(), 0);
                break;
            case 'this-year':
                startDate = new Date(now.getFullYear(), 0, 1);
                endDate = now;
                break;
            case 'custom':
                return customDates;
            default:
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                endDate = now;
        }

        return {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0]
        };
    };

    const fetchReports = async () => {
        try {
            setLoading(true);
            const { startDate, endDate } = getDateRange();

            const [summaryRes, categoryRes, trendsRes, topRes] = await Promise.all([
                api.get('/reports/summary', { params: { startDate, endDate } }),
                api.get('/reports/category-breakdown', { params: { startDate, endDate, type: 'expense' } }),
                api.get('/reports/trends', { params: { year: new Date().getFullYear() } }),
                api.get('/reports/top-expenses', { params: { startDate, endDate, limit: 5 } })
            ]);

            setSummary(summaryRes.data);
            setCategoryBreakdown(categoryRes.data);
            setTrends(trendsRes.data);
            setTopExpenses(topRes.data);
        } catch (error: any) {
            console.error('Error fetching reports:', error);
            toast.error('Failed to load reports');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [period, customDates]);

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('vi-VN') + '₫';
    };

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gradient flex items-center gap-2">
                        <BarChart3 className="h-8 w-8" />
                        {t('Financial Reports')}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {t('Analyze your spending patterns and trends')}
                    </p>
                </div>
                {summary && (
                    <ExportPDFButton
                        summary={summary}
                        categoryBreakdown={categoryBreakdown}
                        topExpenses={topExpenses}
                        period={period}
                    />
                )}
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex gap-4 items-end">
                        <div className="flex-1">
                            <Label>{t('Period')}</Label>
                            <Select value={period} onValueChange={setPeriod}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="this-month">{t('This Month')}</SelectItem>
                                    <SelectItem value="last-month">{t('Last Month')}</SelectItem>
                                    <SelectItem value="this-year">{t('This Year')}</SelectItem>
                                    <SelectItem value="custom">{t('Custom Range')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {period === 'custom' && (
                            <>
                                <div className="flex-1">
                                    <Label>{t('Start Date')}</Label>
                                    <Input
                                        type="date"
                                        value={customDates.startDate}
                                        onChange={(e) => setCustomDates(prev => ({ ...prev, startDate: e.target.value }))}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Label>{t('End Date')}</Label>
                                    <Input
                                        type="date"
                                        value={customDates.endDate}
                                        onChange={(e) => setCustomDates(prev => ({ ...prev, endDate: e.target.value }))}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <>
                    {/* Summary Cards */}
                    {summary && (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">{t('Total Income')}</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalIncome)}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">{t('Total Expense')}</CardTitle>
                                    <TrendingDown className="h-4 w-4 text-red-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-red-600">{formatCurrency(summary.totalExpense)}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">{t('Net Balance')}</CardTitle>
                                    <DollarSign className="h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {formatCurrency(summary.balance)}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">{t('Transaction Count')}</CardTitle>
                                    <Receipt className="h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{summary.transactionCount}</div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Charts */}
                    <div id="charts-container" className="grid gap-4 md:grid-cols-2">
                        {/* Category Breakdown - Pie Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('Category Breakdown')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={categoryBreakdown}
                                            dataKey="amount"
                                            nameKey="category"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            label={(entry: any) => `${entry.category}: ${entry.percentage.toFixed(1)}%`}
                                        >
                                            {categoryBreakdown.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: any) => formatCurrency(value)} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Monthly Trends - Line Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('Monthly Trends')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={trends}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" tickFormatter={(month) => monthNames[month - 1]} />
                                        <YAxis tickFormatter={(value) => (value / 1000000).toFixed(1) + 'M'} />
                                        <Tooltip formatter={(value: any) => formatCurrency(value)} />
                                        <Legend />
                                        <Line type="monotone" dataKey="income" stroke="#10b981" name={t('Income')} />
                                        <Line type="monotone" dataKey="expense" stroke="#ef4444" name={t('Expense')} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Top Expenses - Bar Chart */}
                    {topExpenses.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('Top Expenses')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={topExpenses}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="title" />
                                        <YAxis tickFormatter={(value) => (value / 1000000).toFixed(1) + 'M'} />
                                        <Tooltip formatter={(value: any) => formatCurrency(value)} />
                                        <Bar dataKey="amount" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    )}
                </>
            )}
        </div>
    );
}
