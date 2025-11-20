'use client';

import { useLanguage } from '@/app/context/language-context';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, ShoppingBag, Car, Zap, Film, HelpCircle, MoreHorizontal } from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
}

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Food': return <ShoppingBag className="h-4 w-4" />;
    case 'Transport': return <Car className="h-4 w-4" />;
    case 'Utilities': return <Zap className="h-4 w-4" />;
    case 'Entertainment': return <Film className="h-4 w-4" />;
    default: return <HelpCircle className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Food': return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20';
    case 'Transport': return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
    case 'Utilities': return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
    case 'Entertainment': return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
    default: return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
  }
};

export function ExpenseTable({ expenses, onEdit, onDelete }: ExpenseTableProps) {
  const { t, language } = useLanguage();

  return (
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
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                {t('No transactions found')}
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow key={expense._id} className="group hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium">
                  {new Date(expense.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`gap-1 ${getCategoryColor(expense.category)} border-0`}>
                    {getCategoryIcon(expense.category)}
                    {expense.category}
                  </Badge>
                </TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell className="text-right font-bold text-red-500">
                  -{formatCurrency(expense.amount, language)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">{t('Open menu')}</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{t('Actions')}</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onEdit(expense)}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        {t('Edit')}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(expense._id)}
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
  );
}
