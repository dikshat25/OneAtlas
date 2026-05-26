export const dynamic = 'force-dynamic';
import React, { Suspense } from 'react'
import prisma from '@/lib/prisma'
import { TemplatesClient } from '@/components/templates/TemplatesClient'

export default async function TemplatesPage() {
  const templates = await prisma.template.findMany()

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading templates...</div>}>
      <TemplatesClient templates={templates} />
    </Suspense>
  )
}
