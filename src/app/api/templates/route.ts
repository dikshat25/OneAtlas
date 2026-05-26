import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category   = searchParams.get('category')
    const complexity = searchParams.get('complexity')
    const q          = searchParams.get('q')
    const sort       = searchParams.get('sort') || 'newest'
    const page       = parseInt(searchParams.get('page') || '1')
    const limit      = parseInt(searchParams.get('limit') || '20')

    const where: any = { isActive: true }
    if (category)   where.category   = { contains: category, mode: 'insensitive' }
    if (complexity) where.complexity = complexity
    if (q)          where.OR = [
      { name:        { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { tags:        { has: q.toLowerCase() } },
    ]

    const orderBy: any =
      sort === 'name'       ? { name: 'asc' } :
      sort === 'complexity' ? { complexity: 'asc' } :
      { createdAt: 'desc' }

    const [templates, total] = await Promise.all([
      prisma.template.findMany({
        where, orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.template.count({ where }),
    ])

    return NextResponse.json({
      data: templates,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('[GET /api/templates]', error)
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 })
  }
}
