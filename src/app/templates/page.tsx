'use client'

import React, { useState, Suspense } from 'react'
import { TemplatesHeader } from '@/components/templates/TemplatesHeader'
import { TemplatesGrid } from '@/components/templates/TemplatesGrid'

function TemplatesContent() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TemplatesHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TemplatesGrid searchQuery={searchQuery} />
    </div>
  )
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading templates...</div>}>
      <TemplatesContent />
    </Suspense>
  )
}
