'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden pt-24 pb-32">
      <div className="layout w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side Typography */}
        <div className="flex flex-col items-start z-10">
          <div className="mb-8 label text-primary">
            AI-NATIVE APP PLATFORM
          </div>

          <h1 className="hero mb-6 text-foreground">
            Build internal<br />
            tools that<br />
            actually work.
          </h1>
          
          <p className="max-w-[480px] mb-10 text-muted-foreground">
            OneAtlas generates operational apps, dashboards, and workflows from a single prompt. No code required.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Button size="lg" className="h-12 w-full sm:w-auto" asChild>
              <Link href="/builder">Start Building &rarr;</Link>
            </Button>
            <Button size="lg" variant="secondary" className="h-12 w-full sm:w-auto" asChild>
              <Link href="/templates">View Templates</Link>
            </Button>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-full border-2 border-foreground bg-secondary flex items-center justify-center overflow-hidden"
                >
                  <div className={`w-full h-full bg-border`} />
                </div>
              ))}
            </div>
            <span className="text-[14px] font-medium text-muted-foreground">Trusted by 2,400+ teams ship faster with OneAtlas</span>
          </div>
        </div>

        {/* Right Side Mock UI */}
        <div className="relative z-10 w-full reveal visible">
          <div className="bg-white rounded-[28px] border border-border p-6 shadow-sm transition-all hover:shadow-xl hover:border-input">
            <div className="prompt-box group border border-border rounded-[24px] p-5 transition-all focus-within:border-input focus-within:shadow-sm mb-6">
              <textarea 
                className="w-full bg-transparent border-none outline-none text-[16px] text-foreground resize-none min-h-[80px] placeholder:text-muted"
                placeholder="Describe your app..."
                defaultValue=""
              />
              <div className="flex gap-2 mt-4">
                {['CRM Workspace', 'HR Dashboard', 'Admin Panel'].map(chip => (
                  <button key={chip} className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Functional App Preview Mock */}
            <div className="rounded-[16px] bg-background border border-border p-4 flex flex-col gap-3 min-h-[220px]">
              {/* Nav */}
              <div className="h-8 bg-white rounded-[8px] border border-border flex items-center px-3 gap-2">
                 <div className="w-16 h-2 bg-muted rounded-full" />
                 <div className="w-8 h-2 bg-muted rounded-full ml-auto" />
              </div>
              <div className="flex flex-1 gap-3">
                {/* Sidebar */}
                <div className="w-16 bg-white rounded-[8px] border border-border p-2 flex flex-col gap-2">
                  <div className="h-2 w-full bg-muted rounded-sm" />
                  <div className="h-2 w-3/4 bg-muted rounded-sm" />
                  <div className="h-2 w-full bg-muted rounded-sm" />
                </div>
                {/* Main Table */}
                <div className="flex-1 bg-white rounded-[8px] border border-border p-3 flex flex-col gap-2">
                  <div className="h-4 w-1/3 bg-background rounded-sm mb-2" />
                  <div className="h-6 w-full bg-background rounded-[4px]" />
                  <div className="h-6 w-full bg-background rounded-[4px]" />
                  <div className="h-6 w-full bg-background rounded-[4px]" />
                </div>
              </div>
            </div>

            <Button className="w-full mt-6 h-[52px] text-[16px]">
              Generate App &rarr;
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
