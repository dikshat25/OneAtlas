'use client'

import React from 'react'
import { templates } from '@/data/templates'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function TemplatesShowcase() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-3">Start from a template. Own it immediately.</h2>
            <p className="text-lg text-body max-w-2xl">Every app starts from a vetted, reusable template that generates a complete operational schema.</p>
          </div>
          <Button variant="outline" asChild className="shrink-0 group">
            <Link href="/templates">
              View All Templates
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 snap-x hide-scrollbar">
          {templates.slice(0, 5).map(template => (
            <div 
              key={template.id} 
              className="snap-start shrink-0 w-[320px] sm:w-[380px] bg-white rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all overflow-hidden flex flex-col"
            >
              <div className="h-40 bg-secondary border-b border-border p-4 relative overflow-hidden group">
                <div className="absolute inset-4 rounded-lg bg-white border border-border shadow-sm overflow-hidden flex flex-col">
                  {/* Mock Abstract Thumbnail */}
                  <div className="h-6 border-b border-border bg-secondary flex items-center px-2 gap-2">
                    <div className="w-16 h-2 bg-border rounded-full" />
                    <div className="w-4 h-2 bg-primary/20 rounded-full ml-auto" />
                  </div>
                  <div className="flex-1 flex p-2 gap-2">
                    <div className="w-1/4 h-full bg-secondary rounded-sm" />
                    <div className="w-3/4 flex flex-col gap-2">
                      <div className="h-4 bg-secondary rounded-sm" />
                      <div className="h-10 bg-secondary rounded-sm" />
                      <div className="h-10 bg-secondary rounded-sm" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-navy/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="sm" className="bg-white/90 shadow-sm pointer-events-none">Preview App</Button>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-lavender/50 text-primary">
                    {template.category}
                  </span>
                  <div className="flex items-center gap-1.5 ml-auto text-xs font-medium text-muted">
                    <div className={`w-2 h-2 rounded-full ${template.complexity === 'Simple' ? 'bg-green' : template.complexity === 'Moderate' ? 'bg-yellow' : 'bg-pink'}`} />
                    {template.complexity}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-heading mb-2">{template.name}</h3>
                <p className="text-body text-sm leading-relaxed mb-6 flex-1 line-clamp-2">
                  {template.description}
                </p>
                
                <div className="flex items-center gap-3 mt-auto">
                  <Button className="flex-1 bg-gradient-brand hover:opacity-90 text-white">Use Template</Button>
                  <Button variant="outline" className="flex-1">Preview</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
