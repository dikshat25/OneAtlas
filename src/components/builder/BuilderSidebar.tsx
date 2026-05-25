'use client'

import React from 'react'
import { LayoutTemplate, Type, Grid, SquareSquare, List, Link as LinkIcon, Component, Search, ChevronRight, ChevronDown } from 'lucide-react'
import { useBuilderStore } from '@/store/builderStore'
import { ComponentNode } from '@/types'

const iconMap: Record<string, any> = {
  AppLayout: LayoutTemplate,
  Container: SquareSquare,
  Text: Type,
  Grid: Grid,
  DataTable: Grid,
  List: List,
  LinkGroup: LinkIcon,
  TopNav: Component,
  BottomNav: Component,
  Input: Search,
  Panel: SquareSquare,
  Card: SquareSquare
}

export function BuilderSidebar() {
  const { schema, selectedNodeId, setSelectedNodeId } = useBuilderStore()

  const renderTree = (node: ComponentNode, depth = 0) => {
    const Icon = iconMap[node.type] || Component
    const isSelected = selectedNodeId === node.id
    
    return (
      <div key={node.id}>
        <div 
          className={`flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer text-sm ${isSelected ? 'bg-primary/10 text-primary font-medium' : 'text-body hover:bg-secondary'}`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => setSelectedNodeId(node.id)}
        >
          {node.children && node.children.length > 0 ? (
            <ChevronDown className="w-3.5 h-3.5 shrink-0 opacity-50" />
          ) : (
            <div className="w-3.5 shrink-0" />
          )}
          <Icon className="w-4 h-4 shrink-0 opacity-70" />
          <span className="truncate">{node.name}</span>
        </div>
        {node.children?.map(child => renderTree(child, depth + 1))}
      </div>
    )
  }

  return (
    <div className="w-64 bg-white border-r border-border flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-border">
        <h3 className="text-xs font-bold text-heading uppercase tracking-wider mb-2">Component Tree</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input 
            type="text" 
            placeholder="Search layers..." 
            className="w-full bg-secondary border border-border rounded-md pl-8 pr-3 py-1.5 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {schema.map(node => renderTree(node))}
      </div>
    </div>
  )
}
