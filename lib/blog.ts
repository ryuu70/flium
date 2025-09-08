import { BlogPost, BlogCategory, CreateBlogPostRequest, UpdateBlogPostRequest, BlogPostFilters } from './types/blog'
import fs from 'fs'
import path from 'path'

const BLOG_DATA_DIR = path.join(process.cwd(), 'data', 'blog')
const POSTS_FILE = path.join(BLOG_DATA_DIR, 'posts.json')
const CATEGORIES_FILE = path.join(BLOG_DATA_DIR, 'categories.json')

// 初期データの作成
const initializeBlogData = () => {
  if (!fs.existsSync(BLOG_DATA_DIR)) {
    fs.mkdirSync(BLOG_DATA_DIR, { recursive: true })
  }

  if (!fs.existsSync(POSTS_FILE)) {
    const initialPosts: BlogPost[] = [
      {
        id: '1',
        title: 'React 18の新機能とパフォーマンス向上',
        content: '# React 18の新機能とパフォーマンス向上\n\nReact 18で導入されたConcurrent FeaturesやSuspenseの活用方法について詳しく解説します。\n\n## Concurrent Features\n\nReact 18の最大の特徴は、Concurrent Featuresの導入です。これにより、アプリケーションの応答性が大幅に向上します。\n\n## Suspenseの活用\n\nSuspenseを使用することで、データの読み込み状態をより直感的に管理できます。',
        excerpt: 'React 18で導入されたConcurrent FeaturesやSuspenseの活用方法について詳しく解説します。',
        category: '技術',
        author: 'Flium Team',
        publishedAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        tags: ['React', 'JavaScript', 'フロントエンド'],
        featured: true,
        slug: 'react-18-new-features-performance',
        coverImage: '/images/blog/react-18.jpg'
      },
      {
        id: '2',
        title: '3Dデザインの未来とWeb体験',
        content: '# 3Dデザインの未来とWeb体験\n\nThree.jsを活用した3Dデザインの可能性と、ユーザー体験への影響について考察します。\n\n## Three.jsの活用\n\nThree.jsを使用することで、Web上で高度な3D体験を提供できます。\n\n## ユーザー体験の向上\n\n3Dデザインは、ユーザーの関心を引きつけ、より印象的な体験を提供します。',
        excerpt: 'Three.jsを活用した3Dデザインの可能性と、ユーザー体験への影響について考察します。',
        category: 'デザイン',
        author: 'Flium Team',
        publishedAt: '2024-01-10T00:00:00Z',
        updatedAt: '2024-01-10T00:00:00Z',
        tags: ['3D', 'デザイン', 'Three.js', 'Web体験'],
        featured: false,
        slug: '3d-design-future-web-experience',
        coverImage: '/images/blog/3d-design.jpg'
      },
      {
        id: '3',
        title: '新オフィス移転のお知らせ',
        content: '# 新オフィス移転のお知らせ\n\nより良い環境でクリエイティブな活動を行うため、新オフィスに移転いたしました。\n\n## 新オフィスの特徴\n\n- より広いスペース\n- 最新の設備\n- アクセスの良い立地\n\n## 今後の展望\n\n新オフィスでの活動を通じて、より良いサービスを提供していきます。',
        excerpt: 'より良い環境でクリエイティブな活動を行うため、新オフィスに移転いたしました。',
        category: '会社',
        author: 'Flium Team',
        publishedAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-05T00:00:00Z',
        tags: ['お知らせ', 'オフィス', '移転'],
        featured: false,
        slug: 'new-office-relocation-announcement',
        coverImage: '/images/blog/new-office.jpg'
      }
    ]
    fs.writeFileSync(POSTS_FILE, JSON.stringify(initialPosts, null, 2))
  }

  if (!fs.existsSync(CATEGORIES_FILE)) {
    const initialCategories: BlogCategory[] = [
      {
        id: '1',
        name: '技術',
        slug: 'technology',
        color: '#00F5D4',
        description: '技術に関する記事'
      },
      {
        id: '2',
        name: 'デザイン',
        slug: 'design',
        color: '#8E94F2',
        description: 'デザインに関する記事'
      },
      {
        id: '3',
        name: '会社',
        slug: 'company',
        color: '#F0F3F5',
        description: '会社に関するお知らせ'
      }
    ]
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(initialCategories, null, 2))
  }
}

// データの読み込み
const readPosts = (): BlogPost[] => {
  try {
    const data = fs.readFileSync(POSTS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

const readCategories = (): BlogCategory[] => {
  try {
    const data = fs.readFileSync(CATEGORIES_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading categories:', error)
    return []
  }
}

// データの保存
const savePosts = (posts: BlogPost[]) => {
  try {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2))
  } catch (error) {
    console.error('Error saving posts:', error)
    throw new Error('Failed to save posts')
  }
}

const saveCategories = (categories: BlogCategory[]) => {
  try {
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2))
  } catch (error) {
    console.error('Error saving categories:', error)
    throw new Error('Failed to save categories')
  }
}

// ユーティリティ関数
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// 公開API
export const blogService = {
  // 初期化
  initialize: initializeBlogData,

  // 記事の取得
  getAllPosts: (filters?: BlogPostFilters): BlogPost[] => {
    const posts = readPosts()
    let filteredPosts = [...posts]

    if (filters) {
      if (filters.category) {
        filteredPosts = filteredPosts.filter(post => post.category === filters.category)
      }
      if (filters.tag) {
        filteredPosts = filteredPosts.filter(post => post.tags.includes(filters.tag!))
      }
      if (filters.author) {
        filteredPosts = filteredPosts.filter(post => post.author === filters.author)
      }
      if (filters.featured !== undefined) {
        filteredPosts = filteredPosts.filter(post => post.featured === filters.featured)
      }
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm)
        )
      }
    }

    // 日付でソート（新しい順）
    filteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    return filteredPosts
  },

  getPostById: (id: string): BlogPost | null => {
    const posts = readPosts()
    return posts.find(post => post.id === id) || null
  },

  getPostBySlug: (slug: string): BlogPost | null => {
    const posts = readPosts()
    return posts.find(post => post.slug === slug) || null
  },

  // 記事の作成
  createPost: (postData: CreateBlogPostRequest): BlogPost => {
    const posts = readPosts()
    const newPost: BlogPost = {
      id: generateId(),
      ...postData,
      slug: generateSlug(postData.title),
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    posts.push(newPost)
    savePosts(posts)
    return newPost
  },

  // 記事の更新
  updatePost: (id: string, postData: UpdateBlogPostRequest): BlogPost | null => {
    const posts = readPosts()
    const postIndex = posts.findIndex(post => post.id === id)
    
    if (postIndex === -1) {
      return null
    }

    const updatedPost = {
      ...posts[postIndex],
      ...postData,
      updatedAt: new Date().toISOString()
    }

    // タイトルが変更された場合はスラッグも更新
    if (postData.title && postData.title !== posts[postIndex].title) {
      updatedPost.slug = generateSlug(postData.title)
    }

    posts[postIndex] = updatedPost
    savePosts(posts)
    return updatedPost
  },

  // 記事の削除
  deletePost: (id: string): boolean => {
    const posts = readPosts()
    const postIndex = posts.findIndex(post => post.id === id)
    
    if (postIndex === -1) {
      return false
    }

    posts.splice(postIndex, 1)
    savePosts(posts)
    return true
  },

  // カテゴリの取得
  getAllCategories: (): BlogCategory[] => {
    return readCategories()
  },

  getCategoryBySlug: (slug: string): BlogCategory | null => {
    const categories = readCategories()
    return categories.find(category => category.slug === slug) || null
  },

  // カテゴリの作成
  createCategory: (categoryData: Omit<BlogCategory, 'id'>): BlogCategory => {
    const categories = readCategories()
    const newCategory: BlogCategory = {
      id: generateId(),
      ...categoryData
    }
    
    categories.push(newCategory)
    saveCategories(categories)
    return newCategory
  }
}
