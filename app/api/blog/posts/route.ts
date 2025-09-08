import { NextRequest, NextResponse } from 'next/server'
import { blogService } from '@/lib/blog'

// ブログ記事一覧の取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters = {
      category: searchParams.get('category') || undefined,
      tag: searchParams.get('tag') || undefined,
      author: searchParams.get('author') || undefined,
      featured: searchParams.get('featured') === 'true' ? true : undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    }

    const posts = blogService.getAllPosts(filters)
    
    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// ブログ記事の作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    if (!body.title || !body.content || !body.excerpt || !body.category || !body.author) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newPost = blogService.createPost({
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      category: body.category,
      author: body.author,
      tags: body.tags || [],
      featured: body.featured || false,
      coverImage: body.coverImage
    })

    return NextResponse.json({
      success: true,
      data: newPost
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
