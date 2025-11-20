'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Loader2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import { formatCurrency } from '@/lib/currency';

export function AiPrediction() {
    const { t, language } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [prediction, setPrediction] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPrediction();
    }, []);

    const fetchPrediction = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get('/ai/predict');
            setPrediction(response.data);
        } catch (error: any) {
            console.error('Prediction error:', error);
            setError(error.response?.data?.message || t('Failed to load prediction'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="glass-card border-0 shadow-lg h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    {t('Expense Prediction')}
                </CardTitle>
                <CardDescription>
                    {t('AI-powered prediction for next month\'s spending.')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <AlertCircle className="h-12 w-12 text-muted-foreground mb-3" />
                        <p className="text-sm text-muted-foreground">{error}</p>
                    </div>
                ) : prediction ? (
                    <div className="space-y-4">
                        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-200 dark:border-purple-800">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">{t('Predicted Total')}:</span>
                                <Badge variant={prediction.trend === 'increasing' ? 'destructive' : 'default'}>
                                    {t(prediction.trend)}
                                </Badge>
                            </div>
                            <div className="text-3xl font-bold text-foreground mb-1">
                                {formatCurrency(prediction.predictedAmount || 0, language)}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                {prediction.trend === 'increasing' ? (
                                    <TrendingUp className="h-4 w-4 text-red-500" />
                                ) : prediction.trend === 'decreasing' ? (
                                    <TrendingDown className="h-4 w-4 text-green-500" />
                                ) : null}
                                <span className="text-muted-foreground">
                                    {prediction.confidence}% {t('confidence')}
                                </span>
                            </div>
                        </div>
                        {prediction.explanation && (
                            <div className="p-4 rounded-lg bg-muted/50">
                                <p className="text-sm text-muted-foreground">
                                    💡 {prediction.explanation}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        {t('No prediction available')}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
