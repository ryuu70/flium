'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, Sparkles, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // タイトルアニメーション
      gsap.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 100,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out"
        }
      )

      // サブタイトルアニメーション
      gsap.fromTo(subtitleRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out"
        }
      )

      // CTAボタンアニメーション
      gsap.fromTo(ctaRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          ease: "power2.out"
        }
      )

      // フローティングアイコンアニメーション
      gsap.to(".floating-icon", {
        y: -20,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ position: 'relative', zIndex: 1 }}
    >
      {/* 背景グラデーション - Fliumブランドカラー */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-slate-950 via-abyssal-blue-950 to-deep-slate-900" />
      
      {/* コンテンツ */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* フローティングアイコン */}
        <div className="absolute -top-10 -left-10 floating-icon">
          <Sparkles className="w-8 h-8 text-primary-400 opacity-60" />
        </div>
        <div className="absolute -top-5 -right-5 floating-icon">
          <Zap className="w-6 h-6 text-accent-400 opacity-60" />
        </div>
        <div className="absolute -bottom-10 -left-5 floating-icon">
          <Sparkles className="w-7 h-7 text-primary-300 opacity-40" />
        </div>
        <div className="absolute -bottom-5 -right-10 floating-icon">
          <Zap className="w-5 h-5 text-accent-300 opacity-50" />
        </div>

        {/* メインタイトル */}
        <h1 
          ref={titleRef}
          className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6"
        >
          <span className="block gradient-text">Flium</span>
          <span className="block text-stark-white text-2xl sm:text-3xl lg:text-4xl font-light mt-4">
            流れを、発明する。
          </span>
        </h1>

        {/* サブタイトル */}
        <p 
          ref={subtitleRef}
          className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
        >
          デジタルを構成する、新しい元素。
          <br className="hidden sm:block" />
          中心に宿る流体のコアが、情報、体験、そして感動を
          <br className="hidden sm:block" />
          滑らかに流れるデジタル世界の根源を創り出します
        </p>

        {/* コアコンセプト */}
        <div 
          ref={subtitleRef}
          className="text-base sm:text-lg text-quantum-teal-400 mb-12 max-w-3xl mx-auto font-medium"
        >
          The Element of Digital Flow.
        </div>

        {/* インタラクション説明 */}
        <div 
          ref={subtitleRef}
          className="text-sm text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          マウスを動かして、流体のコアとの対話をお楽しみください
        </div>

        {/* CTAボタン */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="flow-gradient text-stark-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-quantum-teal-500/25">
            そのビジネスに、最高の流れを
          </button>
          <button className="border-2 border-quantum-teal-400/50 text-quantum-teal-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-quantum-teal-400/10 transition-all duration-300 backdrop-blur-sm">
            流れを体験する
          </button>
        </div>

        {/* スクロールインジケーター */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/60" />
        </div>
      </div>

      {/* 流れを表現するパーティクルエフェクト */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => {
          // 固定の値を使用してSSRの不一致を回避
          const positions = [
            { left: 10, top: 20, delay: 0, duration: 3, color: 0, shadow: 8 },
            { left: 30, top: 40, delay: 0.5, duration: 4, color: 1, shadow: 6 },
            { left: 50, top: 60, delay: 1, duration: 5, color: 2, shadow: 10 },
            { left: 70, top: 30, delay: 1.5, duration: 3.5, color: 0, shadow: 7 },
            { left: 90, top: 80, delay: 2, duration: 4.5, color: 1, shadow: 9 },
            { left: 15, top: 70, delay: 0.3, duration: 3.8, color: 2, shadow: 5 },
            { left: 85, top: 15, delay: 1.2, duration: 4.2, color: 0, shadow: 8 },
            { left: 45, top: 85, delay: 0.8, duration: 3.2, color: 1, shadow: 6 },
            { left: 25, top: 50, delay: 1.8, duration: 4.8, color: 2, shadow: 7 },
            { left: 65, top: 45, delay: 0.2, duration: 3.6, color: 0, shadow: 9 }
          ]
          
          const pos = positions[i % positions.length]
          const colors = ['#6366f1', '#14b8a6', '#a855f7']
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-pulse"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${pos.delay}s`,
                animationDuration: `${pos.duration}s`,
                background: `linear-gradient(45deg, ${colors[pos.color]}, transparent)`,
                boxShadow: `0 0 ${pos.shadow}px ${colors[pos.color]}`
              }}
            />
          )
        })}
      </div>

      {/* 流れの線を表現するアニメーション */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => {
          const lines = [
            { left: 0, top: 20, width: 150, rotation: 15, delay: 0, duration: 4 },
            { left: 20, top: 40, width: 200, rotation: 45, delay: 1, duration: 5 },
            { left: 40, top: 60, width: 180, rotation: 75, delay: 2, duration: 3.5 },
            { left: 60, top: 30, width: 220, rotation: 105, delay: 0.5, duration: 4.5 },
            { left: 80, top: 80, width: 160, rotation: 135, delay: 1.5, duration: 3.8 },
            { left: 10, top: 70, width: 190, rotation: 165, delay: 0.8, duration: 4.2 },
            { left: 70, top: 10, width: 170, rotation: 195, delay: 1.2, duration: 3.6 },
            { left: 30, top: 90, width: 210, rotation: 225, delay: 0.3, duration: 4.8 },
            { left: 50, top: 50, width: 140, rotation: 255, delay: 1.8, duration: 3.2 },
            { left: 90, top: 40, width: 180, rotation: 285, delay: 0.6, duration: 4.6 }
          ]
          
          const line = lines[i % lines.length]
          
          return (
            <div
              key={`flow-line-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-quantum-teal-400 to-transparent opacity-30"
              style={{
                left: `${line.left}%`,
                top: `${line.top}%`,
                width: `${line.width}px`,
                transform: `rotate(${line.rotation}deg)`,
                animation: `flowLine ${line.duration}s linear infinite`,
                animationDelay: `${line.delay}s`
              }}
            />
          )
        })}
      </div>
    </section>
  )
}
