'use client';

import { useLanguage } from '@/app/context/language-context';
import { AiClassification } from '@/components/ai/ai-classification';
import { AiPrediction } from '@/components/ai/ai-prediction';
import { AiSuggestions } from '@/components/ai/ai-suggestions';
import { Bot } from 'lucide-react';

export default function AiPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient flex items-center gap-3">
            <Bot className="h-8 w-8 text-primary" />
            {t('AI Assistant')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('Leverage AI to analyze, predict, and optimize your finances.')}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Classification Section */}
        <div className="lg:col-span-2">
          <AiClassification />
        </div>

        {/* Suggestions Section */}
        <div className="lg:col-span-1">
          <AiSuggestions />
        </div>

        {/* Prediction Section */}
        <div className="lg:col-span-3">
          <AiPrediction />
        </div>
      </div>
    </div>
  );
}
