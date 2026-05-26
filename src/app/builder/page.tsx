import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export default async function BuilderIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string; appId?: string }>
}) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user || !session.user.email) {
    redirect('/api/auth/signin?callbackUrl=/builder')
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!dbUser) {
    redirect('/api/auth/signin?callbackUrl=/builder')
  }

  const resolvedSearchParams = await searchParams
  const appId = resolvedSearchParams.appId
  const templateId = resolvedSearchParams.template

  if (appId) {
    const app = await prisma.app.findUnique({
      where: { id: appId }
    })
    if (app && app.userId === dbUser.id) {
      redirect(`/builder/${app.id}`)
    }
  }

  if (templateId) {
    const template = await prisma.template.findFirst({
      where: { OR: [{ id: templateId }, { slug: templateId }] }
    })

    if (template) {
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
      redirect(`/builder/${app.id}`)
    }
  }

  // Create blank app if no template or appId
  const name = 'Untitled App'
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') +
               '-' + Date.now().toString(36)
  const initialSchema = { components: [] }

  const blankApp = await prisma.app.create({
    data: {
      name,
      slug,
      currentSchema: initialSchema,
      userId: dbUser.id,
      schemaVersion: 1,
      versions: {
        create: { version: 1, schema: initialSchema }
      }
    }
  })

  redirect(`/builder/${blankApp.id}`)
}
