'use client'

import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface TemplateModalProps {
  template: any
  isOpen: boolean
  onClose: () => void
}

export function TemplateModal({ template, isOpen, onClose }: TemplateModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !template) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div 
        className="relative bg-surface rounded-2xl shadow-2xl border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row z-10"
        role="dialog"
        aria-modal="true"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-secondary/80 text-muted hover:text-heading hover:bg-secondary transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mock App Preview (Left side) */}
        <div className="md:w-1/2 bg-sunken p-8 border-b md:border-b-0 md:border-r border-border flex items-center justify-center min-h-[300px]">
          <div className="w-full h-full max-h-[400px] rounded-xl bg-surface border border-border shadow-sm flex flex-col overflow-hidden">
             <div className="h-8 border-b border-border bg-elevated flex items-center px-3 gap-2">
                <div className="w-20 h-2.5 bg-border rounded-full" />
                <div className="w-6 h-2.5 bg-primary/20 rounded-full ml-auto" />
             </div>
             <div className="flex-1 flex p-3 gap-3">
                <div className="w-1/4 h-full bg-sunken rounded-md" />
                <div className="w-3/4 flex flex-col gap-3">
                  <div className="h-6 bg-sunken rounded-md w-1/3" />
                  <div className="h-24 bg-sunken rounded-md" />
                  <div className="h-24 bg-sunken rounded-md" />
                </div>
             </div>
          </div>
        </div>

        {/* Details (Right side) */}
        <div className="md:w-1/2 p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-tint text-primary">
              {template.category}
            </span>
            <div className="flex items-center gap-1.5 ml-auto text-sm font-medium text-muted">
              <div className={`w-2 h-2 rounded-full ${template.complexity === 'Simple' ? 'bg-green' : template.complexity === 'Moderate' ? 'bg-yellow' : 'bg-pink'}`} />
              {template.complexity}
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-heading mb-4">{template.name}</h2>
          <p className="text-body text-base leading-relaxed mb-8">
            {template.description}
          </p>
          
          <div className="mb-8">
            <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-3">Included Components</h3>
            <div className="flex flex-wrap gap-2">
              {/* Mock components since the template object might not have them */}
              {['Data Table', 'Analytics Dashboard', 'Form Builder', 'Role-based Access'].map(comp => (
                <span key={comp} className="px-3 py-1.5 rounded-lg text-sm bg-elevated border border-border text-secondary">
                  {comp}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-auto pt-6 border-t border-border flex items-center gap-4">
            <Button asChild className="flex-1 bg-primary hover:bg-primary/95 text-white shadow-sm">
              <Link href={`/builder?template=${template.id}`}>Use This Template</Link>
            </Button>
            <Button variant="outline" onClick={onClose} className="px-6">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
