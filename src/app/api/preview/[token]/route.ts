import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await params
    const preview = await prisma.preview.findUnique({
      where: { token },
      include: { app: { select: { name: true, slug: true } } }
    })

    if (!preview) return NextResponse.json({ error: 'Preview not found' }, { status: 404 })

    if (preview.expiresAt && preview.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Preview link has expired' }, { status: 410 })
    }

    return NextResponse.json({ data: preview })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch preview' }, { status: 500 })
  }
}
