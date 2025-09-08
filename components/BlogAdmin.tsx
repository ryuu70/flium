'use client'

import { useState, useEffect } from 'react'
import { BlogPost, BlogCategory, CreateBlogPostRequest } from '@/lib/types/blog'
import { Plus, Edit, Trash2, Save, X, Eye } from 'lucide-react'
import MarkdownRenderer from './MarkdownRenderer'

interface BlogAdminProps {
  onClose: () => void
}

export default function BlogAdmin({ onClose }: BlogAdminProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [previewMode, setPreviewMode] = useState(false)

  // フォームの状態
  const [formData, setFormData] = useState<CreateBlogPostRequest>({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    author: '',
    tags: [],
    featured: false,
    coverImage: ''
  })

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

  // フォームのリセット
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: '',
      author: '',
      tags: [],
      featured: false,
      coverImage: ''
    })
    setIsEditing(false)
    setIsCreating(false)
    setEditingPost(null)
    setPreviewMode(false)
  }

  // 記事の作成
  const handleCreate = async () => {
    try {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      
      if (result.success) {
        await fetchData()
        resetForm()
      } else {
        alert('記事の作成に失敗しました: ' + result.error)
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert('記事の作成に失敗しました')
    }
  }

  // 記事の更新
  const handleUpdate = async () => {
    if (!editingPost) return

    try {
      const response = await fetch(`/api/blog/posts/${editingPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      
      if (result.success) {
        await fetchData()
        resetForm()
      } else {
        alert('記事の更新に失敗しました: ' + result.error)
      }
    } catch (error) {
      console.error('Error updating post:', error)
      alert('記事の更新に失敗しました')
    }
  }

  // 記事の削除
  const handleDelete = async (id: string) => {
    if (!confirm('この記事を削除しますか？')) return

    try {
      const response = await fetch(`/api/blog/posts/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()
      
      if (result.success) {
        await fetchData()
      } else {
        alert('記事の削除に失敗しました: ' + result.error)
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('記事の削除に失敗しました')
    }
  }

  // 編集開始
  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      author: post.author,
      tags: post.tags,
      featured: post.featured,
      coverImage: post.coverImage || ''
    })
    setIsEditing(true)
  }

  // 新規作成開始
  const handleCreateNew = () => {
    resetForm()
    setIsCreating(true)
  }

  // タグの追加
  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
    }
  }

  // タグの削除
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-center">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">ブログ管理</h2>
          <div className="flex gap-2">
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              新規作成
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <X className="w-4 h-4" />
              閉じる
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* 記事一覧 */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {post.category}
                        </span>
                        {post.featured && (
                          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                            注目
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>著者: {post.author}</span>
                        <span>作成日: {new Date(post.publishedAt).toLocaleDateString('ja-JP')}</span>
                        <span>更新日: {new Date(post.updatedAt).toLocaleDateString('ja-JP')}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 編集フォーム */}
          {(isEditing || isCreating) && (
            <div className="w-1/2 border-l p-6 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">
                {isEditing ? '記事の編集' : '新規記事の作成'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">タイトル</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="記事のタイトルを入力"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">要約</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 h-20"
                    placeholder="記事の要約を入力"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">カテゴリ</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">カテゴリを選択</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">著者</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="著者名を入力"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">タグ</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addTag(e.currentTarget.value)
                        e.currentTarget.value = ''
                      }
                    }}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="タグを入力してEnterキーで追加"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium">本文</label>
                    <button
                      type="button"
                      onClick={() => setPreviewMode(!previewMode)}
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    >
                      <Eye className="w-3 h-3" />
                      {previewMode ? '編集' : 'プレビュー'}
                    </button>
                  </div>
                  
                  {previewMode ? (
                    <div className="w-full border rounded-lg px-3 py-2 h-40 overflow-y-auto bg-gray-50">
                      <MarkdownRenderer content={formData.content} />
                    </div>
                  ) : (
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2 h-40"
                      placeholder="記事の本文を入力（Markdown形式）"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">カバー画像URL</label>
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="mr-2"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">
                    注目記事として表示
                  </label>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={isEditing ? handleUpdate : handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Save className="w-4 h-4" />
                    {isEditing ? '更新' : '作成'}
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
