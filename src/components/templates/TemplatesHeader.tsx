'use client'

import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface TemplatesHeaderProps {
  searchQuery: string
  setSearchQuery: (val: string) => void
}

export function TemplatesHeader({ searchQuery, setSearchQuery }: TemplatesHeaderProps) {
  return (
    <div className="bg-primary-dark pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center text-white relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Application Templates</h1>
        <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
          Start building instantly with production-ready schemas. Search by role, use case, or feature to find the perfect starting point.
        </p>
        
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white/40" />
          </div>
          <Input 
            type="text" 
            placeholder="Search templates (e.g. CRM, Inventory, HR)..." 
            className="w-full pl-12 pr-4 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full focus-visible:ring-primary focus-visible:border-primary backdrop-blur-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
