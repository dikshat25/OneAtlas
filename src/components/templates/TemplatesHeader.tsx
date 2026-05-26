'use client'

import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'

export function TemplatesHeader() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [localSearch, setLocalSearch] = useState(searchParams.get('q') || '')

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (localSearch) {
        params.set('q', localSearch)
      } else {
        params.delete('q')
      }
      router.push(`/templates?${params.toString()}`)
    }, 300)
    return () => clearTimeout(timer)
  }, [localSearch, router, searchParams])

  return (
    <div className="bg-transparent pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center text-heading relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Application Templates</h1>
        <p className="text-lg text-body mb-10 max-w-2xl mx-auto">
          Start building instantly with production-ready schemas. Search by role, use case, or feature to find the perfect starting point.
        </p>
        
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted" />
          </div>
          <Input 
            type="text" 
            placeholder="Search templates (e.g. CRM, Inventory, HR)..." 
            className="w-full pl-14 pr-6 py-7 bg-white border border-border text-heading placeholder:text-muted rounded-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary shadow-sm text-lg"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

