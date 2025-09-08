'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Mail
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    icon: Mail,
    title: 'メールアドレス',
    value: 'work.ryuto.hatsuno@gmail.com',
    description: '24時間以内にご返信いたします'
  }
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

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

       // 連絡先情報アニメーション
       gsap.fromTo(infoRef.current,
         { opacity: 0, y: 50 },
         {
           opacity: 1,
           y: 0,
           duration: 1,
           delay: 0.2,
           ease: "power2.out",
           scrollTrigger: {
             trigger: infoRef.current,
             start: "top 80%",
             end: "bottom 20%",
             toggleActions: "play none none reverse"
           }
         }
       )

    }, sectionRef)

    return () => ctx.revert()
  }, [])


  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-to-b from-deep-slate-900 to-black relative overflow-hidden">
      {/* 流れを表現する背景アニメーション */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const positions = [
            { left: 10, top: 10, delay: 0, duration: 6, color: 0 },
            { left: 30, top: 20, delay: 1, duration: 7, color: 1 },
            { left: 50, top: 30, delay: 2, duration: 8, color: 2 },
            { left: 70, top: 40, delay: 0.5, duration: 6.5, color: 0 },
            { left: 90, top: 50, delay: 1.5, duration: 7.5, color: 1 },
            { left: 15, top: 60, delay: 0.8, duration: 6.2, color: 2 },
            { left: 35, top: 70, delay: 1.2, duration: 7.8, color: 0 },
            { left: 55, top: 80, delay: 0.3, duration: 6.8, color: 1 },
            { left: 75, top: 90, delay: 1.8, duration: 7.2, color: 2 },
            { left: 25, top: 15, delay: 0.6, duration: 6.6, color: 0 },
            { left: 45, top: 25, delay: 1.4, duration: 7.4, color: 1 },
            { left: 65, top: 35, delay: 0.9, duration: 6.9, color: 2 },
            { left: 85, top: 45, delay: 1.6, duration: 7.6, color: 0 },
            { left: 20, top: 55, delay: 0.4, duration: 6.4, color: 1 },
            { left: 40, top: 65, delay: 1.1, duration: 7.1, color: 2 },
            { left: 60, top: 75, delay: 0.7, duration: 6.7, color: 0 },
            { left: 80, top: 85, delay: 1.3, duration: 7.3, color: 1 },
            { left: 5, top: 5, delay: 0.2, duration: 6.2, color: 2 },
            { left: 95, top: 95, delay: 1.7, duration: 7.7, color: 0 },
            { left: 12, top: 85, delay: 0.1, duration: 6.1, color: 1 }
          ]
          
          const pos = positions[i % positions.length]
          const colors = ['#6366f1', '#14b8a6', '#a855f7']
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                background: `radial-gradient(circle, ${colors[pos.color]} 0%, transparent 70%)`,
                animation: `flowParticle ${pos.duration}s linear infinite`,
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
            <span className="gradient-text">お問い合わせ</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            プロジェクトのご相談やご質問がございましたら、お気軽にお問い合わせください
          </p>
        </div>

         <div className="max-w-4xl mx-auto">
           {/* 連絡先情報 */}
           <div ref={infoRef}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  連絡先情報
                </h3>
                <p className="text-gray-300 leading-relaxed mb-8">
                  メールでのお問い合わせは24時間以内にご返信いたします。
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon
                  return (
                    <div 
                      key={info.title}
                      className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {info.title}
                        </h4>
                        <p className="text-primary-400 font-medium mb-1">
                          {info.value}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 営業時間 */}
              <div className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">
                  営業時間
                </h4>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>平日</span>
                    <span>9:00 - 18:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
