import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export default async function BuilderIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>
}) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) {
    redirect('/api/auth/signin?callbackUrl=/builder')
  }

  const resolvedSearchParams = await searchParams
  const templateId = resolvedSearchParams.template

  if (templateId) {
    const template = await prisma.template.findUnique({
      where: { id: templateId }
    })

    if (template) {
      const project = await prisma.project.create({
        data: {
          name: `${template.name} App`,
          schema: template.schema,
          userId: session.user.id,
          templateId: template.id,
        }
      })
      redirect(`/builder/${project.id}`)
    }
  }

  // Create blank project if no template
  const blankProject = await prisma.project.create({
    data: {
      name: 'Untitled App',
      schema: { nodes: [], edges: [] },
      userId: session.user.id,
    }
  })

  redirect(`/builder/${blankProject.id}`)
}
