'use client'

import { useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowUp
} from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'Web開発', href: '#services' },
    { name: 'モバイルアプリ', href: '#services' },
    { name: 'UI/UXデザイン', href: '#services' },
    { name: 'データ分析', href: '#services' },
    { name: 'セキュリティ', href: '#services' },
    { name: 'クラウド移行', href: '#services' }
  ],
  company: [
    { name: '会社概要', href: '#about' },
    { name: '実績', href: '#portfolio' },
    { name: '採用情報', href: '#careers' },
    { name: 'ニュース', href: '#news' },
    { name: 'プライバシーポリシー', href: '#privacy' },
    { name: '利用規約', href: '#terms' }
  ],
  support: [
    { name: 'ヘルプセンター', href: '#help' },
    { name: 'お問い合わせ', href: '#contact' },
    { name: 'サポート', href: '#support' },
    { name: 'FAQ', href: '#faq' },
    { name: 'ドキュメント', href: '#docs' },
    { name: 'ステータス', href: '#status' }
  ]
}

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' }
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ニュースレター登録の処理
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <footer className="bg-black text-white">
      {/* メインフッター */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 会社情報 */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-3xl font-bold gradient-text mb-4">
                Flium
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                革新的なデジタルソリューションで、お客様のビジネスを次のレベルへ導きます。
              </p>
            </div>

            {/* 連絡先情報 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@flium.co.jp</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">03-1234-5678</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">東京都渋谷区恵比寿</span>
              </div>
            </div>
          </div>

          {/* サービス */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              サービス
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 会社 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              会社
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* サポート */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              サポート
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ニュースレター */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-2xl">
            <h4 className="text-xl font-semibold text-white mb-4">
              ニュースレターに登録
            </h4>
            <p className="text-gray-400 mb-6">
              最新の技術トレンドやプロジェクト情報をお届けします
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="メールアドレスを入力"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                登録する
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ボトムフッター */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* コピーライト */}
            <div className="text-gray-400 text-sm">
              © 2024 Flium. All rights reserved.
            </div>

            {/* ソーシャルリンク */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>

            {/* トップに戻るボタン */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors duration-200"
            >
              <span className="text-sm">トップに戻る</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
