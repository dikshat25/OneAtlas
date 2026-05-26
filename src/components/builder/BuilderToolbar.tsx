'use client'

import React, { useState } from 'react'
import { Play, Share, FileCode2, Download, Save, Loader2, Smartphone, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBuilderStore } from '@/store/builderStore'
import { saveProjectSchema } from '@/app/actions/project'
import { toast } from 'sonner'

export function BuilderToolbar({ projectId }: { projectId?: string }) {
  const { isSimulating, setIsSimulating, rootNode, appName, setAppName, version } = useBuilderStore()
  const [isSaving, setIsSaving] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(appName)

  const handleSave = async () => {
    if (!projectId) return
    setIsSaving(true)
    const result = await saveProjectSchema(projectId, rootNode)
    if (result.error) alert(result.error)
    setIsSaving(false)
  }

  const handleDeploy = async () => {
    setIsDeploying(true)
    toast.info("🚀 Deploying app...", { duration: 2500 })
    await new Promise(resolve => setTimeout(resolve, 2500))
    setIsDeploying(false)
    toast.success(`✓ App live at ${appName.toLowerCase().replace(/\s+/g, '-')}.oneatlas.app`)
  }

  const handleShare = () => {
    toast.success("Copied URL to clipboard")
  }

  const handleNameSubmit = (e: React.KeyboardEvent | React.FocusEvent) => {
    if ('key' in e && e.key !== 'Enter') return
    setAppName(tempName || 'Untitled App')
    setIsEditingName(false)
  }

  return (
    <div className="h-14 border-b border-border bg-surface flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded bg-[#111111] flex items-center justify-center text-white font-bold text-xs">O</div>
          {isEditingName ? (
            <input 
              type="text" 
              value={tempName} 
              onChange={e => setTempName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={handleNameSubmit}
              autoFocus
              className="font-bold text-heading text-sm outline-none bg-transparent border-b border-primary px-1"
            />
          ) : (
            <span 
              className="font-bold text-heading text-sm cursor-pointer hover:bg-secondary px-1 rounded transition-colors"
              onClick={() => {
                setTempName(appName)
                setIsEditingName(true)
              }}
            >
              {appName}
            </span>
          )}
          <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F5F5EE] border border-[#E5E7EB] text-[#FF6600] uppercase">v{version}</span>
        </div>
        <div className="h-4 w-px bg-border mx-2" />
        <div className="flex bg-[#FAFAFA] rounded-md p-1 border border-border">
          <button className="px-2 py-1 rounded text-[#111111] bg-white shadow-sm font-medium text-xs border border-[#ECECEC]">
            <Monitor className="w-3.5 h-3.5 inline-block mr-1" /> Desktop
          </button>
          <button className="px-2 py-1 rounded text-muted hover:text-heading font-medium text-xs">
            <Smartphone className="w-3.5 h-3.5 inline-block mr-1" /> Mobile
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {projectId && (
          <Button variant="ghost" size="sm" onClick={handleSave} disabled={isSaving} className="text-body hover:text-primary hidden md:flex">
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save
          </Button>
        )}
        <Button variant="ghost" size="sm" className="text-body hover:text-primary hidden md:flex">
          <FileCode2 className="w-4 h-4 mr-2" />
          Code
        </Button>
        <Button 
          variant={isSimulating ? 'default' : 'secondary'}
          size="sm"
          onClick={() => setIsSimulating(!isSimulating)}
          className={`h-9 px-3 ${isSimulating ? 'bg-[#FF6600] text-white' : 'bg-white text-[#111111]'}`}
        >
          <Play className="w-4 h-4 mr-2" />
          {isSimulating ? 'Editing' : 'Simulate'}
        </Button>
        <Button variant="secondary" size="sm" className="h-9 px-3" onClick={handleShare}>
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button size="sm" className="h-9 px-3 bg-[#FF6600] text-white hover:bg-[#E65C00]" onClick={handleDeploy} disabled={isDeploying}>
          {isDeploying ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
          Deploy
        </Button>
      </div>
    </div>
  )
}

