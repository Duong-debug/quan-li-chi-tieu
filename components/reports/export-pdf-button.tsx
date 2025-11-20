'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/app/context/language-context';
import { toast } from 'sonner';

interface ExportPDFButtonProps {
    summary: any;
    categoryBreakdown: any[];
    topExpenses: any[];
    period: string;
}

export function ExportPDFButton({ summary, categoryBreakdown, topExpenses, period }: ExportPDFButtonProps) {
    const { t } = useLanguage();

    const handleExportPDF = async () => {
        try {
            toast.info(t('Downloading PDF...'));

            // Dynamic import to reduce bundle size
            const jsPDF = (await import('jspdf')).default;
            const html2canvas = (await import('html2canvas')).default;

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Title
            pdf.setFontSize(20);
            pdf.text(t('Financial Reports'), pageWidth / 2, 20, { align: 'center' });

            pdf.setFontSize(12);
            pdf.text(`${t('Period')}: ${t(period === 'this-month' ? 'This Month' : period === 'last-month' ? 'Last Month' : 'This Year')}`, pageWidth / 2, 30, { align: 'center' });

            let yPosition = 45;

            // Summary Section
            pdf.setFontSize(14);
            pdf.text(t('Summary'), 15, yPosition);
            yPosition += 10;

            pdf.setFontSize(10);
            if (summary) {
                pdf.text(`${t('Total Income')}: ${summary.totalIncome.toLocaleString('vi-VN')}₫`, 15, yPosition);
                yPosition += 7;
                pdf.text(`${t('Total Expense')}: ${summary.totalExpense.toLocaleString('vi-VN')}₫`, 15, yPosition);
                yPosition += 7;
                pdf.text(`${t('Net Balance')}: ${summary.balance.toLocaleString('vi-VN')}₫`, 15, yPosition);
                yPosition += 7;
                pdf.text(`${t('Transaction Count')}: ${summary.transactionCount}`, 15, yPosition);
                yPosition += 15;
            }

            // Category Breakdown
            if (categoryBreakdown.length > 0) {
                pdf.setFontSize(14);
                pdf.text(t('Category Breakdown'), 15, yPosition);
                yPosition += 10;

                pdf.setFontSize(10);
                categoryBreakdown.slice(0, 10).forEach((item) => {
                    if (yPosition > pageHeight - 20) {
                        pdf.addPage();
                        yPosition = 20;
                    }
                    pdf.text(`${item.category}: ${item.amount.toLocaleString('vi-VN')}₫ (${item.percentage.toFixed(1)}%)`, 15, yPosition);
                    yPosition += 7;
                });
                yPosition += 10;
            }

            // Top Expenses
            if (topExpenses.length > 0) {
                if (yPosition > pageHeight - 60) {
                    pdf.addPage();
                    yPosition = 20;
                }

                pdf.setFontSize(14);
                pdf.text(t('Top Expenses'), 15, yPosition);
                yPosition += 10;

                pdf.setFontSize(10);
                topExpenses.forEach((item) => {
                    if (yPosition > pageHeight - 20) {
                        pdf.addPage();
                        yPosition = 20;
                    }
                    pdf.text(`${item.title}: ${item.amount.toLocaleString('vi-VN')}₫`, 15, yPosition);
                    yPosition += 7;
                });
            }

            // Save PDF (skip charts to avoid html2canvas issues)
            const fileName = `financial-report-${new Date().toISOString().split('T')[0]}.pdf`;
            pdf.save(fileName);

            toast.success(t('PDF downloaded successfully'));
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error('Failed to generate PDF');
        }
    };

    return (
        <Button onClick={handleExportPDF} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            {t('Export PDF')}
        </Button>
    );
}
