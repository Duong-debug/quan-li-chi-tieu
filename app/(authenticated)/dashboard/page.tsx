'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddExpenseDialog } from '@/components/expenses/add-expense-dialog';
import { AddIncomeDialog } from '@/components/income/add-income-dialog';
import { ExpenseList } from '@/components/expenses/expense-list';
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, TrendingUp, Loader2 } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import api from '@/lib/api';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/currency';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export default function Dashboard() {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all transactions
      const response = await api.get('/transactions');
      const transactions = response.data;

      // Calculate totals
      const incomes = transactions.filter((t: any) => t.type === 'income');
      const expenses = transactions.filter((t: any) => t.type === 'expense');
      
      const incomeTotal = incomes.reduce((sum: number, t: any) => sum + t.amount, 0);
      const expenseTotal = expenses.reduce((sum: number, t: any) => sum + t.amount, 0);
      
      setTotalIncome(incomeTotal);
      setTotalExpense(expenseTotal);
      setBalance(incomeTotal - expenseTotal);

      // Get recent transactions (last 5)
      setRecentTransactions(transactions.slice(0, 5));

      // Calculate category breakdown for expenses
      const categoryMap: any = {};
      expenses.forEach((t: any) => {
        const category = t.category || 'Other';
        if (!categoryMap[category]) {
          categoryMap[category] = 0;
        }
        categoryMap[category] += t.amount;
      });

      const categoryArray = Object.keys(categoryMap).map(key => ({
        name: key,
        value: categoryMap[key]
      }));
      setCategoryData(categoryArray);

      // Calculate monthly data (last 6 months)
      const monthlyMap: any = {};
      const now = new Date();
      
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthName = date.toLocaleDateString('vi-VN', { month: 'short' });
        monthlyMap[monthKey] = { name: monthName, income: 0, expense: 0 };
      }

      transactions.forEach((t: any) => {
        const date = new Date(t.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (monthlyMap[monthKey]) {
          if (t.type === 'income') {
            monthlyMap[monthKey].income += t.amount;
          } else {
            monthlyMap[monthKey].expense += t.amount;
          }
        }
      });

      setMonthlyData(Object.values(monthlyMap));

    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast.error(t('Failed to load dashboard data'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">{t('Dashboard')}</h2>
          <p className="text-muted-foreground">{t('Overview of your financial situation')}</p>
        </div>
        <div className="flex items-center gap-2">
          <AddIncomeDialog onIncomeAdded={fetchDashboardData} />
          <AddExpenseDialog onExpenseAdded={fetchDashboardData} />
        </div>
      </div>

      {/* Summary Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="glass-card border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">
                {t('Total Balance')}
              </CardTitle>
              <Wallet className="h-4 w-4 text-blue-100" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(balance, language)}</div>
              <p className="text-xs text-blue-100 flex items-center mt-1">
                {balance >= 0 ? (
                  <><ArrowUpRight className="h-3 w-3 mr-1" /> {t('Positive balance')}</>
                ) : (
                  <><ArrowDownRight className="h-3 w-3 mr-1" /> {t('Negative balance')}</>
                )}
              </p>
            </CardContent>
          </Card>
          <Card className="glass-card border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('Total Income')}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{formatCurrency(totalIncome, language)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {t('All time income')}
              </p>
            </CardContent>
          </Card>
          <Card className="glass-card border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('Total Expense')}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">-{formatCurrency(totalExpense, language)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {t('All time expenses')}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 glass-card border-0 shadow-md">
          <CardHeader>
            <CardTitle>{t('Expense by Month')}</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorIncome)"
                  name={t('Income')}
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#EF4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorExpense)"
                  name={t('Expenses')}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3 glass-card border-0 shadow-md">
          <CardHeader>
            <CardTitle>{t('Expense by Category')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="grid gap-4 md:grid-cols-1">
        <Card className="glass-card border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('Recent Transactions') || 'Giao dịch gần đây'}</CardTitle>
            <Button variant="outline" size="sm" className="text-primary hover:text-primary/80">
              {t('View All')}
            </Button>
          </CardHeader>
          <CardContent>
            <ExpenseList expenses={recentTransactions} onExpenseDeleted={fetchDashboardData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
