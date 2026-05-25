'use client'

import React, { useState, Suspense } from 'react'
import { TemplatesHeader } from '@/components/templates/TemplatesHeader'
import { TemplatesGrid } from '@/components/templates/TemplatesGrid'
import prisma from '@/lib/prisma'

function TemplatesContent({ templates }: { templates: any[] }) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TemplatesHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TemplatesGrid searchQuery={searchQuery} templates={templates} />
    </div>
  )
}

export default async function TemplatesPage() {
  const templates = await prisma.template.findMany()

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading templates...</div>}>
      <TemplatesContent templates={templates} />
    </Suspense>
  )
}
