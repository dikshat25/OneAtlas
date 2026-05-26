import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const MutationSchema = z.object({
  instruction: z.string().min(1),
  type: z.enum(['add_field','remove_field','rename_field','update_component_prop','reorder_components']).optional(),
})

function parseMutation(instruction: string) {
  const lower = instruction.toLowerCase()
  if (lower.includes('add'))            return { type: 'add_field',              label: 'Added field' }
  if (lower.includes('remove') || lower.includes('delete')) return { type: 'remove_field', label: 'Removed field' }
  if (lower.includes('rename'))         return { type: 'rename_field',           label: 'Renamed field' }
  if (lower.includes('move') || lower.includes('reorder'))  return { type: 'reorder_components', label: 'Reordered components' }
  if (lower.includes('update') || lower.includes('change')) return { type: 'update_component_prop', label: 'Updated property' }
  return { type: 'update_component_prop', label: 'Applied edit' }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body   = await req.json()
    const parsed = MutationSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const { instruction } = parsed.data
    const mutation = parseMutation(instruction)

    const result = await prisma.$transaction(async (tx) => {
      const app = await tx.app.findUnique({ where: { id } })
      if (!app) throw new Error('App not found')

      const newVersion = app.schemaVersion + 1

      const updatedApp = await tx.app.update({
        where: { id },
        data: {
          schemaVersion: newVersion,
          updatedAt: new Date(),
          versions: {
            create: { version: newVersion, schema: app.currentSchema as object }
          },
          mutations: {
            create: {
              instruction,
              type:    mutation.type,
              result:  `${mutation.label}. Schema updated to v${newVersion}.`,
              version: newVersion,
            }
          }
        }
      })

      return updatedApp
    })

    return NextResponse.json({
      data: result,
      message: `${mutation.label}. Schema updated to v${result.schemaVersion}.`
    })
  } catch (error) {
    console.error('[POST /api/apps/[id]/mutate]', error)
    return NextResponse.json({ error: 'Mutation failed' }, { status: 500 })
  }
}
