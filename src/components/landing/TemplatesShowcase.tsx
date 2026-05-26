'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { TemplateModal } from '../templates/TemplateModal'

export function TemplatesShowcase({ templates }: { templates: any[] }) {
  const [previewTemplate, setPreviewTemplate] = useState<any | null>(null)

  return (
    <section className="section-pad bg-background border-b border-border">
      <div className="layout">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="label mb-4">TEMPLATES</h2>
            <h3 className="section">Start from a template.<br />Own it immediately.</h3>
          </div>
          <Button variant="outline" asChild className="shrink-0 group hidden md:inline-flex">
            <Link href="/templates">
              View All Templates &rarr;
            </Link>
          </Button>
        </div>

        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 snap-x hide-scrollbar">
          {templates.slice(0, 5).map(template => (
            <div 
              key={template.id} 
              className="snap-start shrink-0 w-[320px] bg-white rounded-[24px] border border-border shadow-sm hover:shadow-xl hover:-translate-y-[2px] transition-all overflow-hidden flex flex-col"
            >
              {/* CSS Block Thumbnail */}
              <div className="h-[180px] bg-background border-b border-border p-4 flex flex-col gap-2 relative overflow-hidden group">
                <div className="h-2 w-full bg-white rounded-[4px] mb-1 flex items-center px-2 border border-border">
                  <div className="h-1 w-8 bg-muted rounded-full" />
                </div>
                <div className="flex-1 flex gap-2">
                  <div className="w-[60px] h-full bg-[#E5E5DD] rounded-[6px]" />
                  <div className="flex-1 h-full bg-white border border-border rounded-[6px] p-2 flex flex-col gap-1.5">
                    <div className="h-1 w-1/3 bg-[#E5E5DD] rounded-full mb-1" />
                    <div className="h-3 w-full bg-foreground opacity-[0.08] rounded-[2px]" />
                    <div className="h-3 w-full bg-foreground opacity-[0.08] rounded-[2px]" />
                    <div className="h-3 w-full bg-foreground opacity-[0.08] rounded-[2px]" />
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => setPreviewTemplate(template)}>
                  <Button variant="secondary" size="sm" className="pointer-events-none">Preview</Button>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-secondary border border-border text-foreground">
                    {template.category}
                  </span>
                  <div className="flex items-center gap-1.5 ml-auto text-[12px] font-medium text-muted">
                    <div className={`w-1.5 h-1.5 rounded-full ${template.complexity === 'Simple' ? 'bg-green-500' : template.complexity === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                    {template.complexity}
                  </div>
                </div>
                
                <h3 className="card-heading mb-1">{template.name}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-6 flex-1 line-clamp-2">
                  {template.description}
                </p>
                
                <div className="flex items-center gap-2 mt-auto">
                  <Button asChild className="flex-1 text-[14px] h-10">
                    <Link href={`/builder?template=${template.id}`}>Use Template</Link>
                  </Button>
                  <Button variant="ghost" className="flex-1 text-[14px] h-10 border border-transparent" onClick={() => setPreviewTemplate(template)}>
                    Preview &rarr;
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <TemplateModal 
        template={previewTemplate} 
        isOpen={!!previewTemplate} 
        onClose={() => setPreviewTemplate(null)} 
      />
    </section>
  )
}
