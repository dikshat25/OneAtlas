import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const template = await prisma.template.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }],
        isActive: true,
      },
    })
    if (!template) return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    return NextResponse.json({ data: template })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch template' }, { status: 500 })
  }
}
