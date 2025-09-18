'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from 'react'

// 3Dシーンを動的インポート（SSRを無効化）
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(135deg, #0f172a, #1e1b4b, #0f172a)',
      zIndex: -1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          border: '2px solid rgba(255,255,255,0.3)', 
          borderTop: '2px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }}></div>
        <p>3Dシーンを読み込み中...</p>
      </div>
    </div>
  )
})

export default function Home() {
  const [showMainContent, setShowMainContent] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  // スクロールアニメーション用のIntersection Observer
  useEffect(() => {
    if (!showMainContent) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [showMainContent])

  // スクロール位置の追跡
  useEffect(() => {
    if (!showMainContent) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showMainContent])

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!showMainContent && !isTransitioning) {
        setIsTransitioning(true)
        setTimeout(() => {
          setShowMainContent(true)
          setIsTransitioning(false)
        }, 1000)
      }
    }

    const handleScroll = (e: Event) => {
      e.preventDefault()
      if (!showMainContent) {
        handleUserInteraction()
      }
    }

    const handleTouchStart = () => {
      if (!showMainContent) {
        handleUserInteraction()
      }
    }

    const handleClick = () => {
      if (!showMainContent) {
        handleUserInteraction()
      }
    }

    if (!showMainContent) {
      window.addEventListener('scroll', handleScroll, { passive: false })
      window.addEventListener('touchstart', handleTouchStart)
      window.addEventListener('click', handleClick)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('click', handleClick)
    }
  }, [showMainContent, isTransitioning])

  if (showMainContent) {
    return (
      <>
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 0.7;
            }
            50% {
              opacity: 1;
            }
          }
          
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <div style={{ background: '#ffffff', minHeight: '100vh' }}>
        {/* ヘッダー */}
        <header style={{
          background: scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          padding: '1rem 2rem',
          borderBottom: '1px solid rgba(229, 231, 235, 0.3)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: scrollY > 50 ? '0 4px 20px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease'
        }}>
          <nav style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              fontSize: '1.8rem', 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}>
              Flium
            </div>
            <div style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              {['Fliumとは', 'サービス', '導入事例', '運営者情報', 'ブログ', 'お問い合わせ'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item === 'Fliumとは' ? 'flium-about' : 
                          item === 'サービス' ? 'services' :
                          item === '導入事例' ? 'case-studies' :
                          item === '運営者情報' ? 'company-info' :
                          item === 'ブログ' ? 'blog' : 'contact'}`}
                  style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '0.9rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#3b82f6'
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280'
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>
        </header>

        {/* メインコンテンツ */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
          {/* ヒーローセクション（コーポレートサイト） */}
          <section 
            id="home" 
            ref={(el) => { sectionRefs.current['home'] = el }}
            style={{
              padding: '8rem 0',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              borderRadius: '24px',
              margin: '2rem 0',
              position: 'relative',
              overflow: 'hidden',
              opacity: isVisible['home'] ? 1 : 0,
              transform: isVisible['home'] ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 0.8s ease'
            }}
          >
            {/* 背景装飾 */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
              animation: 'float 6s ease-in-out infinite'
            }} />
            <div style={{
              position: 'absolute',
              top: '20%',
              right: '-10%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
              animation: 'float 8s ease-in-out infinite reverse'
            }} />
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h1 style={{
                fontSize: '4.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #1e293b, #3b82f6, #1d4ed8)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '2rem',
                lineHeight: '1.1',
                textShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                animation: isVisible['home'] ? 'fadeInUp 1s ease 0.2s both' : 'none'
              }}>
                Flium
              </h1>
              <p style={{
                fontSize: '1.5rem',
                color: '#64748b',
                marginBottom: '1rem',
                maxWidth: '700px',
                margin: '0 auto 1rem auto',
                fontWeight: '300',
                animation: isVisible['home'] ? 'fadeInUp 1s ease 0.4s both' : 'none'
              }}>
                デジタルを構成する、新しい元素。
              </p>
              <p style={{
                fontSize: '1.2rem',
                color: '#94a3b8',
                marginBottom: '3rem',
                maxWidth: '600px',
                margin: '0 auto 3rem auto',
                animation: isVisible['home'] ? 'fadeInUp 1s ease 0.6s both' : 'none'
              }}>
                流れを設計し、実装する。
              </p>
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                animation: isVisible['home'] ? 'fadeInUp 1s ease 0.8s both' : 'none'
              }}>
                <button 
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    color: '#ffffff',
                    padding: '1.2rem 2.5rem',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  お問い合わせ
                </button>
                <button 
                  style={{
                    background: 'transparent',
                    color: '#3b82f6',
                    padding: '1.2rem 2.5rem',
                    border: '2px solid #3b82f6',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#3b82f6'
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#3b82f6'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  サービスを見る
                </button>
              </div>
            </div>
          </section>

          {/* Fliumとは セクション */}
          <section 
            id="flium-about" 
            ref={(el) => { sectionRefs.current['flium-about'] = el }}
            style={{
              padding: '8rem 0',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '24px',
              margin: '2rem 0',
              opacity: isVisible['flium-about'] ? 1 : 0,
              transform: isVisible['flium-about'] ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 0.8s ease'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ 
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #1e293b, #3b82f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.5rem',
                animation: isVisible['flium-about'] ? 'fadeInUp 1s ease 0.2s both' : 'none'
              }}>
                Fliumとは
              </h2>
              <div style={{
                width: '80px',
                height: '4px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                margin: '0 auto',
                borderRadius: '2px',
                animation: isVisible['flium-about'] ? 'fadeInUp 1s ease 0.4s both' : 'none'
              }}></div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '3rem',
              marginBottom: '4rem'
            }}>
              <div style={{
                padding: '3rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: isVisible['flium-about'] ? 'fadeInUp 1s ease 0.6s both' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                }} />
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  🏢
                </div>
                <h3 style={{
                  fontSize: '1.8rem', 
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1.5rem'
                }}>
                  会社概要
                </h3>
                <p style={{ 
                  color: '#64748b',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  fontSize: '1.1rem'
                }}>
                  Fliumは、WEBデザインやWEB開発を行うクリエイティブスタジオです。
                </p>
                <ul style={{ 
                  color: '#64748b',
                  lineHeight: '1.7',
                  paddingLeft: '1.5rem',
                  fontSize: '1rem'
                }}>
                  <li>設立：2025年</li>
                  <li>所在地：東京</li>
                  <li>事業内容：Webデザイン、システム開発、広告運用</li>
                </ul>
              </div>
              
              <div style={{
                padding: '3rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: isVisible['flium-about'] ? 'fadeInUp 1s ease 0.8s both' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(135deg, #10b981, #059669)'
                }} />
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  ⭐
                </div>
                <h3 style={{
                  fontSize: '1.8rem', 
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1.5rem'
                }}>
                  私たちの特徴
                </h3>
                <ul style={{ 
                  color: '#64748b',
                  lineHeight: '1.7',
                  paddingLeft: '1.5rem',
                  fontSize: '1rem'
                }}>
                  <li>ユーザー中心のデザイン思考</li>
                  <li>最新技術の積極的活用</li>
                  <li>スケーラブルなソリューション</li>
                  <li>継続的なサポート体制</li>
                </ul>
              </div>
              
              <div style={{
                padding: '3rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: isVisible['flium-about'] ? 'fadeInUp 1s ease 1s both' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)'
                }} />
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  💡
                </div>
                <h3 style={{
                  fontSize: '1.8rem', 
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1.5rem'
                }}>
                  なぜFliumなのか
                </h3>
                <p style={{ 
                  color: '#64748b',
                  lineHeight: '1.7',
                  fontSize: '1.1rem'
                }}>
                  「Flium」は「Flow（流れ）」と「Element（元素）」を組み合わせた造語です。私たちは、デジタル体験を構成する基本要素として、美しく機能的な「流れ」を創造します。
                </p>
              </div>
            </div>
          </section>

          {/* About セクション */}
          <section id="about" style={{
            padding: '6rem 0',
            background: '#f9fafb',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ 
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                About Us
              </h2>
              <div style={{
                width: '60px',
                height: '3px',
                background: '#3b82f6',
                margin: '0 auto'
              }}></div>
            </div>
              <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem'
            }}>
              <div style={{
                  padding: '2rem',
                background: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                    fontSize: '1.5rem', 
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Mission
                </h3>
                  <p style={{ 
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  流れを設計し、実装する。私たちは、見た目の美しさだけでなく、その裏側にあるロジック、データ、ユーザー体験のすべてを滑らかに繋ぐ「流れ」をデザインします。
                  </p>
                </div>
              <div style={{
                  padding: '2rem',
                background: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
              <h3 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Vision
              </h3>
              <p style={{ 
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  テクノロジーを、水や光のように。私たちが目指すのは、テクノロジーの存在を意識させないほどに自然で、直感的で、美しいデジタル体験が当たり前になる世界です。
                </p>
              </div>
            </div>
          </section>

          {/* Fliumのサービス セクション */}
          <section 
            id="services" 
            ref={(el) => { sectionRefs.current['services'] = el }}
            style={{
              padding: '8rem 0',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              borderRadius: '24px',
              margin: '2rem 0',
              opacity: isVisible['services'] ? 1 : 0,
              transform: isVisible['services'] ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 0.8s ease'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ 
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #1e293b, #3b82f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.5rem',
                animation: isVisible['services'] ? 'fadeInUp 1s ease 0.2s both' : 'none'
              }}>
                Fliumのサービス
              </h2>
              <div style={{ 
                width: '80px',
                height: '4px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                margin: '0 auto',
                borderRadius: '2px',
                animation: isVisible['services'] ? 'fadeInUp 1s ease 0.4s both' : 'none'
              }}></div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '3rem',
              marginBottom: '4rem'
            }}>
              <div style={{
                padding: '3rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: isVisible['services'] ? 'fadeInUp 1s ease 0.6s both' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                }} />
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  💻
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1.5rem'
                }}>
                  Webデザイン・開発
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  fontSize: '1.1rem'
                }}>
                  ユーザー中心のデザイン思考に基づき、美しく使いやすいWebサイトを創造します。
                </p>
                <ul style={{
                  color: '#64748b',
                  lineHeight: '1.7',
                  paddingLeft: '1.5rem',
                  fontSize: '1rem'
                }}>
                  <li>レスポンシブデザイン</li>
                  <li>UI/UXデザイン</li>
                  <li>Next.js/React開発</li>
                  <li>パフォーマンス最適化</li>
                </ul>
              </div>
              
              <div style={{
                padding: '3rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: isVisible['services'] ? 'fadeInUp 1s ease 0.8s both' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(135deg, #10b981, #059669)'
                }} />
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  ⚙️
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1.5rem'
                }}>
                  システム開発・API
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  fontSize: '1.1rem'
                }}>
                  最新技術を活用し、スケーラブルで保守性の高いシステムを構築します。
                </p>
                <ul style={{
                  color: '#64748b',
                  lineHeight: '1.7',
                  paddingLeft: '1.5rem',
                  fontSize: '1rem'
                }}>
                  <li>RESTful API設計</li>
                  <li>データベース設計</li>
                  <li>クラウドインフラ構築</li>
                  <li>セキュリティ対策</li>
                </ul>
              </div>
              
              <div style={{
                padding: '3rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: isVisible['services'] ? 'fadeInUp 1s ease 1s both' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)'
                }} />
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  📊
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1.5rem'
                }}>
                  デジタル戦略・コンサル
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  fontSize: '1.1rem'
                }}>
                  ビジネス目標に合わせたデジタル戦略の立案と実行をサポートします。
                </p>
                <ul style={{
                  color: '#64748b',
                  lineHeight: '1.7',
                  paddingLeft: '1.5rem',
                  fontSize: '1rem'
                }}>
                  <li>デジタル変革支援</li>
                  <li>プロセス改善提案</li>
                  <li>技術選定アドバイス</li>
                  <li>運用・保守サポート</li>
                </ul>
              </div>
              
              <div style={{
                padding: '3rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: isVisible['services'] ? 'fadeInUp 1s ease 1.2s both' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                }} />
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  🎮
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1.5rem'
                }}>
                  3D・インタラクティブ
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  fontSize: '1.1rem'
                }}>
                  最新のWeb技術を活用した、没入感のある3D体験を提供します。
                </p>
                <ul style={{
                  color: '#64748b',
                  lineHeight: '1.7',
                  paddingLeft: '1.5rem',
                  fontSize: '1rem'
                }}>
                  <li>Three.js開発</li>
                  <li>インタラクティブ3D</li>
                  <li>WebGLアプリケーション</li>
                  <li>VR/AR体験</li>
                </ul>
              </div>
            </div>
            
            {/* サービスプロセス */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              padding: '4rem',
              borderRadius: '20px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              animation: isVisible['services'] ? 'fadeInUp 1s ease 1.4s both' : 'none'
            }}>
              <h3 style={{
                fontSize: '2.2rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #1e293b, #3b82f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '3rem',
                textAlign: 'center'
              }}>
                サービス提供プロセス
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '3rem'
              }}>
                <div style={{ 
                  textAlign: 'center',
                  padding: '2rem',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '16px',
                  border: '1px solid rgba(229, 231, 235, 0.5)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                  }}>
                    1
                  </div>
                  <h4 style={{ 
                    color: '#1f2937', 
                    marginBottom: '1rem',
                    fontSize: '1.3rem',
                    fontWeight: 'bold'
                  }}>ヒアリング</h4>
                  <p style={{ 
                    color: '#64748b', 
                    fontSize: '1rem',
                    lineHeight: '1.6'
                  }}>お客様のニーズを詳しくお聞きします</p>
                </div>
                <div style={{ 
                  textAlign: 'center',
                  padding: '2rem',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '16px',
                  border: '1px solid rgba(229, 231, 235, 0.5)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
                  }}>
                    2
                  </div>
                  <h4 style={{ 
                    color: '#1f2937', 
                    marginBottom: '1rem',
                    fontSize: '1.3rem',
                    fontWeight: 'bold'
                  }}>提案</h4>
                  <p style={{ 
                    color: '#64748b', 
                    fontSize: '1rem',
                    lineHeight: '1.6'
                  }}>最適なソリューションをご提案します</p>
                </div>
                <div style={{ 
                  textAlign: 'center',
                  padding: '2rem',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '16px',
                  border: '1px solid rgba(229, 231, 235, 0.5)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
                  }}>
                    3
                  </div>
                  <h4 style={{ 
                    color: '#1f2937', 
                    marginBottom: '1rem',
                    fontSize: '1.3rem',
                    fontWeight: 'bold'
                  }}>開発</h4>
                  <p style={{ 
                    color: '#64748b', 
                    fontSize: '1rem',
                    lineHeight: '1.6'
                  }}>高品質な成果物を開発します</p>
                </div>
                <div style={{ 
                  textAlign: 'center',
                  padding: '2rem',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '16px',
                  border: '1px solid rgba(229, 231, 235, 0.5)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
                  }}>
                    4
                  </div>
                  <h4 style={{ 
                    color: '#1f2937', 
                    marginBottom: '1rem',
                    fontSize: '1.3rem',
                    fontWeight: 'bold'
                  }}>運用</h4>
                  <p style={{ 
                    color: '#64748b', 
                    fontSize: '1rem',
                    lineHeight: '1.6'
                  }}>継続的なサポートを提供します</p>
                </div>
              </div>
            </div>
          </section>

          {/* 導入事例 セクション */}
          <section 
            id="case-studies" 
            ref={(el) => { sectionRefs.current['case-studies'] = el }}
            style={{
              padding: '8rem 0',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '24px',
              margin: '2rem 0',
              opacity: isVisible['case-studies'] ? 1 : 0,
              transform: isVisible['case-studies'] ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 0.8s ease'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ 
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #1e293b, #3b82f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.5rem',
                animation: isVisible['case-studies'] ? 'fadeInUp 1s ease 0.2s both' : 'none'
              }}>
                導入事例
              </h2>
              <div style={{
                width: '80px',
                height: '4px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                margin: '0 auto',
                borderRadius: '2px',
                animation: isVisible['case-studies'] ? 'fadeInUp 1s ease 0.4s both' : 'none'
              }}></div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '3rem',
              marginBottom: '4rem'
            }}>
              <div style={{
                padding: '3rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: isVisible['case-studies'] ? 'fadeInUp 1s ease 0.6s both' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                }} />
                <div style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'inline-block',
                  marginBottom: '2rem',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                }}>
                  WEBサイト
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1.5rem',
                  lineHeight: '1.3'
                }}>
                  地方病院のWEBサイト
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.7',
                  marginBottom: '2rem',
                  fontSize: '1.1rem'
                }}>
                  地方病院のWEBサイトを、白を基調とした誠実、清潔なイメージで構築。
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    color: '#64748b',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: '1px solid rgba(229, 231, 235, 0.5)'
                  }}>
                    WordPress
                  </span>
                  <span style={{
                    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    color: '#64748b',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: '1px solid rgba(229, 231, 235, 0.5)'
                  }}>
                    HTML
                  </span>
                  <span style={{
                    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    color: '#64748b',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: '1px solid rgba(229, 231, 235, 0.5)'
                  }}>
                    CSS
                  </span>
                  <span style={{
                    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    color: '#64748b',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: '1px solid rgba(229, 231, 235, 0.5)'
                  }}>
                    PHP
                  </span>
                </div>
              </div>

              <div style={{
                padding: '3rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: isVisible['case-studies'] ? 'fadeInUp 1s ease 0.8s both' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(135deg, #10b981, #059669)'
                }} />
                <div style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'inline-block',
                  marginBottom: '2rem',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                }}>
                  WEBサービス開発
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1.5rem',
                  lineHeight: '1.3'
                }}>
                  大規模なWEBサービスの開発
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.7',
                  marginBottom: '2rem',
                  fontSize: '1.1rem'
                }}>
                  20ページに及び様々な最新技術を組み合わせた大規模なWEBサービスを開発。
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    color: '#64748b',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: '1px solid rgba(229, 231, 235, 0.5)'
                  }}>
                    Next.js
                  </span>
                  <span style={{
                    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    color: '#64748b',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: '1px solid rgba(229, 231, 235, 0.5)'
                  }}>
                    Python
                  </span>
                  <span style={{
                    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    color: '#64748b',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: '1px solid rgba(229, 231, 235, 0.5)'
                  }}>
                    Neon
                  </span>
                </div>
              </div>

              <div style={{
                padding: '3rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: isVisible['case-studies'] ? 'fadeInUp 1s ease 1s both' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)'
                }} />
                <div style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'inline-block',
                  marginBottom: '2rem',
                  boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
                }}>
                  企業サイト
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1.5rem',
                  lineHeight: '1.3'
                }}>
                  企業サイトの開発
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.7',
                  marginBottom: '2rem',
                  fontSize: '1.1rem'
                }}>
                  伝統的な製造業のデジタル変革を支援。３Dビジュアライゼーションを活用した製品紹介サイトを構築
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    color: '#64748b',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: '1px solid rgba(229, 231, 235, 0.5)'
                  }}>
                    Three.js
                  </span>
                  <span style={{
                    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    color: '#64748b',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: '1px solid rgba(229, 231, 235, 0.5)'
                  }}>
                    React
                  </span>
                  <span style={{
                    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    color: '#64748b',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: '1px solid rgba(229, 231, 235, 0.5)'
                  }}>
                    CMS
                  </span>
                </div>
              </div>

              <div style={{
                padding: '3rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: isVisible['case-studies'] ? 'fadeInUp 1s ease 1.2s both' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                }} />
                <div style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'inline-block',
                  marginBottom: '2rem',
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
                }}>
                  業務効率化
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1.5rem',
                  lineHeight: '1.3'
                }}>
                  企業向け業務効率化システムの開発
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.7',
                  marginBottom: '2rem',
                  fontSize: '1.1rem'
                }}>
                  Pythonを利用したスクレイピングシステムの開発や、GASを使用した業務効率化支援を提供。
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    color: '#64748b',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: '1px solid rgba(229, 231, 235, 0.5)'
                  }}>
                    Python
                  </span>
                  <span style={{
                    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    color: '#64748b',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: '1px solid rgba(229, 231, 235, 0.5)'
                  }}>
                    GAS
                  </span>
                </div>
              </div>
            </div>

            {/* 実績サマリー */}
            <div style={{
              background: '#ffffff',
              padding: '3rem',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '2rem'
              }}>
                実績サマリー
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem'
              }}>
                <div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: '#3b82f6',
                    marginBottom: '0.5rem'
                  }}>
                    50+
                  </div>
                  <p style={{ color: '#6b7280' }}>プロジェクト完了</p>
                </div>
                <div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: '#3b82f6',
                    marginBottom: '0.5rem'
                  }}>
                    30+
                  </div>
                  <p style={{ color: '#6b7280' }}>満足いただいたクライアント</p>
                </div>
                <div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: '#3b82f6',
                    marginBottom: '0.5rem'
                  }}>
                    100%
                  </div>
                  <p style={{ color: '#6b7280' }}>納期遵守率</p>
                </div>
                <div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: '#3b82f6',
                    marginBottom: '0.5rem'
                  }}>
                    24/7
                  </div>
                  <p style={{ color: '#6b7280' }}>サポート体制</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact セクション */}
          <section 
            id="contact" 
            ref={(el) => { sectionRefs.current['contact'] = el }}
            style={{
              padding: '8rem 0',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              borderRadius: '24px',
              margin: '2rem 0',
              opacity: isVisible['contact'] ? 1 : 0,
              transform: isVisible['contact'] ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 0.8s ease'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ 
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #1e293b, #3b82f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.5rem',
                animation: isVisible['contact'] ? 'fadeInUp 1s ease 0.2s both' : 'none'
              }}>
                Contact
              </h2>
              <div style={{
                width: '80px',
                height: '4px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                margin: '0 auto',
                borderRadius: '2px',
                animation: isVisible['contact'] ? 'fadeInUp 1s ease 0.4s both' : 'none'
              }}></div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '3rem'
              }}>
                <div style={{
                padding: '3rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: isVisible['contact'] ? 'fadeInUp 1s ease 0.6s both' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                }} />
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  📧
                </div>
                  <h3 style={{ 
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '2rem'
                }}>
                  連絡先情報
              </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div>
                    <h4 style={{
                      color: '#64748b',
                      fontSize: '1rem',
                      marginBottom: '0.75rem',
                      fontWeight: '600'
                    }}>
                      メールアドレス
                    </h4>
                  <p style={{ 
                      color: '#1f2937',
                      fontSize: '1.1rem',
                      fontWeight: '500'
                    }}>
                      work.ryuto.hatsuno@gmail.com
                    </p>
                  </div>
                  <div>
                    <h4 style={{
                      color: '#64748b',
                      fontSize: '1rem',
                      marginBottom: '0.75rem',
                      fontWeight: '600'
                    }}>
                      営業時間
                    </h4>
                  <p style={{ 
                      color: '#1f2937',
                      fontSize: '1.1rem',
                      fontWeight: '500'
                    }}>
                      平日 9:00 - 18:00
                    </p>
                </div>
                </div>
              </div>
              
                <div style={{ 
                padding: '3rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: isVisible['contact'] ? 'fadeInUp 1s ease 0.8s both' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(135deg, #10b981, #059669)'
                }} />
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  💬
                </div>
                  <h3 style={{ 
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '2rem'
                }}>
                  お問い合わせ
                  </h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <input
                    type="text"
                    placeholder="お名前"
                    style={{
                      padding: '1rem',
                      border: '2px solid rgba(229, 231, 235, 0.5)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      background: 'rgba(248, 250, 252, 0.5)',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#3b82f6'
                      e.currentTarget.style.background = '#ffffff'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(229, 231, 235, 0.5)'
                      e.currentTarget.style.background = 'rgba(248, 250, 252, 0.5)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="メールアドレス"
                    style={{
                      padding: '1rem',
                      border: '2px solid rgba(229, 231, 235, 0.5)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      background: 'rgba(248, 250, 252, 0.5)',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#3b82f6'
                      e.currentTarget.style.background = '#ffffff'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(229, 231, 235, 0.5)'
                      e.currentTarget.style.background = 'rgba(248, 250, 252, 0.5)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <textarea
                    placeholder="メッセージ"
                    rows={4}
                    style={{
                      padding: '1rem',
                      border: '2px solid rgba(229, 231, 235, 0.5)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      resize: 'vertical',
                      background: 'rgba(248, 250, 252, 0.5)',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#3b82f6'
                      e.currentTarget.style.background = '#ffffff'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(229, 231, 235, 0.5)'
                      e.currentTarget.style.background = 'rgba(248, 250, 252, 0.5)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      color: '#ffffff',
                      padding: '1rem 2rem',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    送信する
                  </button>
                </form>
                  </div>
                </div>
          </section>

          {/* 運営者情報 セクション */}
          <section id="company-info" style={{
            padding: '6rem 0',
            background: '#f9fafb',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ 
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                運営者情報
              </h2>
              <div style={{
                width: '60px',
                height: '3px',
                background: '#3b82f6',
                margin: '0 auto'
              }}></div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              marginBottom: '4rem'
            }}>
              <div style={{
                padding: '2rem',
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  borderRadius: '50%',
                  margin: '0 auto 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}>
                  FH
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}>
                  代表者プロフィール
                </h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  エンジニアとして10年以上の経験を持ち、Webデザインからシステム開発まで幅広く手がけています。
                </p>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  color: '#6b7280'
                }}>
                  <div>• フルスタックエンジニア</div>
                  <div>• フロントエンド開発実績多数</div>
                  <div>• バックエンド開発経験豊富</div>
                  <div>• UI/UXデザイン経験豊富</div>
                  <div>• 3D・インタラクティブ技術</div>
                </div>
              </div>

              <div style={{
                padding: '2rem',
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1.5rem'
                }}>
                  会社情報
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <h4 style={{
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      marginBottom: '0.5rem',
                      fontWeight: '600'
                    }}>
                      会社名
                    </h4>
                    <p style={{ 
                      color: '#1f2937',
                      fontSize: '1rem'
                    }}>
                      Flium
                    </p>
                  </div>
                  <div>
                    <h4 style={{
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      marginBottom: '0.5rem',
                      fontWeight: '600'
                    }}>
                      設立年月
                    </h4>
                    <p style={{ 
                      color: '#1f2937',
                      fontSize: '1rem'
                    }}>
                      2025年1月
                    </p>
                  </div>
                  <div>
                    <h4 style={{
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      marginBottom: '0.5rem',
                      fontWeight: '600'
                    }}>
                      所在地
                    </h4>
                    <p style={{ 
                      color: '#1f2937',
                      fontSize: '1rem'
                    }}>
                      東京都
                    </p>
                  </div>
                  <div>
                    <h4 style={{
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      marginBottom: '0.5rem',
                      fontWeight: '600'
                    }}>
                      事業内容
                    </h4>
                    <p style={{ 
                      color: '#1f2937',
                      fontSize: '1rem'
                    }}>
                      Webデザイン・開発、システム開発、デジタル戦略コンサルティング
                    </p>
                  </div>
                </div>
              </div>

              <div style={{
                padding: '2rem',
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1.5rem'
                }}>
                  技術スタック
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <h4 style={{
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      marginBottom: '0.5rem',
                      fontWeight: '600'
                    }}>
                      フロントエンド
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <span style={{
                        background: '#f3f4f6',
                        color: '#6b7280',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}>
                        React
                      </span>
                      <span style={{
                        background: '#f3f4f6',
                        color: '#6b7280',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}>
                        Next.js
                      </span>
                      <span style={{
                        background: '#f3f4f6',
                        color: '#6b7280',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}>
                        TypeScript
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 style={{
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      marginBottom: '0.5rem',
                      fontWeight: '600'
                    }}>
                      バックエンド
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <span style={{
                        background: '#f3f4f6',
                        color: '#6b7280',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}>
                        Node.js
                      </span>
                      <span style={{
                        background: '#f3f4f6',
                        color: '#6b7280',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}>
                        Python
                      </span>
                      <span style={{
                        background: '#f3f4f6',
                        color: '#6b7280',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}>
                        PostgreSQL
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 style={{
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      marginBottom: '0.5rem',
                      fontWeight: '600'
                    }}>
                      3D・グラフィックス
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <span style={{
                        background: '#f3f4f6',
                        color: '#6b7280',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}>
                        Three.js
                      </span>
                      <span style={{
                        background: '#f3f4f6',
                        color: '#6b7280',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}>
                        WebGL
                      </span>
                      <span style={{
                        background: '#f3f4f6',
                        color: '#6b7280',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}>
                        Blender
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ブログ セクション */}
          <section id="blog" style={{
            padding: '6rem 0',
            background: '#ffffff',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ 
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                ブログ
              </h2>
              <div style={{
                width: '60px',
                height: '3px',
                background: '#3b82f6',
                margin: '0 auto'
              }}></div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                padding: '2rem',
                background: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  background: '#3b82f6',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'inline-block',
                  marginBottom: '1rem'
                }}>
                  技術記事
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1rem',
                  lineHeight: '1.4'
                }}>
                  Next.js 14の新機能とパフォーマンス最適化のベストプラクティス
                </h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}>
                  Next.js 14で導入された新機能について詳しく解説し、実際のプロジェクトでのパフォーマンス最適化手法を紹介します。
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  color: '#9ca3af'
                }}>
                  <span>2024年1月15日</span>
                  <span>5分で読める</span>
                </div>
              </div>

              <div style={{
                padding: '2rem',
                background: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  background: '#10b981',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'inline-block',
                  marginBottom: '1rem'
                }}>
                  デザイン
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1rem',
                  lineHeight: '1.4'
                }}>
                  UI/UXデザインでユーザー体験を向上させる5つのポイント
                </h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}>
                  ユーザー中心のデザイン思考に基づき、実際のプロジェクトで効果的だったUI/UX改善手法をまとめました。
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  color: '#9ca3af'
                }}>
                  <span>2024年1月10日</span>
                  <span>7分で読める</span>
                </div>
              </div>

              <div style={{
                padding: '2rem',
                background: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  background: '#f59e0b',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'inline-block',
                  marginBottom: '1rem'
                }}>
                  3D・WebGL
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1rem',
                  lineHeight: '1.4'
                }}>
                  Three.jsで作るインタラクティブな3D Webサイトの作り方
                </h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}>
                  Three.jsを使った3D Webサイトの開発手法を、実際のコード例とともに詳しく解説します。
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  color: '#9ca3af'
                }}>
                  <span>2024年1月5日</span>
                  <span>10分で読める</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button style={{
                background: '#3b82f6',
                color: '#ffffff',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                すべての記事を見る
              </button>
            </div>
          </section>
              </div>
        </div>
      </>
    )
  }

  return (
                <div style={{
      position: 'fixed',
                  top: 0,
                  left: 0,
      width: '100%',
      height: '100vh',
      zIndex: 1000,
      background: 'linear-gradient(135deg, #0f172a, #1e1b4b, #0f172a)',
                    display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
                    flexDirection: 'column',
      transition: 'opacity 1s ease-out',
      opacity: isTransitioning ? 0 : 1
    }}>
      {/* 3D背景シーン（スプラッシュ画面用） */}
      <Scene3D />
      
      {/* スプラッシュ画面のコンテンツ */}
                  <div style={{
        position: 'relative',
        zIndex: 10,
                display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        flexDirection: 'column',
        background: 'rgba(13, 27, 42, 0.3)',
        padding: '2rem',
        borderRadius: '20px'
      }}>
        <h1 style={{ 
          fontSize: '4rem', 
          marginBottom: '1rem', 
          fontWeight: 'bold',
                color: '#F0F3F5',
          textShadow: '0 0 20px rgba(0, 245, 212, 0.3)'
        }}>
          Flium
        </h1>
                  <p style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
                    color: '#F0F3F5',
          textShadow: '0 0 10px rgba(0, 245, 212, 0.2)'
        }}>
          デジタルを構成する、新しい元素。
        </p>
                    <p style={{ 
                      fontSize: '1rem',
          opacity: 0.8,
          marginBottom: '2rem',
          color: '#F0F3F5'
        }}>
          The Element of Digital Flow.
        </p>
        {/* インタラクション案内 */}
        <div style={{
          fontSize: '0.9rem',
          color: '#8E94F2',
          marginTop: '2rem',
          opacity: 0.7,
          animation: 'pulse 2s infinite'
        }}>
          タップまたはスクロールでサイトへ
                  </div>
                </div>
              </div>
  )
}