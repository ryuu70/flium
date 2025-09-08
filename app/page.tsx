'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import BlogSection from '../components/BlogSection'

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
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = Math.min(scrollY / maxScroll, 1)

      // 理念セクションは常に表示されるため、スクロール制御は不要
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初期実行

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 100px;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
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

        /* モバイル対応のメディアクエリ */
        @media (max-width: 768px) {
          .section-title {
            font-size: 1.8rem !important;
            letter-spacing: 0.05em !important;
          }
          
          .section-subtitle {
            font-size: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .section-quote {
            font-size: 1.4rem !important;
            padding-left: 1.5rem !important;
            margin-bottom: 2rem !important;
          }
          
          .section-description {
            font-size: 1rem !important;
            line-height: 1.6 !important;
          }
          
          .values-card {
            padding: 2rem !important;
          }
          
          .values-title {
            font-size: 1.4rem !important;
            margin-bottom: 1rem !important;
          }
          
          .values-subtitle {
            font-size: 0.9rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .values-description {
            font-size: 1.1rem !important;
            line-height: 1.6 !important;
          }
          
          /* About Us セクション用 */
          .about-title {
            font-size: 3rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .about-subtitle {
            font-size: 2rem !important;
            margin-bottom: 1rem !important;
          }
          
          .about-description {
            font-size: 1rem !important;
            line-height: 1.6 !important;
          }
          
          .about-card {
            padding: 3rem 2rem !important;
            margin-bottom: 3rem !important;
          }
          
          .about-belief {
            padding: 1.5rem !important;
            margin-top: 1.5rem !important;
          }
          
          .about-belief h4 {
            font-size: 1.2rem !important;
            margin-bottom: 0.8rem !important;
          }
          
          .about-belief p {
            font-size: 0.9rem !important;
            line-height: 1.6 !important;
          }
          
          .founder-name {
            font-size: 1.8rem !important;
            margin-bottom: 0.8rem !important;
          }
          
          .founder-description {
            font-size: 0.9rem !important;
            line-height: 1.6 !important;
          }
          
          .founder-quote {
            padding: 1.5rem !important;
            margin-top: 1.5rem !important;
          }
          
          .founder-quote p {
            font-size: 0.9rem !important;
            line-height: 1.6 !important;
          }
          
          .cta-button {
            padding: 0.8rem 2rem !important;
            font-size: 1rem !important;
          }
          
          /* Services セクション用 */
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          
          .service-card {
            padding: 3rem 2rem !important;
          }
          
          .service-title {
            font-size: 2rem !important;
            margin-bottom: 1rem !important;
          }
          
          .service-description {
            font-size: 1rem !important;
            line-height: 1.6 !important;
          }
          
          /* Portfolio セクション用 */
          .portfolio-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          
          .portfolio-card {
            padding: 3rem 2rem !important;
          }
          
          .portfolio-title {
            font-size: 1.8rem !important;
            margin-bottom: 1rem !important;
          }
          
          .portfolio-description {
            font-size: 1rem !important;
            line-height: 1.6 !important;
          }
          
          .portfolio-tech {
            font-size: 0.8rem !important;
            padding: 0.3rem 0.6rem !important;
          }
          
          /* Technology セクション用 */
          .tech-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          
          .tech-card {
            padding: 2.5rem 2rem !important;
          }
          
          .tech-title {
            font-size: 1.5rem !important;
            margin-bottom: 1rem !important;
          }
          
          .tech-tag {
            font-size: 0.8rem !important;
            padding: 0.4rem 0.8rem !important;
          }
          
          .tech-methodology {
            padding: 3rem 2rem !important;
          }
          
          .tech-methodology h3 {
            font-size: 2rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .tech-methodology p {
            font-size: 1rem !important;
            line-height: 1.6 !important;
          }
          
          .tech-methodology-tag {
            font-size: 0.8rem !important;
            padding: 0.4rem 1rem !important;
          }
          
          /* Contact セクション用 */
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          
          .contact-form {
            padding: 3rem 2rem !important;
          }
          
          .contact-info {
            padding: 3rem 2rem !important;
          }
          
          .contact-title {
            font-size: 2rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .contact-label {
            font-size: 0.9rem !important;
            margin-bottom: 0.4rem !important;
          }
          
          .contact-input {
            padding: 0.8rem !important;
            font-size: 0.9rem !important;
          }
          
          .contact-textarea {
            padding: 0.8rem !important;
            font-size: 0.9rem !important;
          }
          
          .contact-submit {
            padding: 0.8rem 2rem !important;
            font-size: 1rem !important;
          }
          
          .contact-info-title {
            font-size: 1.8rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .contact-info-item h4 {
            font-size: 1rem !important;
            margin-bottom: 0.4rem !important;
          }
          
          .contact-info-item p {
            font-size: 0.9rem !important;
            line-height: 1.6 !important;
          }
          
          /* Blog セクション用 */
          .blog-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          
          .blog-card {
            padding: 2.5rem 2rem !important;
          }
          
          .blog-category {
            font-size: 0.7rem !important;
            padding: 0.3rem 0.6rem !important;
            margin-bottom: 1rem !important;
          }
          
          .blog-title {
            font-size: 1.6rem !important;
            margin-bottom: 0.8rem !important;
          }
          
          .blog-description {
            font-size: 0.9rem !important;
            line-height: 1.6 !important;
            margin-bottom: 1rem !important;
          }
          
          .blog-meta {
            font-size: 0.8rem !important;
          }
          
          .blog-button {
            padding: 0.8rem 2rem !important;
            font-size: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.5rem !important;
          }
          
          .section-quote {
            font-size: 1.2rem !important;
            padding-left: 1rem !important;
          }
          
          .section-description {
            font-size: 0.9rem !important;
          }
          
          .values-card {
            padding: 1.5rem !important;
          }
          
          .values-title {
            font-size: 1.2rem !important;
          }
          
          .values-description {
            font-size: 1rem !important;
          }
          
          /* About Us セクション用（480px以下） */
          .about-title {
            font-size: 2.5rem !important;
            margin-bottom: 1rem !important;
          }
          
          .about-subtitle {
            font-size: 1.8rem !important;
            margin-bottom: 0.8rem !important;
          }
          
          .about-description {
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
          }
          
          .about-card {
            padding: 2rem 1.5rem !important;
            margin-bottom: 2rem !important;
          }
          
          .about-belief {
            padding: 1rem !important;
            margin-top: 1rem !important;
          }
          
          .about-belief h4 {
            font-size: 1.1rem !important;
            margin-bottom: 0.6rem !important;
          }
          
          .about-belief p {
            font-size: 0.8rem !important;
            line-height: 1.5 !important;
          }
          
          .founder-name {
            font-size: 1.5rem !important;
            margin-bottom: 0.6rem !important;
          }
          
          .founder-description {
            font-size: 0.8rem !important;
            line-height: 1.5 !important;
          }
          
          .founder-quote {
            padding: 1rem !important;
            margin-top: 1rem !important;
          }
          
          .founder-quote p {
            font-size: 0.8rem !important;
            line-height: 1.5 !important;
          }
          
          .cta-button {
            padding: 0.7rem 1.5rem !important;
            font-size: 0.9rem !important;
          }
          
          /* Services セクション用（480px以下） */
          .services-grid {
            gap: 1.5rem !important;
          }
          
          .service-card {
            padding: 2rem 1.5rem !important;
          }
          
          .service-title {
            font-size: 1.6rem !important;
            margin-bottom: 0.8rem !important;
          }
          
          .service-description {
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
          }
          
          /* Portfolio セクション用（480px以下） */
          .portfolio-grid {
            gap: 1.5rem !important;
          }
          
          .portfolio-card {
            padding: 2rem 1.5rem !important;
          }
          
          .portfolio-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.8rem !important;
          }
          
          .portfolio-description {
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
          }
          
          .portfolio-tech {
            font-size: 0.7rem !important;
            padding: 0.2rem 0.5rem !important;
          }
          
          /* Technology セクション用（480px以下） */
          .tech-grid {
            gap: 1.5rem !important;
          }
          
          .tech-card {
            padding: 2rem 1.5rem !important;
          }
          
          .tech-title {
            font-size: 1.3rem !important;
            margin-bottom: 0.8rem !important;
          }
          
          .tech-tag {
            font-size: 0.7rem !important;
            padding: 0.3rem 0.6rem !important;
          }
          
          .tech-methodology {
            padding: 2rem 1.5rem !important;
          }
          
          .tech-methodology h3 {
            font-size: 1.6rem !important;
            margin-bottom: 1rem !important;
          }
          
          .tech-methodology p {
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
          }
          
          .tech-methodology-tag {
            font-size: 0.7rem !important;
            padding: 0.3rem 0.8rem !important;
          }
          
          /* Contact セクション用（480px以下） */
          .contact-grid {
            gap: 2rem !important;
          }
          
          .contact-form {
            padding: 2rem 1.5rem !important;
          }
          
          .contact-info {
            padding: 2rem 1.5rem !important;
          }
          
          .contact-title {
            font-size: 1.6rem !important;
            margin-bottom: 1rem !important;
          }
          
          .contact-label {
            font-size: 0.8rem !important;
            margin-bottom: 0.3rem !important;
          }
          
          .contact-input {
            padding: 0.7rem !important;
            font-size: 0.8rem !important;
          }
          
          .contact-textarea {
            padding: 0.7rem !important;
            font-size: 0.8rem !important;
          }
          
          .contact-submit {
            padding: 0.7rem 1.5rem !important;
            font-size: 0.9rem !important;
          }
          
          .contact-info-title {
            font-size: 1.5rem !important;
            margin-bottom: 1rem !important;
          }
          
          .contact-info-item h4 {
            font-size: 0.9rem !important;
            margin-bottom: 0.3rem !important;
          }
          
          .contact-info-item p {
            font-size: 0.8rem !important;
            line-height: 1.5 !important;
          }
          
          /* Blog セクション用（480px以下） */
          .blog-grid {
            gap: 1.5rem !important;
          }
          
          .blog-card {
            padding: 2rem 1.5rem !important;
          }
          
          .blog-category {
            font-size: 0.6rem !important;
            padding: 0.2rem 0.5rem !important;
            margin-bottom: 0.8rem !important;
          }
          
          .blog-title {
            font-size: 1.4rem !important;
            margin-bottom: 0.6rem !important;
          }
          
          .blog-description {
            font-size: 0.8rem !important;
            line-height: 1.5 !important;
            margin-bottom: 0.8rem !important;
          }
          
          .blog-meta {
            font-size: 0.7rem !important;
          }
          
          .blog-button {
            padding: 0.7rem 1.5rem !important;
            font-size: 0.9rem !important;
          }
        }

        /* モバイル用のレイアウト調整 */
        @media (max-width: 768px) {
          main {
            padding: 0 0.5rem !important;
          }
          
          .section-container {
            padding: 2rem 1rem !important;
          }
          
          .values-container {
            padding: 1rem !important;
          }
          
          .hero-title {
            font-size: 2.5rem !important;
            margin-bottom: 0.5rem !important;
          }
          
          .hero-subtitle {
            font-size: 1.2rem !important;
            margin-bottom: 1rem !important;
          }
          
          .hero-description {
            font-size: 0.9rem !important;
            margin-bottom: 1rem !important;
          }
          
          .hero-floating-text {
            font-size: 1.8rem !important;
            bottom: 20% !important;
          }
        }

        @media (max-width: 480px) {
          main {
            padding: 0 0.25rem !important;
          }
          
          .section-container {
            padding: 1rem 0.5rem !important;
          }
          
          .values-container {
            padding: 0.5rem !important;
          }
          
          .hero-title {
            font-size: 2rem !important;
            margin-bottom: 0.5rem !important;
          }
          
          .hero-subtitle {
            font-size: 1rem !important;
            margin-bottom: 0.8rem !important;
          }
          
          .hero-description {
            font-size: 0.8rem !important;
            margin-bottom: 0.8rem !important;
          }
          
          .hero-floating-text {
            font-size: 1.4rem !important;
            bottom: 15% !important;
          }
          
          .hero-container {
            padding: 1rem !important;
            min-height: 80vh !important;
          }
        }
      `}</style>
      <main style={{ 
        minHeight: '100vh', 
        position: 'relative',
        color: '#F0F3F5',
        textAlign: 'center',
        padding: '0 1rem'
      }}>
      {/* 3D背景シーン */}
      <Scene3D />
      
      {/* メインコンテンツ */}
      <div className="hero-container" style={{ 
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'rgba(13, 27, 42, 0.3)'
      }}>
        <div>
          <h1 className="hero-title" style={{ 
            fontSize: '4rem', 
            marginBottom: '1rem', 
            fontWeight: 'bold',
            color: '#F0F3F5',
            textShadow: '0 0 20px rgba(0, 245, 212, 0.3)'
          }}>
            Flium
          </h1>
          <p className="hero-subtitle" style={{ 
            fontSize: '1.5rem', 
            marginBottom: '2rem',
            color: '#F0F3F5',
            textShadow: '0 0 10px rgba(0, 245, 212, 0.2)'
          }}>
            デジタルを構成する、新しい元素。
          </p>
          <p className="hero-description" style={{ 
            fontSize: '1rem', 
            opacity: 0.8,
            marginBottom: '2rem',
            color: '#F0F3F5'
          }}>
            The Element of Digital Flow.
          </p>
          {/* 3D空間に浮かぶテキスト */}
          <div className="hero-floating-text" style={{
            position: 'absolute',
            bottom: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#F0F3F5',
            textShadow: '0 0 30px rgba(0, 245, 212, 0.6)',
            zIndex: 20,
            pointerEvents: 'none',
            letterSpacing: '0.1em'
          }}>
            美しい流れは、価値になる。
          </div>
          
        </div>
      </div>
      
      {/* スクロール可能なコンテンツ */}
      <div className="section-container" style={{ 
        position: 'relative',
        zIndex: 10,
        background: 'rgba(0,0,0,0.8)',
        padding: '4rem 2rem',
        marginTop: '100vh',
        minHeight: '300vh' // 十分なスクロール領域を確保
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* 理念セクション */}
          <section style={{ 
            marginBottom: '8rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '4rem 2rem'
          }}>
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '6rem',
              maxWidth: '800px'
            }}>
              <h2 style={{ 
                fontSize: '5rem', 
                fontWeight: '200',
                letterSpacing: '0.2em',
                margin: 0,
                color: '#F0F3F5',
                animation: 'fadeInUp 1s ease-out',
                textShadow: '0 0 60px rgba(240, 243, 245, 0.8), 0 0 100px rgba(0, 245, 212, 0.3)',
                filter: 'drop-shadow(0 0 20px rgba(240, 243, 245, 0.5))'
              }}>
                Philosophy
              </h2>
              <div style={{
                width: '150px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #00F5D4, #8E94F2, transparent)',
                margin: '3rem auto 0',
                borderRadius: '2px',
                animation: 'expandWidth 2s ease-out 0.5s both'
              }}></div>
            </div>
            
            {/* Mission */}
            <div 
              id="mission-section"
              style={{ 
                marginBottom: '6rem',
                padding: '6rem 4rem',
                background: 'rgba(0, 245, 212, 0.03)',
                borderRadius: '32px',
                border: '1px solid rgba(0, 245, 212, 0.2)',
                backdropFilter: 'blur(40px)',
              position: 'relative',
              overflow: 'hidden',
                animation: 'fadeInUp 1s ease-out 0.2s both',
                maxWidth: '900px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(0, 245, 212, 0.1)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #00F5D4, transparent)',
                animation: 'shimmer 4s ease-in-out infinite'
              }}></div>
              
              {/* Mission テキスト */}
              <div 
                id="mission-chaos-text"
                style={{ 
                  position: 'relative',
                  textAlign: 'center',
                  opacity: 1,
                  zIndex: 10
                }}
              >
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.5rem',
                  background: 'rgba(0, 245, 212, 0.1)',
                  borderRadius: '50px',
                  marginBottom: '2rem',
                  border: '1px solid rgba(0, 245, 212, 0.3)'
                }}>
                  <span style={{
                    fontSize: '0.9rem',
                color: '#00F5D4',
                    fontWeight: '500',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}>
                    Mission
                  </span>
                </div>
                
                <h3 style={{ 
                  fontSize: '3.5rem', 
                  color: '#F0F3F5',
                marginBottom: '2rem',
                  fontWeight: '200',
                letterSpacing: '0.05em',
                  lineHeight: '1.2'
              }}>
                  流れを設計し、実装する
              </h3>
                
                <p style={{ 
                  fontSize: '1.3rem', 
                  color: '#8E94F2',
                  lineHeight: '1.8',
                  maxWidth: '700px',
                  margin: '0 auto',
                  letterSpacing: '0.02em',
                  fontWeight: '300'
                }}>
                  私たちは、見た目の美しさだけでなく、その裏側にあるロジック、データ、ユーザー体験のすべてを滑らかに繋ぐ「流れ」をデザインします。
                </p>
              </div>
            </div>

            {/* Vision */}
            <div 
              id="vision-section"
              style={{ 
                marginBottom: '6rem',
                padding: '6rem 4rem',
                background: 'rgba(142, 148, 242, 0.03)',
                borderRadius: '32px',
                border: '1px solid rgba(142, 148, 242, 0.2)',
                backdropFilter: 'blur(40px)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'fadeInUp 1s ease-out 0.4s both',
                maxWidth: '900px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(142, 148, 242, 0.1)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #8E94F2, transparent)',
                animation: 'shimmer 4s ease-in-out infinite 1s'
              }}></div>
              
              {/* Visionテキスト */}
              <div 
                id="vision-text"
                style={{ 
                  position: 'relative',
                  textAlign: 'center',
                  opacity: 1,
                  zIndex: 10
                }}
              >
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.5rem',
                  background: 'rgba(142, 148, 242, 0.1)',
                  borderRadius: '50px',
                  marginBottom: '2rem',
                  border: '1px solid rgba(142, 148, 242, 0.3)'
                }}>
                  <span style={{
                    fontSize: '0.9rem',
                color: '#8E94F2',
                fontWeight: '500',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
              }}>
                    Vision
                  </span>
              </div>
                
                <h3 style={{ 
                  fontSize: '3.5rem', 
                color: '#F0F3F5',
                  marginBottom: '2rem',
                  fontWeight: '200',
                  letterSpacing: '0.05em',
                  lineHeight: '1.2'
                }}>
                  テクノロジーを、水や光のように
                </h3>
                
                <p style={{ 
                  fontSize: '1.3rem', 
                  color: '#8E94F2',
                  lineHeight: '1.8',
                  maxWidth: '700px',
                  margin: '0 auto',
                  letterSpacing: '0.02em',
                  fontWeight: '300'
                }}>
                  私たちが目指すのは、テクノロジーの存在を意識させないほどに自然で、直感的で、美しいデジタル体験が当たり前になる世界です。
                </p>
              </div>
            </div>

            {/* Values */}
            <div 
              id="values-section"
              className="values-container"
              style={{ 
                padding: '6rem 4rem',
                background: 'rgba(240, 243, 245, 0.03)',
                borderRadius: '32px',
                border: '1px solid rgba(240, 243, 245, 0.2)',
                backdropFilter: 'blur(40px)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'fadeInUp 1s ease-out 0.6s both',
                maxWidth: '900px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(240, 243, 245, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #F0F3F5, transparent)',
                animation: 'shimmer 4s ease-in-out infinite 2s'
              }}></div>
              
              {/* Values メインタイトル */}
              <div style={{ 
                textAlign: 'center',
                marginBottom: '4rem'
              }}>
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.5rem',
                  background: 'rgba(240, 243, 245, 0.1)',
                  borderRadius: '50px',
                  marginBottom: '2rem',
                  border: '1px solid rgba(240, 243, 245, 0.3)'
                }}>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#F0F3F5',
                    fontWeight: '500',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}>
                    Values
                  </span>
                </div>
                
                <h3 style={{ 
                  fontSize: '3.5rem', 
                  color: '#F0F3F5',
                  marginBottom: '2rem',
                  fontWeight: '200',
                  letterSpacing: '0.05em',
                  lineHeight: '1.2'
                }}>
                  私たちが約束する行動指針
                </h3>
              </div>
              
              {/* 本質と洗練 */}
              <div 
                id="values-essence-text"
                style={{ 
                  position: 'relative',
                  textAlign: 'center',
                  opacity: 1,
                  zIndex: 10,
                  maxWidth: '600px',
                  margin: '0 auto 4rem auto'
                }}
              >
                
                <div style={{ 
                  padding: '3rem 2rem',
                  background: 'rgba(0, 245, 212, 0.05)',
                  borderRadius: '24px',
                  border: '1px solid rgba(0, 245, 212, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <h4 style={{ 
                    fontSize: '2.2rem', 
                    color: '#00F5D4',
                    marginBottom: '1rem',
                    fontWeight: '300',
                    letterSpacing: '0.05em'
                  }}>
                    本質と洗練
                  </h4>
              <p style={{ 
                fontSize: '1.2rem', 
                    color: '#8E94F2',
                lineHeight: '1.8',
                    fontWeight: '300',
                    letterSpacing: '0.02em'
              }}>
                    私たちは、過剰に飾ることをしません。常に物事の「本質」を見極め、不要なものを削ぎ落とし、磨き上げます。
              </p>
                </div>
            </div>

              {/* 動的な調和 */}
              <div 
                id="values-harmony-text"
                style={{ 
                  position: 'relative',
                  textAlign: 'center',
                  opacity: 1,
                  zIndex: 10,
                  maxWidth: '600px',
                  margin: '0 auto 4rem auto'
                }}
              >
            <div style={{ 
                  padding: '3rem 2rem',
                  background: 'rgba(142, 148, 242, 0.05)',
              borderRadius: '24px',
                  border: '1px solid rgba(142, 148, 242, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <h4 style={{ 
                    fontSize: '2.2rem', 
                    color: '#8E94F2',
                    marginBottom: '1rem',
                    fontWeight: '300',
                    letterSpacing: '0.05em'
                  }}>
                    動的な調和
                  </h4>
                  <p style={{ 
                    fontSize: '1.2rem', 
                    color: '#8E94F2',
                    lineHeight: '1.8',
                    fontWeight: '300',
                    letterSpacing: '0.02em'
                  }}>
                    私たちは、静的な完璧さだけを追求しません。ユーザーの動き、データの流れ、時代の変化と相互作用し、生き物のように滑らかに動き続けます。
                  </p>
                </div>
              </div>

              {/* 大胆な探究 */}
              <div 
                id="values-exploration-text"
                style={{ 
                  position: 'relative',
                  textAlign: 'center',
                  opacity: 1,
                  zIndex: 10,
                  maxWidth: '600px',
                  margin: '0 auto 4rem auto'
                }}
              >
                <div style={{ 
                  padding: '3rem 2rem',
                  background: 'rgba(240, 243, 245, 0.05)',
                  borderRadius: '24px',
                  border: '1px solid rgba(240, 243, 245, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <h4 style={{ 
                    fontSize: '2.2rem', 
                    color: '#F0F3F5',
                    marginBottom: '1rem',
                    fontWeight: '300',
                    letterSpacing: '0.05em'
                  }}>
                    大胆な探究
                  </h4>
                  <p style={{ 
                    fontSize: '1.2rem', 
                    color: '#8E94F2',
                    lineHeight: '1.8',
                    fontWeight: '300',
                    letterSpacing: '0.02em'
                  }}>
                    私たちは、未知の領域にこそ最高の流れがあると信じ、探究を恐れません。新しい技術や表現を常に実験し、リスクを恐れず挑戦します。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* About Us セクション */}
          <section style={{ 
            marginBottom: '8rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '4rem 2rem'
          }}>
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '6rem',
              maxWidth: '800px'
            }}>
              <h2 style={{ 
                fontSize: '5rem', 
                fontWeight: '200',
                letterSpacing: '0.2em',
                margin: 0,
                color: '#F0F3F5',
                animation: 'fadeInUp 1s ease-out',
                textShadow: '0 0 60px rgba(240, 243, 245, 0.8), 0 0 100px rgba(0, 245, 212, 0.3)',
                filter: 'drop-shadow(0 0 20px rgba(240, 243, 245, 0.5))'
              }}>
                About Us
              </h2>
              <div style={{
                width: '150px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #00F5D4, #8E94F2, transparent)',
                margin: '3rem auto 0',
                borderRadius: '2px',
                animation: 'expandWidth 2s ease-out 0.5s both'
              }}></div>
            </div>

            {/* 会社概要 */}
            <div className="about-card" style={{ 
              marginBottom: '6rem',
              padding: '6rem 4rem',
              background: 'rgba(142, 148, 242, 0.03)',
              borderRadius: '32px',
              border: '1px solid rgba(142, 148, 242, 0.2)',
              backdropFilter: 'blur(40px)',
              position: 'relative',
              overflow: 'hidden',
              animation: 'fadeInUp 1s ease-out 0.2s both',
              maxWidth: '1000px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(142, 148, 242, 0.1)'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #8E94F2, transparent)',
                animation: 'shimmer 4s ease-in-out infinite'
              }}></div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.5rem',
                  background: 'rgba(142, 148, 242, 0.1)',
                  borderRadius: '50px',
                  marginBottom: '2rem',
                  border: '1px solid rgba(142, 148, 242, 0.3)'
                }}>
                  <span style={{
                    fontSize: '0.9rem',
                color: '#8E94F2',
                    fontWeight: '500',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}>
                    Company
                  </span>
                </div>
                
                <h3 className="about-title" style={{ 
                  fontSize: '3.5rem', 
                  color: '#F0F3F5',
                marginBottom: '2rem',
                  fontWeight: '200',
                letterSpacing: '0.05em',
                  lineHeight: '1.2'
              }}>
                  デジタルに、生命の流れを。
              </h3>
                
                <p className="about-description" style={{ 
                  fontSize: '1.3rem', 
                  color: '#8E94F2',
                  lineHeight: '1.8',
                  maxWidth: '800px',
                  margin: '0 auto 2rem auto',
                  letterSpacing: '0.02em',
                  fontWeight: '300'
                }}>
                  Fliumは、デジタル体験の根源を創り出すデザイン＆テクノロジースタジオです。
                </p>
                
                <p className="about-description" style={{ 
                fontSize: '1.1rem',
                  color: '#8E94F2',
                  lineHeight: '1.8',
                  maxWidth: '800px',
                  margin: '0 auto 2rem auto',
                  letterSpacing: '0.02em',
                  fontWeight: '300'
                }}>
                  社名は「Flow（流れ）」と、ラテン語で「元素」を意味する「-ium」を組み合わせた造語。<br/>
                  「優れたデジタル体験の核心には、必ず美しく機能的な『流れ』が存在する」という信念のもと、私たちはその根源的な要素を設計し、実装します。
                </p>
                
                <div className="about-belief" style={{
                  padding: '2rem',
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '20px',
                  marginTop: '2rem',
                  border: '1px solid rgba(142, 148, 242, 0.1)'
                }}>
                  <h4 style={{ 
                    fontSize: '1.5rem', 
                    color: '#F0F3F5',
                    marginBottom: '1rem',
                    fontWeight: '300',
                    letterSpacing: '0.05em'
                  }}>
                    私たちが信じること
                  </h4>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    color: '#8E94F2',
                    lineHeight: '1.8',
                    margin: '0 auto 1.5rem auto',
                    letterSpacing: '0.02em',
                    fontWeight: '300'
                  }}>
                    テクノロジーは、複雑である必要はありません。
                  </p>
                  <p style={{ 
                    fontSize: '1rem', 
                    color: '#8E94F2',
                    lineHeight: '1.8',
                    margin: '0 auto',
                    letterSpacing: '0.02em',
                    fontWeight: '300'
                  }}>
                    私たちは、その存在を意識させないほどに自然で、直感的で、美しいデジタル体験こそが、人の心を動かし、ビジネスの価値を最大化すると信じています。
                  </p>
                </div>
              </div>
            </div>

            {/* 代表者紹介 */}
            <div className="about-card" style={{ 
              marginBottom: '6rem',
              padding: '6rem 4rem',
              background: 'rgba(0, 245, 212, 0.03)',
              borderRadius: '32px',
              border: '1px solid rgba(0, 245, 212, 0.2)',
              backdropFilter: 'blur(40px)',
              position: 'relative',
              overflow: 'hidden',
              animation: 'fadeInUp 1s ease-out 0.4s both',
              maxWidth: '1000px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0, 245, 212, 0.1)'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #00F5D4, transparent)',
                animation: 'shimmer 4s ease-in-out infinite 1s'
              }}></div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.5rem',
                  background: 'rgba(0, 245, 212, 0.1)',
                  borderRadius: '50px',
                  marginBottom: '2rem',
                  border: '1px solid rgba(0, 245, 212, 0.3)'
                }}>
                  <span style={{
                    fontSize: '0.9rem',
                color: '#00F5D4',
                fontWeight: '500',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
              }}>
                    Founder
                  </span>
              </div>
                
                <h3 className="about-subtitle" style={{ 
                  fontSize: '3.5rem', 
                color: '#F0F3F5',
                  marginBottom: '2rem',
                  fontWeight: '200',
                  letterSpacing: '0.05em',
                  lineHeight: '1.2'
                }}>
                  代表 / Founder
                </h3>
                
                <h4 className="founder-name" style={{ 
                  fontSize: '2.2rem', 
                  color: '#00F5D4',
                  marginBottom: '1rem',
                  fontWeight: '300',
                  letterSpacing: '0.05em'
                }}>
                  初野 流斗 / Ryuto Hatsuno
                </h4>
                <p className="founder-description" style={{ 
                  fontSize: '1rem', 
                  color: '#8E94F2',
                  lineHeight: '1.8',
                  maxWidth: '800px',
                  margin: '0 auto 2rem auto',
                  letterSpacing: '0.02em',
                  fontWeight: '300'
                }}>
                  これまで個人事業主として、数々のプロジェクトでUI/UXデザインからAI実装、3Dアニメーションまで、領域を横断した価値創造を追求してきました。
                </p>
                
                <div className="founder-quote" style={{
                  padding: '2rem',
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '20px',
                  marginTop: '2rem',
                  border: '1px solid rgba(0, 245, 212, 0.1)'
                }}>
              <p style={{ 
                    fontSize: '1rem', 
                    color: '#8E94F2',
                lineHeight: '1.8',
                    margin: '0 auto',
                    letterSpacing: '0.02em',
                    fontWeight: '300',
                    fontStyle: 'italic'
                  }}>
                    「Flium」は、その活動の中で見出した「優れた体験の核心には、必ず美しい流れが存在する」という確信を、より純粋な形で社会に還元するために立ち上げた、私の理念そのものです。
                  </p>
                  <p style={{ 
                    fontSize: '1rem', 
                    color: '#8E94F2',
                    lineHeight: '1.8',
                    margin: '1.5rem auto 0 auto',
                    letterSpacing: '0.02em',
                    fontWeight: '300',
                    fontStyle: 'italic'
                  }}>
                    一つひとつのプロジェクトに、自身の知見と情熱のすべてを注ぎ込みます。
                  </p>
                </div>
              </div>
            </div>

            {/* 未来へのメッセージ */}
            <div className="about-card" style={{ 
              marginBottom: '6rem',
              padding: '6rem 4rem',
              background: 'rgba(240, 243, 245, 0.03)',
              borderRadius: '32px',
              border: '1px solid rgba(240, 243, 245, 0.2)',
              backdropFilter: 'blur(40px)',
              position: 'relative',
              overflow: 'hidden',
              animation: 'fadeInUp 1s ease-out 0.6s both',
              maxWidth: '1000px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(240, 243, 245, 0.1)'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #F0F3F5, transparent)',
                animation: 'shimmer 4s ease-in-out infinite 2s'
              }}></div>
              
              <div style={{ textAlign: 'center' }}>
              <h3 style={{ 
                  fontSize: '3.5rem', 
                color: '#F0F3F5',
                  marginBottom: '2rem',
                  fontWeight: '200',
                letterSpacing: '0.05em',
                  lineHeight: '1.2'
              }}>
                  未来の流れを、共に創る
              </h3>
                
              <p style={{ 
                  fontSize: '1.3rem', 
                  color: '#8E94F2',
                  lineHeight: '1.8',
                  maxWidth: '800px',
                  margin: '0 auto 2rem auto',
                  letterSpacing: '0.02em',
                  fontWeight: '300'
                }}>
                  あなたのビジネスが持つ可能性を、まだ誰も見たことのないデジタル体験へと昇華させてみませんか。
                </p>
                
                <p style={{ 
                fontSize: '1.1rem',
                color: '#8E94F2',
                  lineHeight: '1.8',
                  maxWidth: '800px',
                  margin: '0 auto 3rem auto',
                  letterSpacing: '0.02em',
                  fontWeight: '300'
                }}>
                  Fliumは、挑戦的で未来志向のプロジェクトを共に創り上げるパートナーを探しています。<br/>
                  まずはお気軽にご相談ください。
                </p>
                
                <button className="cta-button" style={{
                  padding: '1rem 3rem',
                  background: 'linear-gradient(135deg, #00F5D4, #8E94F2)',
                  border: 'none',
                  borderRadius: '50px',
                  color: '#000',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}>
                  [→ Contact]
                </button>
              </div>
            </div>
          </section>

          {/* Services セクション */}
          <section style={{ 
            marginBottom: '8rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '4rem 2rem'
          }}>
              <div style={{ 
              textAlign: 'center', 
              marginBottom: '6rem',
              maxWidth: '800px'
            }}>
              <h2 style={{ 
                fontSize: '5rem', 
                fontWeight: '200',
                letterSpacing: '0.2em',
                margin: 0,
                color: '#F0F3F5',
                animation: 'fadeInUp 1s ease-out',
                textShadow: '0 0 60px rgba(240, 243, 245, 0.8), 0 0 100px rgba(0, 245, 212, 0.3)',
                filter: 'drop-shadow(0 0 20px rgba(240, 243, 245, 0.5))'
              }}>
                Services
              </h2>
                <div style={{ 
                width: '150px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #00F5D4, #8E94F2, transparent)',
                margin: '3rem auto 0',
                borderRadius: '2px',
                animation: 'expandWidth 2s ease-out 0.5s both'
              }}></div>
            </div>

            {/* サービス一覧 */}
            <div className="services-grid" style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              maxWidth: '1200px',
              width: '100%'
            }}>
              {/* Webデザイン */}
              <div className="service-card" style={{ 
                padding: '4rem 3rem',
                background: 'rgba(0, 245, 212, 0.03)',
                borderRadius: '24px',
                border: '1px solid rgba(0, 245, 212, 0.2)',
                backdropFilter: 'blur(40px)',
                  position: 'relative',
                  overflow: 'hidden',
                animation: 'fadeInUp 1s ease-out 0.2s both',
                boxShadow: '0 20px 60px rgba(0, 245, 212, 0.1)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                  height: '2px',
                    background: 'linear-gradient(90deg, transparent, #00F5D4, transparent)',
                    animation: 'shimmer 4s ease-in-out infinite'
                  }}></div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1.5rem',
                    background: 'rgba(0, 245, 212, 0.1)',
                    borderRadius: '50px',
                    marginBottom: '2rem',
                    border: '1px solid rgba(0, 245, 212, 0.3)'
                  }}>
                    <span style={{
                      fontSize: '0.9rem',
                    color: '#00F5D4',
                      fontWeight: '500',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase'
                    }}>
                      Design
                    </span>
                  </div>
                  
                  <h3 className="service-title" style={{ 
                    fontSize: '2.5rem', 
                    color: '#F0F3F5',
                    marginBottom: '1.5rem',
                    fontWeight: '200',
                    letterSpacing: '0.05em',
                    lineHeight: '1.2'
                  }}>
                    Webデザイン
                  </h3>
                  
                  <p className="service-description" style={{ 
                    fontSize: '1.1rem', 
                    color: '#8E94F2',
                lineHeight: '1.8',
                    fontWeight: '300',
                    letterSpacing: '0.02em'
              }}>
                    ユーザー中心のデザイン思考に基づき、美しく使いやすいWebサイトを創造します。
              </p>
                </div>
            </div>

              {/* 開発 */}
              <div className="service-card" style={{ 
                padding: '4rem 3rem',
                background: 'rgba(142, 148, 242, 0.03)',
                borderRadius: '24px',
                border: '1px solid rgba(142, 148, 242, 0.2)',
                backdropFilter: 'blur(40px)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'fadeInUp 1s ease-out 0.4s both',
                boxShadow: '0 20px 60px rgba(142, 148, 242, 0.1)'
              }}>
                  <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #8E94F2, transparent)',
                  animation: 'shimmer 4s ease-in-out infinite 1s'
                }}></div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1.5rem',
                    background: 'rgba(142, 148, 242, 0.1)',
                    borderRadius: '50px',
                    marginBottom: '2rem',
                    border: '1px solid rgba(142, 148, 242, 0.3)'
                  }}>
                    <span style={{
                    fontSize: '0.9rem',
                    color: '#8E94F2',
                    fontWeight: '500',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase'
                  }}>
                      Development
                    </span>
                  </div>
                  
                  <h3 className="service-title" style={{ 
                    fontSize: '2.5rem', 
                    color: '#F0F3F5',
                    marginBottom: '1.5rem',
                    fontWeight: '200',
                    letterSpacing: '0.05em',
                    lineHeight: '1.2'
                  }}>
                    システム開発
                  </h3>
                  
                  <p className="service-description" style={{ 
                    fontSize: '1.1rem', 
                    color: '#8E94F2',
                    lineHeight: '1.8',
                    fontWeight: '300',
                    letterSpacing: '0.02em'
                  }}>
                    最新技術を活用し、スケーラブルで保守性の高いシステムを構築します。
                  </p>
                </div>
              </div>

              {/* コンサルティング */}
              <div className="service-card" style={{ 
                padding: '4rem 3rem',
                background: 'rgba(240, 243, 245, 0.03)',
              borderRadius: '24px',
                border: '1px solid rgba(240, 243, 245, 0.2)',
                backdropFilter: 'blur(40px)',
              position: 'relative',
              overflow: 'hidden',
                animation: 'fadeInUp 1s ease-out 0.6s both',
                boxShadow: '0 20px 60px rgba(240, 243, 245, 0.1)'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                  height: '2px',
                background: 'linear-gradient(90deg, transparent, #F0F3F5, transparent)',
                  animation: 'shimmer 4s ease-in-out infinite 2s'
              }}></div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1.5rem',
                    background: 'rgba(240, 243, 245, 0.1)',
                    borderRadius: '50px',
                    marginBottom: '2rem',
                    border: '1px solid rgba(240, 243, 245, 0.3)'
                  }}>
                    <span style={{
                      fontSize: '0.9rem',
                    color: '#F0F3F5',
                      fontWeight: '500',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase'
                    }}>
                      Consulting
                    </span>
                  </div>
                  
                  <h3 className="service-title" style={{ 
                    fontSize: '2.5rem', 
                    color: '#F0F3F5',
                    marginBottom: '1.5rem',
                    fontWeight: '200',
                    letterSpacing: '0.05em',
                    lineHeight: '1.2'
                  }}>
                    デジタル戦略
                  </h3>
                  
                  <p className="service-description" style={{ 
                    fontSize: '1.1rem', 
                    color: '#8E94F2',
                    lineHeight: '1.8',
                    fontWeight: '300',
                    letterSpacing: '0.02em'
                  }}>
                    ビジネス目標に合わせたデジタル戦略の立案と実行をサポートします。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio セクション */}
          <section style={{ 
            marginBottom: '8rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '4rem 2rem'
          }}>
                <div style={{ 
              textAlign: 'center', 
              marginBottom: '6rem',
              maxWidth: '800px'
            }}>
              <h2 style={{ 
                fontSize: '5rem', 
                fontWeight: '200',
                letterSpacing: '0.2em',
                margin: 0,
                color: '#F0F3F5',
                animation: 'fadeInUp 1s ease-out',
                textShadow: '0 0 60px rgba(240, 243, 245, 0.8), 0 0 100px rgba(0, 245, 212, 0.3)',
                filter: 'drop-shadow(0 0 20px rgba(240, 243, 245, 0.5))'
              }}>
                Portfolio
              </h2>
              <div style={{
                width: '150px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #00F5D4, #8E94F2, transparent)',
                margin: '3rem auto 0',
                borderRadius: '2px',
                animation: 'expandWidth 2s ease-out 0.5s both'
              }}></div>
            </div>

            {/* プロジェクト一覧 */}
            <div className="portfolio-grid" style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '3rem',
              maxWidth: '1200px',
              width: '100%'
            }}>
              {/* プロジェクト1 */}
              <div className="portfolio-card" style={{ 
                padding: '4rem 3rem',
                background: 'rgba(0, 245, 212, 0.03)',
                borderRadius: '24px',
                border: '1px solid rgba(0, 245, 212, 0.2)',
                backdropFilter: 'blur(40px)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'fadeInUp 1s ease-out 0.2s both',
                boxShadow: '0 20px 60px rgba(0, 245, 212, 0.1)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #00F5D4, transparent)',
                  animation: 'shimmer 4s ease-in-out infinite'
                }}></div>
                
                <div style={{ textAlign: 'center' }}>
                  <h3 className="portfolio-title" style={{ 
                    fontSize: '2.2rem', 
                    color: '#F0F3F5',
                    marginBottom: '1rem',
                    fontWeight: '200',
                    letterSpacing: '0.05em',
                    lineHeight: '1.2'
                  }}>
                    Eコマースプラットフォーム
                  </h3>
                  
                  <p className="portfolio-description" style={{ 
                    fontSize: '1rem', 
                    color: '#8E94F2',
                    lineHeight: '1.8',
                    fontWeight: '300',
                    letterSpacing: '0.02em',
                    marginBottom: '2rem'
                  }}>
                    大規模なECサイトのリニューアルプロジェクト。ユーザビリティとパフォーマンスを大幅に改善。
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    justifyContent: 'center'
                  }}>
                    <span className="portfolio-tech" style={{
                      padding: '0.3rem 0.8rem',
                      background: 'rgba(0, 245, 212, 0.1)',
                  borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: '#00F5D4',
                      border: '1px solid rgba(0, 245, 212, 0.3)'
                    }}>
                      React
                    </span>
                    <span className="portfolio-tech" style={{
                      padding: '0.3rem 0.8rem',
                      background: 'rgba(0, 245, 212, 0.1)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: '#00F5D4',
                      border: '1px solid rgba(0, 245, 212, 0.3)'
                    }}>
                      Node.js
                    </span>
                    <span className="portfolio-tech" style={{
                      padding: '0.3rem 0.8rem',
                      background: 'rgba(0, 245, 212, 0.1)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: '#00F5D4',
                      border: '1px solid rgba(0, 245, 212, 0.3)'
                    }}>
                      AWS
                    </span>
                  </div>
                </div>
              </div>

              {/* プロジェクト2 */}
              <div className="portfolio-card" style={{ 
                padding: '4rem 3rem',
                background: 'rgba(142, 148, 242, 0.03)',
                borderRadius: '24px',
                border: '1px solid rgba(142, 148, 242, 0.2)',
                backdropFilter: 'blur(40px)',
                  position: 'relative',
                  overflow: 'hidden',
                animation: 'fadeInUp 1s ease-out 0.4s both',
                boxShadow: '0 20px 60px rgba(142, 148, 242, 0.1)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                  height: '2px',
                    background: 'linear-gradient(90deg, transparent, #8E94F2, transparent)',
                    animation: 'shimmer 4s ease-in-out infinite 1s'
                  }}></div>
                
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ 
                    fontSize: '2.2rem', 
                    color: '#F0F3F5',
                    marginBottom: '1rem',
                    fontWeight: '200',
                letterSpacing: '0.05em',
                    lineHeight: '1.2'
              }}>
                    企業向けダッシュボード
              </h3>
                  
                  <p style={{ 
                    fontSize: '1rem', 
                    color: '#8E94F2',
                    lineHeight: '1.8',
                    fontWeight: '300',
                    letterSpacing: '0.02em',
                    marginBottom: '2rem'
                  }}>
                    リアルタイムデータ可視化とレポート機能を持つ管理システムの開発。
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      padding: '0.3rem 0.8rem',
                      background: 'rgba(142, 148, 242, 0.1)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                color: '#8E94F2',
                      border: '1px solid rgba(142, 148, 242, 0.3)'
                    }}>
                      Vue.js
                    </span>
                    <span style={{
                      padding: '0.3rem 0.8rem',
                      background: 'rgba(142, 148, 242, 0.1)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: '#8E94F2',
                      border: '1px solid rgba(142, 148, 242, 0.3)'
                    }}>
                      Python
                    </span>
                    <span style={{
                      padding: '0.3rem 0.8rem',
                      background: 'rgba(142, 148, 242, 0.1)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: '#8E94F2',
                      border: '1px solid rgba(142, 148, 242, 0.3)'
                    }}>
                      D3.js
                    </span>
                  </div>
                </div>
              </div>

              {/* プロジェクト3 */}
              <div className="portfolio-card" style={{ 
                padding: '4rem 3rem',
                background: 'rgba(240, 243, 245, 0.03)',
                borderRadius: '24px',
                border: '1px solid rgba(240, 243, 245, 0.2)',
                backdropFilter: 'blur(40px)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'fadeInUp 1s ease-out 0.6s both',
                boxShadow: '0 20px 60px rgba(240, 243, 245, 0.1)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #F0F3F5, transparent)',
                  animation: 'shimmer 4s ease-in-out infinite 2s'
                }}></div>
                
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ 
                    fontSize: '2.2rem', 
                    color: '#F0F3F5',
                    marginBottom: '1rem',
                    fontWeight: '200',
                    letterSpacing: '0.05em',
                    lineHeight: '1.2'
                  }}>
                    モバイルアプリ
                  </h3>
                  
                  <p style={{ 
                    fontSize: '1rem', 
                    color: '#8E94F2',
                    lineHeight: '1.8',
                    fontWeight: '300',
                    letterSpacing: '0.02em',
                    marginBottom: '2rem'
                  }}>
                    クロスプラットフォーム対応のモバイルアプリケーション開発。
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      padding: '0.3rem 0.8rem',
                      background: 'rgba(240, 243, 245, 0.1)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: '#F0F3F5',
                      border: '1px solid rgba(240, 243, 245, 0.3)'
                    }}>
                      React Native
                    </span>
                    <span style={{
                      padding: '0.3rem 0.8rem',
                      background: 'rgba(240, 243, 245, 0.1)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: '#F0F3F5',
                      border: '1px solid rgba(240, 243, 245, 0.3)'
                    }}>
                      TypeScript
                    </span>
                    <span style={{
                      padding: '0.3rem 0.8rem',
                      background: 'rgba(240, 243, 245, 0.1)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: '#F0F3F5',
                      border: '1px solid rgba(240, 243, 245, 0.3)'
                    }}>
                      Firebase
                    </span>
                </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technology セクション */}
          <section style={{ 
            marginBottom: '8rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '4rem 2rem'
          }}>
                <div style={{ 
                textAlign: 'center',
              marginBottom: '6rem',
              maxWidth: '800px'
            }}>
              <h2 style={{ 
                fontSize: '5rem', 
                fontWeight: '200',
                letterSpacing: '0.2em',
                margin: 0,
                color: '#F0F3F5',
                animation: 'fadeInUp 1s ease-out',
                textShadow: '0 0 60px rgba(240, 243, 245, 0.8), 0 0 100px rgba(0, 245, 212, 0.3)',
                filter: 'drop-shadow(0 0 20px rgba(240, 243, 245, 0.5))'
              }}>
                Technology
              </h2>
              <div style={{
                width: '150px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #00F5D4, #8E94F2, transparent)',
                margin: '3rem auto 0',
                borderRadius: '2px',
                animation: 'expandWidth 2s ease-out 0.5s both'
              }}></div>
              </div>
              
            {/* 技術スタック */}
            <div className="tech-grid" style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              maxWidth: '1000px',
              width: '100%',
              marginBottom: '4rem'
            }}>
              {/* フロントエンド */}
                <div className="tech-card" style={{ 
                padding: '3rem 2rem',
                background: 'rgba(0, 245, 212, 0.03)',
                  borderRadius: '20px',
                border: '1px solid rgba(0, 245, 212, 0.2)',
                backdropFilter: 'blur(40px)',
                  position: 'relative',
                  overflow: 'hidden',
                animation: 'fadeInUp 1s ease-out 0.2s both',
                boxShadow: '0 15px 40px rgba(0, 245, 212, 0.1)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                  height: '2px',
                    background: 'linear-gradient(90deg, transparent, #00F5D4, transparent)',
                    animation: 'shimmer 4s ease-in-out infinite'
                  }}></div>
                
                <div style={{ textAlign: 'center' }}>
                  <h3 className="tech-title" style={{ 
                    fontSize: '1.8rem', 
                    color: '#F0F3F5',
                    marginBottom: '1.5rem',
                    fontWeight: '200',
                    letterSpacing: '0.05em'
                  }}>
                    フロントエンド
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem'
                  }}>
                    <span className="tech-tag" style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(0, 245, 212, 0.1)',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      color: '#00F5D4',
                      border: '1px solid rgba(0, 245, 212, 0.3)'
                    }}>
                      React / Next.js
                    </span>
                    <span className="tech-tag" style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(0, 245, 212, 0.1)',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      color: '#00F5D4',
                      border: '1px solid rgba(0, 245, 212, 0.3)'
                    }}>
                      TypeScript
                    </span>
                    <span className="tech-tag" style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(0, 245, 212, 0.1)',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      color: '#00F5D4',
                      border: '1px solid rgba(0, 245, 212, 0.3)'
                    }}>
                      Three.js / R3F
                    </span>
                    <span className="tech-tag" style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(0, 245, 212, 0.1)',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      color: '#00F5D4',
                      border: '1px solid rgba(0, 245, 212, 0.3)'
                    }}>
                      Tailwind CSS
                    </span>
                  </div>
                </div>
              </div>

              {/* バックエンド */}
              <div className="tech-card" style={{ 
                padding: '3rem 2rem',
                background: 'rgba(142, 148, 242, 0.03)',
                borderRadius: '20px',
                border: '1px solid rgba(142, 148, 242, 0.2)',
                backdropFilter: 'blur(40px)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'fadeInUp 1s ease-out 0.4s both',
                boxShadow: '0 15px 40px rgba(142, 148, 242, 0.1)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #8E94F2, transparent)',
                  animation: 'shimmer 4s ease-in-out infinite 1s'
                }}></div>
                
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ 
                    fontSize: '1.8rem', 
                    color: '#F0F3F5',
                    marginBottom: '1.5rem',
                    fontWeight: '200',
                    letterSpacing: '0.05em'
                  }}>
                    バックエンド
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem'
                  }}>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(142, 148, 242, 0.1)',
                      borderRadius: '25px',
                    fontSize: '0.9rem',
                    color: '#8E94F2',
                      border: '1px solid rgba(142, 148, 242, 0.3)'
                    }}>
                      Node.js / Express
                    </span>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(142, 148, 242, 0.1)',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      color: '#8E94F2',
                      border: '1px solid rgba(142, 148, 242, 0.3)'
                    }}>
                      Python / Django
                    </span>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(142, 148, 242, 0.1)',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      color: '#8E94F2',
                      border: '1px solid rgba(142, 148, 242, 0.3)'
                    }}>
                      PostgreSQL
                    </span>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(142, 148, 242, 0.1)',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      color: '#8E94F2',
                      border: '1px solid rgba(142, 148, 242, 0.3)'
                    }}>
                      Redis
                    </span>
                  </div>
                </div>
              </div>

              {/* クラウド・インフラ */}
              <div className="tech-card" style={{ 
                padding: '3rem 2rem',
                background: 'rgba(240, 243, 245, 0.03)',
                borderRadius: '20px',
                border: '1px solid rgba(240, 243, 245, 0.2)',
                backdropFilter: 'blur(40px)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'fadeInUp 1s ease-out 0.6s both',
                boxShadow: '0 15px 40px rgba(240, 243, 245, 0.1)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                    background: 'linear-gradient(90deg, transparent, #F0F3F5, transparent)',
                    animation: 'shimmer 4s ease-in-out infinite 2s'
                  }}></div>
                
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ 
                    fontSize: '1.8rem', 
                    color: '#F0F3F5',
                    marginBottom: '1.5rem',
                    fontWeight: '200',
                    letterSpacing: '0.05em'
                  }}>
                    クラウド・インフラ
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem'
                  }}>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(240, 243, 245, 0.1)',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      color: '#F0F3F5',
                      border: '1px solid rgba(240, 243, 245, 0.3)'
                    }}>
                      AWS
                    </span>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(240, 243, 245, 0.1)',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      color: '#F0F3F5',
                      border: '1px solid rgba(240, 243, 245, 0.3)'
                    }}>
                      Docker
                    </span>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(240, 243, 245, 0.1)',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      color: '#F0F3F5',
                      border: '1px solid rgba(240, 243, 245, 0.3)'
                    }}>
                      Kubernetes
                    </span>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(240, 243, 245, 0.1)',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      color: '#F0F3F5',
                      border: '1px solid rgba(240, 243, 245, 0.3)'
                    }}>
                      Terraform
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 開発手法 */}
            <div className="tech-methodology" style={{ 
              padding: '4rem 3rem',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '24px',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              maxWidth: '800px',
              width: '100%',
              textAlign: 'center',
              animation: 'fadeInUp 1s ease-out 0.8s both'
            }}>
              <h3 style={{ 
                fontSize: '2.5rem', 
                    color: '#F0F3F5',
                marginBottom: '2rem',
                fontWeight: '200',
                letterSpacing: '0.05em'
              }}>
                アジャイル開発
              </h3>
              
              <p style={{ 
                fontSize: '1.2rem', 
                color: '#8E94F2',
                    lineHeight: '1.8',
                    fontWeight: '300',
                    letterSpacing: '0.02em',
                marginBottom: '2rem'
                  }}>
                継続的な改善とイテレーションを通じて、クライアントのニーズに最適化されたソリューションを提供します。
              </p>
              
                  <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center'
              }}>
                <span className="tech-methodology-tag" style={{
                  padding: '0.5rem 1.5rem',
                  background: 'rgba(0, 245, 212, 0.1)',
                  borderRadius: '30px',
                  fontSize: '0.9rem',
                  color: '#00F5D4',
                  border: '1px solid rgba(0, 245, 212, 0.3)'
                }}>
                  Scrum
                </span>
                <span className="tech-methodology-tag" style={{
                  padding: '0.5rem 1.5rem',
                  background: 'rgba(142, 148, 242, 0.1)',
                  borderRadius: '30px',
                    fontSize: '0.9rem',
                    color: '#8E94F2',
                  border: '1px solid rgba(142, 148, 242, 0.3)'
                }}>
                  CI/CD
                </span>
                <span className="tech-methodology-tag" style={{
                  padding: '0.5rem 1.5rem',
                  background: 'rgba(240, 243, 245, 0.1)',
                  borderRadius: '30px',
                  fontSize: '0.9rem',
                  color: '#F0F3F5',
                  border: '1px solid rgba(240, 243, 245, 0.3)'
                }}>
                  TDD
                </span>
                  </div>
            </div>
          </section>

          {/* Contact セクション */}
          <section style={{ 
            marginBottom: '8rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '4rem 2rem'
          }}>
                <div style={{ 
              textAlign: 'center', 
              marginBottom: '6rem',
              maxWidth: '800px'
            }}>
              <h2 style={{ 
                fontSize: '5rem', 
                fontWeight: '200',
                letterSpacing: '0.2em',
                margin: 0,
                color: '#F0F3F5',
                animation: 'fadeInUp 1s ease-out',
                textShadow: '0 0 60px rgba(240, 243, 245, 0.8), 0 0 100px rgba(0, 245, 212, 0.3)',
                filter: 'drop-shadow(0 0 20px rgba(240, 243, 245, 0.5))'
              }}>
                Contact
              </h2>
              <div style={{
                width: '150px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #00F5D4, #8E94F2, transparent)',
                margin: '3rem auto 0',
                borderRadius: '2px',
                animation: 'expandWidth 2s ease-out 0.5s both'
              }}></div>
            </div>

            {/* お問い合わせフォーム */}
            <div className="contact-grid" style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '4rem',
              maxWidth: '1000px',
              width: '100%'
            }}>
              {/* 連絡先情報 */}
              <div className="contact-info" style={{ 
                padding: '4rem 3rem',
                background: 'rgba(142, 148, 242, 0.03)',
                borderRadius: '24px',
                border: '1px solid rgba(142, 148, 242, 0.2)',
                backdropFilter: 'blur(40px)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'fadeInUp 1s ease-out 0.4s both',
                boxShadow: '0 20px 60px rgba(142, 148, 242, 0.1)'
              }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                  height: '2px',
                    background: 'linear-gradient(90deg, transparent, #8E94F2, transparent)',
                    animation: 'shimmer 4s ease-in-out infinite 1s'
                  }}></div>
                
                <h3 className="contact-info-title" style={{ 
                  fontSize: '2.2rem', 
                  color: '#F0F3F5',
                  marginBottom: '2rem',
                  fontWeight: '200',
                  letterSpacing: '0.05em',
                  textAlign: 'center'
                }}>
                  連絡先情報
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div className="contact-info-item" style={{ textAlign: 'center' }}>
                  <h4 style={{ 
                    color: '#8E94F2',
                    fontSize: '1.1rem',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    メールアドレス
                  </h4>
                  <p style={{ 
                    color: '#F0F3F5',
                    fontSize: '1rem',
                    fontWeight: '300'
                  }}>
                    work.ryuto.hatsuno@gmail.com
                  </p>
                </div>
                  <div style={{ textAlign: 'center' }}>
                    <h4 style={{ 
                      color: '#8E94F2', 
                      fontSize: '1.1rem', 
                      marginBottom: '0.5rem',
                      fontWeight: '500'
                    }}>
                      営業時間
                    </h4>
                    <p style={{ 
                      color: '#F0F3F5', 
                      fontSize: '1rem',
                      fontWeight: '300'
                    }}>
                      平日 9:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Blog/News セクション */}
          <BlogSection />
        </div>
      </div>
      </main>
    </>
  )
}
