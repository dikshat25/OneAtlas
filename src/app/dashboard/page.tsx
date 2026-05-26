import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Layout } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) {
    return (
      <div className="min-h-screen pt-32 px-4 flex justify-center bg-page text-heading font-medium">
        Please login to view your apps.
      </div>
    )
  }

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-page pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-heading">My Apps</h1>
        <Button asChild className="bg-gradient-brand text-white border-0 hover:-translate-y-0.5 transition-transform">
          <Link href="/templates">
            <Plus className="w-4 h-4 mr-2" /> New App
          </Link>
        </Button>
      </div>
      
      {projects.length === 0 ? (
        <div className="h-64 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted">
          <Layout className="w-8 h-8 mb-4 opacity-50" />
          <p>You haven't built any apps yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/builder/${project.id}`} className="group p-6 rounded-xl border border-border hover:border-primary transition-colors bg-secondary/50 flex flex-col h-48">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Layout className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-heading group-hover:text-primary transition-colors truncate">{project.name}</h3>
              </div>
              <div className="mt-auto text-sm text-muted">
                Last updated {new Date(project.updatedAt).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

