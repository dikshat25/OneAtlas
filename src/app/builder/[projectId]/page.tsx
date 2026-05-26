import React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { BuilderToolbar } from '@/components/builder/BuilderToolbar'
import { BuilderSidebar } from '@/components/builder/BuilderSidebar'
import { BuilderCanvas } from '@/components/builder/BuilderCanvas'
import { BuilderProperties } from '@/components/builder/BuilderProperties'
import { BuilderChatStrip } from '@/components/builder/BuilderChatStrip'
import { BuilderStoreInitializer } from '@/components/builder/BuilderStoreInitializer'

export default async function BuilderPage({ params }: { params: Promise<{ projectId: string }> }) {
  const resolvedParams = await params
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user || !session.user.email) {
    return <div className="h-screen flex items-center justify-center bg-background text-heading font-medium">Please login to access the builder.</div>
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!dbUser) {
    return <div className="h-screen flex items-center justify-center bg-background text-heading font-medium">Invalid session. Please log out and log in again.</div>
  }

  const project = await prisma.app.findUnique({
    where: { id: resolvedParams.projectId }
  })

  if (!project || project.userId !== dbUser.id) {
    notFound()
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-background font-sans absolute inset-0 z-50">
      <BuilderStoreInitializer schema={project.currentSchema} projectId={project.id} />
      <BuilderToolbar projectId={project.id} />
      <div className="flex-1 flex overflow-hidden relative">
        <BuilderSidebar />
        <BuilderCanvas />
        <BuilderProperties />
        <BuilderChatStrip />
      </div>
    </div>
  )
}
