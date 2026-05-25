import React from 'react'
import { BuilderToolbar } from '@/components/builder/BuilderToolbar'
import { BuilderSidebar } from '@/components/builder/BuilderSidebar'
import { BuilderCanvas } from '@/components/builder/BuilderCanvas'
import { BuilderProperties } from '@/components/builder/BuilderProperties'
import { BuilderChatStrip } from '@/components/builder/BuilderChatStrip'

export default function BuilderPage() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-background font-sans absolute inset-0 z-50">
      <BuilderToolbar />
      <div className="flex-1 flex overflow-hidden relative">
        <BuilderSidebar />
        <BuilderCanvas />
        <BuilderProperties />
        <BuilderChatStrip />
      </div>
    </div>
  )
}
