import React from 'react'
import { Button } from '@/components/ui/button'

export default function EnterprisePage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm mb-8">
        OneAtlas for Enterprise
      </div>
      <h1 className="text-5xl md:text-7xl font-bold text-heading mb-6 tracking-tight">
        Scale your operations with confidence.
      </h1>
      <p className="text-xl text-body max-w-3xl mb-12 leading-relaxed">
        Custom domains, SSO, audit logs, and dedicated infrastructure for large organizations that need unparalleled security and performance.
      </p>
      <div className="flex gap-4">
        <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/95 text-white">Contact Sales</Button>
        <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full">View Documentation</Button>
      </div>
    </div>
  )
}
