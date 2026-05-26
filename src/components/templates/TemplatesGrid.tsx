'use client'

import React, { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createProjectFromTemplate } from '@/app/actions/project'
import { Button } from '@/components/ui/button'
import { TemplateModal } from './TemplateModal'

const categories = ['All', 'CRM & Sales', 'HR & People', 'Admin & Internal', 'Analytics & Data', 'Finance & Accounting', 'Operations', 'Customer Support', 'Project Management']
const complexities = ['All', 'Simple', 'Moderate', 'Advanced']
const sortOptions = ['Newest', 'Most Used', 'Complexity']

interface TemplatesGridProps {
  templates: any[]
}

export function TemplatesGrid({ templates }: TemplatesGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isCreating, setIsCreating] = useState<string | null>(null)
  const [previewTemplate, setPreviewTemplate] = useState<any | null>(null)
  
  const selectedCategory = searchParams.get('category') || 'All'
  const selectedComplexity = searchParams.get('complexity') || 'All'
  const selectedSort = searchParams.get('sort') || 'Newest'
  const searchQuery = searchParams.get('q') || ''

  const handleCreateProject = async (templateId: string) => {
    setIsCreating(templateId)
    const result = await createProjectFromTemplate(templateId)
    if (result.error) {
      alert(result.error)
      setIsCreating(null)
    } else {
      router.push(`/builder/${result.projectId}`)
    }
  }

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'All') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`/templates?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/templates')
  }

  // Base filtering (Search + Complexity) to calculate category counts
  const baseFilteredForCategories = useMemo(() => {
    return templates.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesComplexity = selectedComplexity === 'All' || t.complexity === selectedComplexity
      return matchesSearch && matchesComplexity
    })
  }, [templates, searchQuery, selectedComplexity])

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return baseFilteredForCategories.length
    return baseFilteredForCategories.filter(t => t.category === cat).length
  }

  const filteredAndSortedTemplates = useMemo(() => {
    let result = baseFilteredForCategories.filter(t => 
      selectedCategory === 'All' || t.category === selectedCategory
    )

    result.sort((a, b) => {
      if (selectedSort === 'Newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      if (selectedSort === 'Most Used') {
        return (b.usageCount || 0) - (a.usageCount || 0)
      }
      if (selectedSort === 'Complexity') {
        const order = { 'Simple': 1, 'Moderate': 2, 'Advanced': 3 }
        return (order[a.complexity as keyof typeof order] || 0) - (order[b.complexity as keyof typeof order] || 0)
      }
      return 0
    })

    return result
  }, [baseFilteredForCategories, selectedCategory, selectedSort])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <div className="w-full md:w-64 shrink-0 space-y-8">
        <div>
          <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map(cat => {
              const count = getCategoryCount(cat)
              return (
                <li key={cat}>
                  <button
                    onClick={() => updateFilters('category', cat)}
                    className={`flex items-center justify-between text-sm w-full px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === cat ? 'bg-primary/10 text-primary font-semibold' : 'text-body hover:bg-secondary'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === cat ? 'bg-primary/20 text-primary' : 'bg-elevated text-muted'}`}>
                      {count}
                    </span>
                  </button>
                </li>
              )
            })}
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

      {/* Grid Header & Grid */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted">Showing {filteredAndSortedTemplates.length} templates</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted">Sort by:</span>
            <select 
              className="bg-transparent border-none text-heading font-medium focus:ring-0 cursor-pointer outline-none"
              value={selectedSort}
              onChange={(e) => updateFilters('sort', e.target.value)}
            >
              {sortOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        {filteredAndSortedTemplates.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-border rounded-xl bg-surface">
            <h3 className="text-xl font-bold text-heading mb-3">No templates found</h3>
            <p className="text-body text-sm max-w-md mx-auto mb-6">
              We couldn't find any templates matching your search "{searchQuery}" and filters. Try adjusting them or start from a blank project.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTemplates.map(template => (
              <div 
                key={template.id} 
                className="bg-surface rounded-2xl border border-border shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-primary/30 transition-all duration-200 overflow-hidden flex flex-col"
              >
                <div className="h-40 bg-sunken border-b border-border p-4 relative overflow-hidden group cursor-pointer" onClick={() => setPreviewTemplate(template)}>
                   <div className="absolute inset-4 rounded-lg bg-surface border border-border shadow-sm overflow-hidden flex flex-col transition-transform group-hover:scale-[1.02]">
                    <div className="h-6 border-b border-border bg-elevated flex items-center px-2 gap-2">
                      <div className="w-16 h-2 bg-border rounded-full" />
                    </div>
                    <div className="flex-1 flex p-2 gap-2">
                      <div className="w-full flex flex-col gap-2">
                        <div className="h-4 bg-sunken rounded-sm w-1/3" />
                        <div className="h-10 bg-sunken rounded-sm" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary/5 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm" className="bg-surface/90 text-primary shadow-sm pointer-events-none">Preview Template</Button>
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-tint text-primary">
                      {template.category}
                    </span>
                    <div className="flex items-center gap-1.5 ml-auto text-xs font-medium text-muted">
                      <div className={`w-2 h-2 rounded-full ${template.complexity === 'Simple' ? 'bg-green' : template.complexity === 'Moderate' ? 'bg-yellow' : 'bg-pink'}`} />
                      {template.complexity}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-heading mb-2 group-hover:text-primary transition-colors">{template.name}</h3>
                  <p className="text-body text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <Button 
                      className="flex-1 bg-gradient-brand hover:opacity-90 text-white shadow-purple"
                      onClick={() => handleCreateProject(template.id)}
                      disabled={isCreating === template.id}
                    >
                      {isCreating === template.id ? 'Creating...' : 'Use Template'}
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => setPreviewTemplate(template)}>Preview</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <TemplateModal 
        template={previewTemplate} 
        isOpen={!!previewTemplate} 
        onClose={() => setPreviewTemplate(null)} 
      />
    </div>
  )
}

