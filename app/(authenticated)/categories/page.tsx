'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Utensils, Bus, Film, Zap, Heart, GraduationCap, ShoppingBag, MoreHorizontal, Loader2, FolderOpen } from 'lucide-react';
import { AddCategoryDialog } from '@/components/categories/add-category-dialog';
import { CategoryCard } from '@/components/categories/category-card';
import api from '@/lib/api';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/currency';

// Default categories with icons
const DEFAULT_CATEGORIES = [
    { id: 'food', name: 'Food', icon: Utensils, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/20', limit: 5000000, spent: 0 },
    { id: 'transportation', name: 'Transportation', icon: Bus, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/20', limit: 2000000, spent: 0 },
    { id: 'entertainment', name: 'Entertainment', icon: Film, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/20', limit: 1500000, spent: 0 },
    { id: 'utilities', name: 'Utilities', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/20', limit: 3000000, spent: 0 },
    { id: 'health', name: 'Health', icon: Heart, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/20', limit: 1000000, spent: 0 },
    { id: 'education', name: 'Education', icon: GraduationCap, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/20', limit: 2000000, spent: 0 },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/20', limit: 4000000, spent: 0 },
    { id: 'other', name: 'Other', icon: MoreHorizontal, color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-800', limit: 1000000, spent: 0 },
];

export default function CategoriesPage() {
    const { t, language } = useLanguage();
    const [customCategories, setCustomCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await api.get('/categories');
            setCustomCategories(response.data);
        } catch (error: any) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Translate default categories
    const translatedDefaultCategories = DEFAULT_CATEGORIES.map(cat => ({
        ...cat,
        name: t(cat.name)
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gradient">
                        {t('Categories')}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {t('Manage your expense categories and budgets')}
                    </p>
                </div>
                <AddCategoryDialog onCategoryAdded={fetchCategories} />
            </div>

            {/* Default Categories */}
            <div>
                <h2 className="text-lg font-semibold mb-4">{t('Default Categories')}</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {translatedDefaultCategories.map((category) => {
                        const percentage = Math.min((category.spent / category.limit) * 100, 100);
                        return (
                            <Card key={category.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {category.name}
                                    </CardTitle>
                                    <div className={`p-2 rounded-full ${category.bg}`}>
                                        <category.icon className={`h-4 w-4 ${category.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {formatCurrency(category.spent, language)}
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-3">
                                        / {formatCurrency(category.limit, language)}
                                    </p>
                                    <Progress value={percentage} className={`h-2 ${percentage > 90 ? 'bg-red-100' : ''}`} />
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Custom Categories */}
            <div>
                <h2 className="text-lg font-semibold mb-4">{t('Custom Categories')}</h2>
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : customCategories.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">{t('No custom categories yet')}</h3>
                            <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
                                {t('Create your first custom category to better organize your expenses.')}
                            </p>
                            <AddCategoryDialog onCategoryAdded={fetchCategories} />
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {customCategories.map((category) => (
                            <CategoryCard
                                key={category._id}
                                category={category}
                                onUpdate={fetchCategories}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
