'use client'

import React, { useState } from 'react'
import { TemplatesHeader } from '@/components/templates/TemplatesHeader'
import { TemplatesGrid } from '@/components/templates/TemplatesGrid'

export function TemplatesClient({ templates }: { templates: any[] }) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TemplatesHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TemplatesGrid searchQuery={searchQuery} templates={templates} />
    </div>
  )
}
