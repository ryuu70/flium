import { NextRequest, NextResponse } from 'next/server'
import { blogService } from '@/lib/blog'

// カテゴリ一覧の取得
export async function GET(request: NextRequest) {
  try {
    const categories = blogService.getAllCategories()
    
    return NextResponse.json({
      success: true,
      data: categories
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// カテゴリの作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    if (!body.name || !body.slug || !body.color) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newCategory = blogService.createCategory({
      name: body.name,
      slug: body.slug,
      color: body.color,
      description: body.description
    })

    return NextResponse.json({
      success: true,
      data: newCategory
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
