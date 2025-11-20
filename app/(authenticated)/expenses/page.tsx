'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { ExpenseTable } from '@/components/expenses/expense-table';
import { ExpenseFilters } from '@/components/expenses/expense-filters';
import { ExpenseModal } from '@/components/expenses/expense-modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
}

export default function ExpensesPage() {
  const { t } = useLanguage();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [filters, setFilters] = useState({ date: '', category: '', amount: '' });

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    let result = expenses;

    if (filters.date) {
      result = result.filter((exp) => exp.date.startsWith(filters.date));
    }

    if (filters.category && filters.category !== 'all') {
      result = result.filter((exp) => exp.category === filters.category);
    }

    if (filters.amount) {
      result = result.filter((exp) => exp.amount <= parseFloat(filters.amount));
    }

    setFilteredExpenses(result);
  }, [filters, expenses]);

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/transactions?type=expense');
      const expenseData = response.data.filter((t: any) => t.type !== 'income');
      setExpenses(expenseData);
      setFilteredExpenses(expenseData);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      toast.error(t('Failed to load expenses'));
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData: any) => {
    try {
      if (editingExpense) {
        await api.put(`/transactions/${editingExpense._id}`, expenseData);
        toast.success(t('Expense updated successfully'));
      } else {
        await api.post('/transactions', { ...expenseData, type: 'expense' });
        toast.success(t('Expense added successfully'));
      }
      fetchExpenses();
      setIsModalOpen(false);
      setEditingExpense(null);
    } catch (error: any) {
      console.error('Error saving expense:', error);
      toast.error(error.response?.data?.message || 'Failed to save expense');
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (!confirm(t('Are you sure you want to delete this expense?'))) return;

    try {
      await api.delete(`/transactions/${id}`);
      toast.success(t('Expense deleted successfully'));
      fetchExpenses();
    } catch (error: any) {
      console.error('Error deleting expense:', error);
      toast.error(error.response?.data?.message || 'Failed to delete expense');
    }
  };

  const openAddModal = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const openEditModal = (expense: Expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">{t('Expense Management')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('View and manage your transaction history.')}
          </p>
        </div>
        <Button
          onClick={openAddModal}
          className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg transition-all hover:scale-105"
        >
          <Plus className="mr-2 h-4 w-4" />
          {t('Add Expense')}
        </Button>
      </div>

      <ExpenseFilters filters={filters} onFiltersChange={setFilters} />

      <ExpenseTable
        expenses={filteredExpenses}
        onEdit={openEditModal}
        onDelete={handleDeleteExpense}
      />

      <ExpenseModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleAddExpense}
        editingExpense={editingExpense}
      />
    </div>
  );
}
