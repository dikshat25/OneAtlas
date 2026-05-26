import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const app = await prisma.app.findUnique({
      where: { id },
      include: {
        template: true,
        versions: { orderBy: { version: 'desc' }, take: 10 },
        mutations: { orderBy: { createdAt: 'desc' }, take: 20 },
      }
    })
    if (!app) return NextResponse.json({ error: 'App not found' }, { status: 404 })
    return NextResponse.json({ data: app })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch app' }, { status: 500 })
  }
}
