'use client'

import React from 'react'
import { models } from '@/data/models'

export function ModelsStrip() {
  return (
    <section className="py-20 bg-background border-b border-border overflow-hidden">
      <div className="layout text-center mb-12">
        <h2 className="label mb-4">WORKS WITH EVERY MODEL</h2>
        <p className="text-[18px] text-muted-foreground font-medium">Route to the right model for every task. Optimize for cost or capability.</p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        {/* Scroll gradient masks matching the bg-background #F5F5EE */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#F5F5EE] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#F5F5EE] to-transparent z-10 pointer-events-none" />

        <div className="strip-inner">
          {/* Double the list to create seamless loop */}
          {[...models, ...models, ...models].map((model, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-[180px] h-[80px] bg-white border border-muted rounded-[18px] flex flex-col items-center justify-center gap-[4px]"
            >
              <span className="text-[14px] font-semibold text-foreground">{model.name}</span>
              <span className="text-[11px] font-medium text-muted uppercase tracking-[0.06em]">{model.provider}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
