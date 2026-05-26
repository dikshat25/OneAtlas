'use server'

import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function createProjectFromTemplate(templateId: string) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user || !session.user.email) {
    return { error: 'You must be logged in to create a project.' }
  }

  // Ensure user still exists in database (prevents foreign key errors from stale JWT cookies)
  const dbUser = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!dbUser) {
    return { error: 'Invalid session. The user does not exist in the database. Please log out and log in again.' }
  }

  const template = await prisma.template.findFirst({
    where: { OR: [{ id: templateId }, { slug: templateId }] }
  })

  if (!template) {
    return { error: 'Template not found.' }
  }

  const name = `${template.name} App`
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') +
               '-' + Date.now().toString(36)

  const app = await prisma.app.create({
    data: {
      name,
      slug,
      currentSchema: template.schemaDefault as any,
      userId: dbUser.id,
      templateId: template.id,
      schemaVersion: 1,
      versions: {
        create: { version: 1, schema: template.schemaDefault as any }
      }
    }
  })

  return { projectId: app.id }
}

export async function saveProjectSchema(projectId: string, schema: any) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user || !session.user.email) {
    return { error: 'You must be logged in to save.' }
  }

  const dbUser = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!dbUser) {
    return { error: 'Invalid session.' }
  }

  const app = await prisma.app.findUnique({
    where: { id: projectId }
  })

  if (!app || app.userId !== dbUser.id) {
    return { error: 'Unauthorized.' }
  }

  const newVersion = app.schemaVersion + 1

  await prisma.app.update({
    where: { id: projectId },
    data: { 
      currentSchema: schema,
      schemaVersion: newVersion,
      versions: {
        create: {
          version: newVersion,
          schema: schema
        }
      }
    }
  })

  return { success: true, version: newVersion }
}

export async function deployProject(projectId: string) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user || !session.user.email) {
    return { error: 'You must be logged in to deploy.' }
  }

  const dbUser = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!dbUser) {
    return { error: 'Invalid session.' }
  }

  const app = await prisma.app.findUnique({
    where: { id: projectId }
  })

  if (!app || app.userId !== dbUser.id) {
    return { error: 'Unauthorized.' }
  }

  const url = `https://${app.slug}.oneatlas.app`

  await prisma.deployment.create({
    data: {
      appId: projectId,
      version: app.schemaVersion,
      status: 'success',
      url: url
    }
  })
  
  return { success: true, url }
}
