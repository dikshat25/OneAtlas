'use client'

import React from 'react'
import { useBuilderStore } from '@/store/builderStore'

export function BuilderProperties() {
  const { schema, selectedNodeId, updateNodeProp } = useBuilderStore()

  // Flatten tree to find node
  const findNode = (id: string, nodes: any[]): any => {
    for (const node of nodes) {
      if (node.id === id) return node
      if (node.children) {
        const found = findNode(id, node.children)
        if (found) return found
      }
    }
    return null
  }

  const selectedNode = selectedNodeId ? findNode(selectedNodeId, schema) : null

  if (!selectedNode) {
    return (
      <div className="w-72 bg-surface border-l border-border flex flex-col h-full shrink-0">
        <div className="p-4 border-b border-border">
          <h3 className="text-xs font-bold text-heading uppercase tracking-wider">Properties</h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-6 text-center text-sm text-muted">
          Select a component on the canvas to view its properties.
        </div>
      </div>
    )
  }

  return (
    <div className="w-72 bg-surface border-l border-border flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-border bg-secondary/30">
        <h3 className="text-xs font-bold text-heading uppercase tracking-wider mb-1">Properties</h3>
        <p className="text-sm font-semibold text-primary">{selectedNode.name}</p>
        <p className="text-xs text-muted">{selectedNode.type}</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <label className="block text-xs font-bold text-heading mb-2">ID</label>
          <input 
            type="text" 
            readOnly 
            value={selectedNode.id} 
            className="w-full bg-secondary border border-border rounded-md px-3 py-1.5 text-sm text-heading opacity-70"
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-heading mb-2">Props</label>
          {Object.keys(selectedNode.props).length === 0 ? (
            <div className="text-sm text-muted bg-secondary p-3 rounded-md border border-border border-dashed">
              No props configurable for this node.
            </div>
          ) : (
            <div className="space-y-3">
              {Object.entries(selectedNode.props).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-xs text-muted mb-1 capitalize">{key}</label>
                  {typeof value === 'boolean' ? (
                    <button
                      onClick={() => updateNodeProp(selectedNode.id, key, !value)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${value ? 'bg-primary' : 'bg-border'}`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-surface transition-transform ${value ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  ) : (
                    <input 
                      type="text" 
                      value={String(value)}
                      onChange={(e) => updateNodeProp(selectedNode.id, key, e.target.value)}
                      className="w-full bg-surface border border-border rounded-md px-3 py-1.5 text-sm text-heading focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-heading mb-2">Layout & Styling</label>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-secondary p-2 rounded border border-border text-center">
              <span className="text-xs text-muted block mb-1">Padding</span>
              <span className="text-sm font-medium">16px</span>
            </div>
            <div className="bg-secondary p-2 rounded border border-border text-center">
              <span className="text-xs text-muted block mb-1">Gap</span>
              <span className="text-sm font-medium">24px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

