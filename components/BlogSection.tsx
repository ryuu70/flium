'use client'

import { useState, useEffect } from 'react'
import { BlogPost, BlogCategory } from '@/lib/types/blog'

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  // データの読み込み
  const fetchData = async () => {
    try {
      setLoading(true)
      const [postsRes, categoriesRes] = await Promise.all([
        fetch('/api/blog/posts'),
        fetch('/api/blog/categories')
      ])
      
      const postsData = await postsRes.json()
      const categoriesData = await categoriesRes.json()
      
      if (postsData.success) {
        setPosts(postsData.data)
      }
      if (categoriesData.success) {
        setCategories(categoriesData.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // カテゴリでフィルタリング
  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.category === selectedCategory)
    : posts

  // カテゴリの色を取得
  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName)
    return category?.color || '#00F5D4'
  }

  // 日付のフォーマット
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '.')
  }

  if (loading) {
    return (
      <section style={{ 
        marginBottom: '8rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '4rem 2rem'
      }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-white">読み込み中...</p>
      </section>
    )
  }

  return (
    <>
      {/* Blog/News セクション */}
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
            Blog & News
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


        {/* カテゴリフィルター */}
        <div style={{ 
          marginBottom: '3rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setSelectedCategory('')}
            style={{
              padding: '0.5rem 1.5rem',
              background: selectedCategory === '' ? 'rgba(0, 245, 212, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              border: selectedCategory === '' ? '1px solid rgba(0, 245, 212, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '25px',
              color: '#F0F3F5',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            すべて
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              style={{
                padding: '0.5rem 1.5rem',
                background: selectedCategory === category.name ? `${category.color}20` : 'rgba(255, 255, 255, 0.1)',
                border: selectedCategory === category.name ? `1px solid ${category.color}50` : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '25px',
                color: '#F0F3F5',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 記事一覧 */}
        <div className="blog-grid" style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '3rem',
          maxWidth: '1200px',
          width: '100%'
        }}>
          {filteredPosts.map((post, index) => {
            const categoryColor = getCategoryColor(post.category)
            return (
              <div
                key={post.id}
                className="blog-card"
                style={{ 
                  padding: '3rem 2.5rem',
                  background: `${categoryColor}03`,
                  borderRadius: '20px',
                  border: `1px solid ${categoryColor}20`,
                  backdropFilter: 'blur(40px)',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `fadeInUp 1s ease-out ${0.2 + index * 0.2}s both`,
                  boxShadow: `0 15px 40px ${categoryColor}10`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = `0 25px 50px ${categoryColor}20`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = `0 15px 40px ${categoryColor}10`
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${categoryColor}, transparent)`,
                  animation: 'shimmer 4s ease-in-out infinite'
                }}></div>
                
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.3rem 0.8rem',
                    background: `${categoryColor}10`,
                    borderRadius: '20px',
                    marginBottom: '1.5rem',
                    border: `1px solid ${categoryColor}30`
                  }}>
                    <span style={{
                      fontSize: '0.8rem',
                      color: categoryColor,
                      fontWeight: '500',
                      letterSpacing: '0.05em'
                    }}>
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '1.8rem', 
                    color: '#F0F3F5',
                    marginBottom: '1rem',
                    fontWeight: '200',
                    letterSpacing: '0.05em',
                    lineHeight: '1.3'
                  }}>
                    {post.title}
                  </h3>
                  
                  <p style={{ 
                    fontSize: '1rem', 
                    color: '#8E94F2',
                    lineHeight: '1.6',
                    fontWeight: '300',
                    letterSpacing: '0.02em',
                    marginBottom: '1.5rem'
                  }}>
                    {post.excerpt}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.9rem',
                    color: '#8E94F2'
                  }}>
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>→</span>
                  </div>

                  {/* タグ */}
                  {post.tags.length > 0 && (
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginTop: '1rem'
                    }}>
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          style={{
                            padding: '0.2rem 0.6rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            fontSize: '0.7rem',
                            color: '#8E94F2'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* 記事がない場合 */}
        {filteredPosts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#8E94F2'
          }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              {selectedCategory ? `${selectedCategory}カテゴリの記事はありません` : '記事がありません'}
            </p>
          </div>
        )}

        {/* もっと見るボタン */}
        {filteredPosts.length > 0 && (
          <div style={{ 
            marginTop: '4rem',
            textAlign: 'center'
          }}>
            <button style={{
              padding: '1rem 3rem',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50px',
              color: '#F0F3F5',
              fontSize: '1.1rem',
              fontWeight: '300',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 245, 212, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(0, 245, 212, 0.3)'
              e.currentTarget.style.color = '#00F5D4'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.color = '#F0F3F5'
            }}
            >
              もっと見る
            </button>
          </div>
        )}
      </section>

    </>
  )
}
