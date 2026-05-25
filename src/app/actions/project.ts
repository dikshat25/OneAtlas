'use server'

import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function createProjectFromTemplate(templateId: string) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) {
    return { error: 'You must be logged in to create a project.' }
  }

  const template = await prisma.template.findUnique({
    where: { id: templateId }
  })

  if (!template) {
    return { error: 'Template not found.' }
  }

  const project = await prisma.project.create({
    data: {
      name: `${template.name} App`,
      schema: template.schema,
      userId: session.user.id as string,
      templateId: template.id,
    }
  })

  return { projectId: project.id }
}

export async function saveProjectSchema(projectId: string, schema: any) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) {
    return { error: 'You must be logged in to save.' }
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId }
  })

  if (!project || project.userId !== session.user.id) {
    return { error: 'Unauthorized.' }
  }

  await prisma.project.update({
    where: { id: projectId },
    data: { schema }
  })

  return { success: true }
}
