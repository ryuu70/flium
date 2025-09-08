export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  category: string
  author: string
  publishedAt: string
  updatedAt: string
  tags: string[]
  featured: boolean
  slug: string
  coverImage?: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  color: string
  description?: string
}

export interface CreateBlogPostRequest {
  title: string
  content: string
  excerpt: string
  category: string
  author: string
  tags: string[]
  featured: boolean
  coverImage?: string
}

export interface UpdateBlogPostRequest extends Partial<CreateBlogPostRequest> {
  id: string
}

export interface BlogPostFilters {
  category?: string
  tag?: string
  author?: string
  featured?: boolean
  search?: string
  page?: number
  limit?: number
}
