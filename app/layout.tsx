import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flium - 革新的なデジタルソリューション',
  description: 'Fliumは最先端のテクノロジーとクリエイティブなアプローチで、企業のデジタル変革を支援します。',
  keywords: 'デジタルマーケティング, Web開発, 3Dアニメーション, 企業サイト',
  authors: [{ name: 'Flium' }],
  openGraph: {
    title: 'Flium - 革新的なデジタルソリューション',
    description: 'Fliumは最先端のテクノロジーとクリエイティブなアプローチで、企業のデジタル変革を支援します。',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flium - 革新的なデジタルソリューション',
    description: 'Fliumは最先端のテクノロジーとクリエイティブなアプローチで、企業のデジタル変革を支援します。',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
