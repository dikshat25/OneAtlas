import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const app = await prisma.app.findUnique({ where: { id } })
    if (!app) return NextResponse.json({ error: 'App not found' }, { status: 404 })

    const token = nanoid(12)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    const preview = await prisma.preview.create({
      data: {
        appId:     id,
        token,
        schema:    app.currentSchema as object,
        expiresAt,
      }
    })

    const previewUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/preview/${token}`

    return NextResponse.json({
      data: { previewUrl, token, expiresAt: preview.expiresAt }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create preview' }, { status: 500 })
  }
}
