'use client'

import React, { useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { templates } from '@/data/templates'
import { Button } from '@/components/ui/button'

const categories = ['All', 'CRM & Sales', 'HR & People', 'Admin & Internal', 'Analytics & Data', 'Finance & Accounting', 'Operations', 'Customer Support', 'Project Management']
const complexities = ['All', 'Simple', 'Moderate', 'Advanced']

interface TemplatesGridProps {
  searchQuery: string
}

export function TemplatesGrid({ searchQuery }: TemplatesGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const selectedCategory = searchParams.get('category') || 'All'
  const selectedComplexity = searchParams.get('complexity') || 'All'

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'All') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`/templates?${params.toString()}`)
  }

  const filteredTemplates = useMemo(() => {
    return templates.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory
      const matchesComplexity = selectedComplexity === 'All' || t.complexity === selectedComplexity
      
      return matchesSearch && matchesCategory && matchesComplexity
    })
  }, [searchQuery, selectedCategory, selectedComplexity])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <div className="w-full md:w-64 shrink-0 space-y-8">
        <div>
          <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map(cat => (
              <li key={cat}>
                <button
                  onClick={() => updateFilters('category', cat)}
                  className={`text-sm text-left w-full px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === cat ? 'bg-primary/10 text-primary font-semibold' : 'text-body hover:bg-secondary'
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-4">Complexity</h3>
          <ul className="space-y-2">
            {complexities.map(comp => (
              <li key={comp}>
                <button
                  onClick={() => updateFilters('complexity', comp)}
                  className={`text-sm text-left w-full px-3 py-2 rounded-md transition-colors ${
                    selectedComplexity === comp ? 'bg-primary/10 text-primary font-semibold' : 'text-body hover:bg-secondary'
                  }`}
                >
                  {comp}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1">
        {filteredTemplates.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-border rounded-xl">
            <h3 className="text-lg font-semibold text-heading mb-2">No templates found</h3>
            <p className="text-body text-sm">Try adjusting your filters or search query.</p>
            <Button variant="outline" className="mt-4" onClick={() => router.push('/templates')}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <div 
                key={template.id} 
                className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all overflow-hidden flex flex-col"
              >
                <div className="h-40 bg-secondary border-b border-border p-4 relative overflow-hidden group">
                   <div className="absolute inset-4 rounded-lg bg-white border border-border shadow-sm overflow-hidden flex flex-col">
                    <div className="h-6 border-b border-border bg-secondary flex items-center px-2 gap-2">
                      <div className="w-16 h-2 bg-border rounded-full" />
                    </div>
                    <div className="flex-1 flex p-2 gap-2">
                      <div className="w-full flex flex-col gap-2">
                        <div className="h-4 bg-secondary rounded-sm w-1/3" />
                        <div className="h-10 bg-secondary rounded-sm" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-navy/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm" className="bg-white/90 shadow-sm pointer-events-none">Preview App</Button>
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-lavender/50 text-primary">
                      {template.category}
                    </span>
                    <div className="flex items-center gap-1.5 ml-auto text-xs font-medium text-muted">
                      <div className={`w-2 h-2 rounded-full ${template.complexity === 'Simple' ? 'bg-green' : template.complexity === 'Moderate' ? 'bg-yellow' : 'bg-pink'}`} />
                      {template.complexity}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-heading mb-2">{template.name}</h3>
                  <p className="text-body text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {template.description}
                  </p>
                  
                  <Button className="w-full bg-gradient-brand hover:opacity-90 text-white">Use Template</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
