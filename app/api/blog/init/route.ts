import { NextResponse } from 'next/server'
import { blogService } from '@/lib/blog'

// ブログデータの初期化
export async function POST() {
  try {
    blogService.initialize()
    
    return NextResponse.json({
      success: true,
      message: 'Blog data initialized successfully'
    })
  } catch (error) {
    console.error('Error initializing blog data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to initialize blog data' },
      { status: 500 }
    )
  }
}
