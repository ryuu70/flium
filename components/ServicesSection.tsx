'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Globe, 
  Smartphone, 
  Palette, 
  BarChart3, 
  Shield, 
  Zap,
  ArrowRight
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Globe,
    title: 'デジタルフロー設計',
    description: '情報、体験、感動が滑らかに流れるデジタル体験の設計と実装',
    features: ['ユーザージャーニー設計', 'インタラクション設計', 'データフロー最適化', '体験の連続性']
  },
  {
    icon: Smartphone,
    title: '流動的アプリケーション',
    description: 'ユーザーの動きに応じて滑らかに変化するモバイルアプリケーション',
    features: ['リアクティブUI', '適応的レイアウト', '直感的ナビゲーション', 'シームレス体験']
  },
  {
    icon: Palette,
    title: '本質的デザイン',
    description: '本質を見極め、不要なものを削ぎ落とした洗練されたデザイン',
    features: ['ミニマルデザイン', '機能美', '直感的操作', '感情的共鳴']
  },
  {
    icon: BarChart3,
    title: '流れの可視化',
    description: 'データの流れを美しく可視化し、洞察を生み出す分析ソリューション',
    features: ['リアルタイム可視化', 'インタラクティブ分析', '予測的洞察', 'ストーリーテリング']
  },
  {
    icon: Shield,
    title: '信頼の流れ',
    description: 'セキュリティを意識させない、自然で安全なデジタル体験の構築',
    features: ['透過的セキュリティ', 'プライバシー保護', '信頼性設計', '継続的監視']
  },
  {
    icon: Zap,
    title: '動的調和システム',
    description: '変化に適応し、常に最適な状態を保つ動的なシステム構築',
    features: ['自己適応システム', 'スケーラブル設計', '継続的改善', '未来対応']
  }
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // セクションタイトルアニメーション
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // カードアニメーション
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { 
              opacity: 0, 
              y: 100,
              scale: 0.8
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          )
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-gradient-to-b from-deep-slate-900 to-deep-slate-800 relative overflow-hidden">
      {/* 流れを表現する背景アニメーション */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const positions = [
            { left: 10, top: 10, delay: 0, duration: 4 },
            { left: 30, top: 20, delay: 1, duration: 5 },
            { left: 50, top: 30, delay: 2, duration: 6 },
            { left: 70, top: 40, delay: 0.5, duration: 4.5 },
            { left: 90, top: 50, delay: 1.5, duration: 5.5 },
            { left: 15, top: 60, delay: 0.8, duration: 4.2 },
            { left: 35, top: 70, delay: 1.2, duration: 5.8 },
            { left: 55, top: 80, delay: 0.3, duration: 4.8 },
            { left: 75, top: 90, delay: 1.8, duration: 5.2 },
            { left: 25, top: 15, delay: 0.6, duration: 4.6 },
            { left: 45, top: 25, delay: 1.4, duration: 5.4 },
            { left: 65, top: 35, delay: 0.9, duration: 4.9 },
            { left: 85, top: 45, delay: 1.6, duration: 5.6 },
            { left: 20, top: 55, delay: 0.4, duration: 4.4 },
            { left: 40, top: 65, delay: 1.1, duration: 5.1 }
          ]
          
          const pos = positions[i % positions.length]
          
          return (
            <div
              key={i}
              className="absolute w-px h-32 bg-gradient-to-b from-transparent via-quantum-teal-400/20 to-transparent"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animation: `flowVertical ${pos.duration}s linear infinite`,
                animationDelay: `${pos.delay}s`
              }}
            />
          )
        })}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションタイトル */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">ソリューション</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            複雑な課題に、滑らかな答えを。
            <br className="hidden sm:block" />
            美しい流れは、価値になる。
          </p>
        </div>

        {/* サービスカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.title}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el
                }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20"
              >
                {/* アイコン */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* タイトルと説明 */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* 機能リスト */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* ホバー時の矢印 */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-primary-400" />
                </div>

                {/* グラデーションボーダー */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            )
          })}
        </div>

        {/* CTAセクション */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-abyssal-blue-500/10 to-quantum-teal-500/10 backdrop-blur-sm border border-quantum-teal-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              そのビジネスに、最高の流れを
            </h3>
            <p className="text-gray-300 mb-6">
              デジタルに、生命の流れを。世界は、滑らかに動く。
            </p>
            <button className="flow-gradient text-stark-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-quantum-teal-500/25">
              流れを始める
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
