'use client'

import React from 'react'
import { Play, Share, Download, Smartphone, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBuilderStore } from '@/store/builderStore'

export function BuilderToolbar() {
  const { isSimulating, setIsSimulating } = useBuilderStore()

  return (
    <div className="h-14 border-b border-border bg-white flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-brand flex items-center justify-center text-white font-bold text-xs">O</div>
          <span className="font-bold text-heading text-sm">CRM Workspace</span>
        </div>
        <div className="h-4 w-px bg-border mx-2" />
        <div className="flex bg-secondary rounded-md p-1 border border-border">
          <button className="px-2 py-1 rounded text-primary bg-white shadow-sm font-medium text-xs">
            <Monitor className="w-3.5 h-3.5 inline-block mr-1" /> Desktop
          </button>
          <button className="px-2 py-1 rounded text-muted hover:text-heading font-medium text-xs">
            <Smartphone className="w-3.5 h-3.5 inline-block mr-1" /> Mobile
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant={isSimulating ? 'default' : 'outline'}
          size="sm"
          onClick={() => setIsSimulating(!isSimulating)}
          className={isSimulating ? 'bg-green hover:bg-green/90 text-white' : ''}
        >
          <Play className="w-4 h-4 mr-2" />
          {isSimulating ? 'Editing' : 'Simulate'}
        </Button>
        <Button variant="outline" size="sm">
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button size="sm" className="bg-gradient-brand text-white">
          <Download className="w-4 h-4 mr-2" />
          Deploy
        </Button>
      </div>
    </div>
  )
}
