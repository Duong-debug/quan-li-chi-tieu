'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import { toast } from 'sonner';

export function AiClassification() {
    const { t } = useLanguage();
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ category: string; confidence: number } | null>(null);

    const handleAnalyze = async () => {
        if (!description.trim()) return;

        setLoading(true);
        try {
            const response = await api.post('/ai/categorize', {
                description: description.trim(),
                amount: 0
            });
            
            setResult({
                category: response.data.category,
                confidence: response.data.confidence
            });
            
            toast.success(t('Category suggested successfully!'));
        } catch (error: any) {
            console.error('AI categorization error:', error);
            toast.error(error.response?.data?.message || t('Failed to categorize'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="glass-card border-0 shadow-lg h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {t('Smart Classification')}
                </CardTitle>
                <CardDescription>
                    {t('Enter a transaction description and let AI categorize it for you.')}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="description">{t('Description')}</Label>
                    <div className="flex gap-2">
                        <Input
                            id="description"
                            placeholder="e.g. Lunch at McDonald's"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-background/50"
                        />
                        <Button
                            onClick={handleAnalyze}
                            disabled={loading || !description}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                {result && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-500 p-4 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <p className="font-medium text-foreground">
                                    {t('Suggested Category')}:
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge className="text-base px-3 py-1 bg-primary text-primary-foreground hover:bg-primary/90">
                                        {t(result.category)}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                        ({(result.confidence * 100).toFixed(0)}% confidence)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
