import { NextRequest, NextResponse } from 'next/server'
import { blogService } from '@/lib/blog'

// 特定のブログ記事の取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = blogService.getPostById(params.id)
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: post
    })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

// ブログ記事の更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const updatedPost = blogService.updatePost(params.id, {
      ...body,
      id: params.id
    })

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedPost
    })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// ブログ記事の削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = blogService.deletePost(params.id)
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
