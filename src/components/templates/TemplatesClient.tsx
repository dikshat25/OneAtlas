'use client'

import React from 'react'
import { TemplatesHeader } from '@/components/templates/TemplatesHeader'
import { TemplatesGrid } from '@/components/templates/TemplatesGrid'

export function TemplatesClient({ templates }: { templates: any[] }) {
  return (
    <div className="min-h-screen bg-page flex flex-col">
      <TemplatesHeader />
      <TemplatesGrid templates={templates} />
    </div>
  )
}

