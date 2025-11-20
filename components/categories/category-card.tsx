'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/currency';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MoreHorizontal, Edit2, Trash2, Tag } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { AddCategoryDialog } from './add-category-dialog';

interface CategoryCardProps {
    category: any;
    onUpdate: () => void;
}

export function CategoryCard({ category, onUpdate }: CategoryCardProps) {
    const { t, language } = useLanguage();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await api.delete(`/categories/${category._id}`);
            toast.success(t('Category deleted successfully'));
            onUpdate();
            setShowDeleteDialog(false);
        } catch (error: any) {
            console.error('Error deleting category:', error);
            const errorMessage = error.response?.data?.message || t('Failed to delete category');
            toast.error(errorMessage, {
                description: error.response?.data?.transactionCount
                    ? t('Please remove or reassign transactions first')
                    : undefined,
                duration: 5000,
            });
        } finally {
            setDeleting(false);
        }
    };

    // Calculate spent amount and percentage
    const spent = category.spent || 0;
    const limit = category.budgetLimit || 5000000;
    const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;

    return (
        <>
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow relative group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                        />
                        {category.name}
                    </CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="sr-only">{t('Open menu')}</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t('Actions')}</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                                <Edit2 className="mr-2 h-4 w-4" />
                                {t('Edit')}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => setShowDeleteDialog(true)}
                                className="text-destructive focus:text-destructive"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                {t('Delete')}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {formatCurrency(spent, language)}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                        / {formatCurrency(limit, language)}
                    </p>
                    <div
                        className="h-2 w-full rounded-full mb-2"
                        style={{ backgroundColor: `${category.color}20` }}
                    >
                        <div
                            className="h-full rounded-full transition-all"
                            style={{
                                width: `${percentage}%`,
                                backgroundColor: category.color
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Tag className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                            {t('Custom category')}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('Are you sure?')}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t('Are you sure you want to delete this category?')} {t('This action cannot be undone.')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('Cancel')}</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleting ? t('Deleting...') : t('Delete')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Edit Dialog */}
            {showEditDialog && (
                <AddCategoryDialog
                    editingCategory={category}
                    onCategoryAdded={onUpdate}
                    onClose={() => setShowEditDialog(false)}
                />
            )}
        </>
    );
}
