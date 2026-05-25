'use client'

import React from 'react'
import { models } from '@/data/models'

export function ModelsStrip() {
  return (
    <section className="py-20 bg-secondary overflow-hidden border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h3 className="text-2xl font-bold text-heading mb-2">Powered by every model that matters</h3>
        <p className="text-body">Switch models per task. Optimize for cost or capability.</p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        {/* Scroll gradient masks */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-secondary to-transparent z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-secondary to-transparent z-10" />

        <div className="flex space-x-6 animate-scroll-x group-hover:[animation-play-state:paused]">
          {/* Double the list to create seamless loop */}
          {[...models, ...models].map((model, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 flex items-center gap-3 bg-white border border-border px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              <div className="w-6 h-6 rounded-md bg-muted-bg flex items-center justify-center text-[10px] font-bold text-muted border border-border">
                {model.provider[0]}
              </div>
              <span className="font-semibold text-heading whitespace-nowrap">{model.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
