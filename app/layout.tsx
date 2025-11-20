import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/app/context/language-context'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'

const quicksand = Quicksand({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand',
});

export const metadata: Metadata = {
  title: 'Ứng dụng Quản lý Chi tiêu',
  description: 'Quản lý chi tiêu cá nhân với tính năng AI',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${quicksand.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
          <Toaster />
          <Sonner />
        </ThemeProvider>
      </body>
    </html>
  )
}
