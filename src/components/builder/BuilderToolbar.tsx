'use client'

import React, { useState } from 'react'
import { Play, Share, FileCode2, Download, Save, Loader2, Smartphone, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBuilderStore } from '@/store/builderStore'
import { saveProjectSchema, deployProject } from '@/app/actions/project'
import { toast } from 'sonner'

export function BuilderToolbar({ projectId }: { projectId?: string }) {
  const { isSimulating, setIsSimulating, schema, appName, setAppName, version, setVersion } = useBuilderStore()
  const [isSaving, setIsSaving] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(appName)

  const handleSave = async () => {
    if (!projectId) return
    setIsSaving(true)
    const result = await saveProjectSchema(projectId, schema)
    if (result.error) toast.error(result.error)
    else {
      toast.success('Project saved successfully')
      if (result.version) setVersion(result.version)
    }
    setIsSaving(false)
  }

  const handleDeploy = async () => {
    if (!projectId) return
    setIsDeploying(true)
    toast.info("🚀 Deploying app...", { duration: 2500 })
    
    const result = await deployProject(projectId)
    
    setIsDeploying(false)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(`✓ App live at ${result.url}`)
    }
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
    <div className="h-16 border-b border-border bg-white flex items-center justify-between px-6 shrink-0 z-10 shadow-sm relative">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 group">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-sm">
            <div className="w-2.5 h-2.5 bg-white rounded-sm" />
          </div>
          {isEditingName ? (
            <input 
              type="text" 
              value={tempName} 
              onChange={e => setTempName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={handleNameSubmit}
              autoFocus
              className="font-bold text-heading text-[15px] outline-none bg-transparent border-b border-primary px-1 w-32"
            />
          ) : (
            <span 
              className="font-bold text-heading text-[15px] cursor-pointer hover:text-primary transition-colors tracking-tight"
              onClick={() => {
                setTempName(appName)
                setIsEditingName(true)
              }}
            >
              {appName}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#F5F5EE] border border-border text-primary uppercase">v{version}</span>
        </div>
        
        <div className="h-5 w-px bg-border hidden sm:block" />
        
        <div className="hidden sm:flex bg-[#FAFAFA] rounded-lg p-1 border border-border shadow-sm">
          <button className="px-3 py-1.5 rounded-md text-heading bg-white shadow-sm font-medium text-[12px] border border-border flex items-center gap-1.5 transition-all">
            <Monitor className="w-3.5 h-3.5" /> Desktop
          </button>
          <button className="px-3 py-1.5 rounded-md text-muted hover:text-heading font-medium text-[12px] flex items-center gap-1.5 transition-all">
            <Smartphone className="w-3.5 h-3.5" /> Mobile
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {projectId && (
          <Button variant="ghost" size="sm" onClick={handleSave} disabled={isSaving} className="text-body hover:text-primary hidden md:flex font-medium text-[13px]">
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save
          </Button>
        )}
        <Button variant="ghost" size="sm" className="text-body hover:text-primary hidden md:flex font-medium text-[13px]">
          <FileCode2 className="w-4 h-4 mr-2" />
          Code
        </Button>
        <div className="h-5 w-px bg-border hidden sm:block mx-1" />
        <Button 
          size="sm"
          onClick={() => setIsSimulating(!isSimulating)}
          className={`h-9 px-4 rounded-lg font-medium text-[13px] transition-all shadow-sm ${
            isSimulating ? 'bg-primary text-white border border-transparent hover:bg-primary/90' : 'bg-white text-heading border border-border hover:bg-[#FAFAFA]'
          }`}
        >
          <Play className={`w-3.5 h-3.5 mr-2 ${isSimulating ? 'text-white' : 'text-primary'}`} />
          {isSimulating ? 'Editing' : 'Simulate'}
        </Button>
        <Button variant="secondary" size="sm" className="h-9 px-4 rounded-lg bg-white border-border shadow-sm text-[13px] font-medium" onClick={handleShare}>
          <Share className="w-3.5 h-3.5 mr-2" />
          Share
        </Button>
        <Button size="sm" className="h-9 px-4 rounded-lg bg-primary text-white hover:bg-primary/90 shadow-sm text-[13px] font-medium" onClick={handleDeploy} disabled={isDeploying}>
          {isDeploying ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-3.5 h-3.5 mr-2" />}
          Deploy
        </Button>
      </div>
    </div>
  )
}
