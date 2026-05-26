import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const CreateAppSchema = z.object({
  name:       z.string().min(1).max(100),
  templateId: z.string().optional(),
  prompt:     z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!dbUser) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    const body   = await req.json()
    const parsed = CreateAppSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { name, templateId } = parsed.data

    let initialSchema = { components: [] }
    let template = null

    if (templateId) {
      template = await prisma.template.findFirst({
        where: { OR: [{ id: templateId }, { slug: templateId }] }
      })
      if (template) initialSchema = template.schemaDefault as any
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') +
                 '-' + Date.now().toString(36)

    const app = await prisma.app.create({
      data: {
        name,
        slug,
        userId:        dbUser.id,
        templateId:    template?.id,
        currentSchema: initialSchema,
        schemaVersion: 1,
        versions: {
          create: { version: 1, schema: initialSchema }
        }
      },
      include: { template: true, versions: true }
    })

    return NextResponse.json({ data: app }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/apps]', error)
    return NextResponse.json({ error: 'Failed to create app' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!dbUser) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    const apps = await prisma.app.findMany({
      where: { userId: dbUser.id },
      include: { template: { select: { name: true, category: true } } },
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json({ data: apps })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch apps' }, { status: 500 })
  }
}
