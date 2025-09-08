'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Target, 
  Users, 
  Award, 
  TrendingUp,
  CheckCircle,
  Lightbulb,
  Heart
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Users, value: '100+', label: 'プロジェクト完了' },
  { icon: Award, value: '50+', label: '満足いただいたクライアント' },
  { icon: TrendingUp, value: '99%', label: 'プロジェクト成功率' },
  { icon: Target, value: '24/7', label: 'サポート体制' }
]

const values = [
  {
    icon: Lightbulb,
    title: '本質と洗練',
    description: '常に物事の「本質」を見極め、不要なものを削ぎ落とし、磨き上げます。最高の洗練とは、最もシンプルな形に宿ると知っているからです。'
  },
  {
    icon: Heart,
    title: '動的な調和',
    description: 'ユーザーの動き、データの流れ、時代の変化。そのすべてと相互作用し、生き物のように滑らかに動き続ける「動的な調和」を創り出します。'
  },
  {
    icon: CheckCircle,
    title: '大胆な探究',
    description: '未知の領域にこそ最高の流れがあると信じ、探究を恐れません。新しい技術や表現を常に実験し、誰も見たことのないデジタル体験を開拓します。'
  }
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // タイトルアニメーション
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

      // コンテンツアニメーション
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // 統計アニメーション
      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // 価値観アニメーション
      gsap.fromTo(valuesRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // カウンターアニメーション
      const counters = statsRef.current?.querySelectorAll('.counter')
      counters?.forEach((counter) => {
        const target = parseInt(counter.textContent?.replace(/[^\d]/g, '') || '0')
        gsap.fromTo(counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gradient-to-b from-deep-slate-800 to-deep-slate-900 relative overflow-hidden">
      {/* 流れを表現する背景アニメーション */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => {
          const positions = [
            { left: 5, top: 10, delay: 0, duration: 5 },
            { left: 25, top: 20, delay: 1, duration: 6 },
            { left: 45, top: 30, delay: 2, duration: 7 },
            { left: 65, top: 40, delay: 0.5, duration: 5.5 },
            { left: 85, top: 50, delay: 1.5, duration: 6.5 },
            { left: 10, top: 60, delay: 0.8, duration: 5.2 },
            { left: 30, top: 70, delay: 1.2, duration: 6.8 },
            { left: 50, top: 80, delay: 0.3, duration: 5.8 },
            { left: 70, top: 90, delay: 1.8, duration: 6.2 },
            { left: 15, top: 15, delay: 0.6, duration: 5.6 },
            { left: 35, top: 25, delay: 1.4, duration: 6.4 },
            { left: 55, top: 35, delay: 0.9, duration: 5.9 }
          ]
          
          const pos = positions[i % positions.length]
          
          return (
            <div
              key={i}
              className="absolute w-32 h-px bg-gradient-to-r from-transparent via-flux-violet-400/20 to-transparent"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animation: `flowHorizontal ${pos.duration}s linear infinite`,
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
            <span className="gradient-text">理念</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            デジタル体験の根源となる「流れ」を設計し、実装する
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* 左側: ミッション・ビジョン */}
          <div ref={contentRef}>
            <h3 className="text-3xl font-bold text-white mb-6">
              Mission & Vision
            </h3>
            <div className="space-y-8 text-gray-300 leading-relaxed">
              <div>
                <h4 className="text-xl font-semibold text-quantum-teal-400 mb-3">Mission</h4>
                <p>
                  デジタル体験の根源となる「流れ」を設計し、実装する。
                  私たちは、見た目の美しさだけでなく、その裏側にあるロジック、データ、ユーザー体験のすべてを滑らかに繋ぐ「流れ」をデザインします。
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-flux-violet-400 mb-3">Vision</h4>
                <p>
                  テクノロジーを、水や光のように、自然で美しい流れに。
                  複雑な技術は私たちの手の中で昇華され、人々はただその心地よさだけを享受できる。そんな未来を創造します。
                </p>
              </div>
            </div>
          </div>

          {/* 右側: 統計情報 */}
          <div ref={statsRef} className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div 
                  key={stat.label}
                  className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2 counter">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 価値観セクション */}
        <div ref={valuesRef}>
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Values - 私たちが約束する行動指針
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div 
                  key={value.title}
                  className="text-center group"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* コアコンセプト */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-abyssal-blue-500/10 to-quantum-teal-500/10 backdrop-blur-sm border border-quantum-teal-500/20 rounded-3xl p-12 max-w-5xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">
              コアコンセプト
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-6">
              「デジタルを構成する、新しい元素。」
            </p>
            <p className="text-lg text-quantum-teal-400 font-medium">
              The Element of Digital Flow.
            </p>
            <p className="text-base text-gray-400 mt-4 max-w-3xl mx-auto">
              私たちは、単なるウェブサイトやアプリを作る存在ではありません。
              情報、体験、そして感動が滑らかに流れるデジタル世界の根源を創り出す、
              いわば「新しい元素 = Flium」そのものです。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
