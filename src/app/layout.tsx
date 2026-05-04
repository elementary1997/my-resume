import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { AppProvider } from '@/context/AppContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Елипашев Павел — Middle DevOps Engineer',
  description: 'Portfolio and resume of Pavel Elipashev — Middle DevOps Engineer specializing in infrastructure automation, Ansible, Terraform, and Yandex Cloud.',
  keywords: ['DevOps', 'Ansible', 'Terraform', 'Yandex Cloud', 'Prometheus', 'Grafana', 'Astra Linux'],
  openGraph: {
    title: 'Елипашев Павел — Middle DevOps Engineer',
    description: 'Portfolio and resume of Pavel Elipashev',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AppProvider>
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
