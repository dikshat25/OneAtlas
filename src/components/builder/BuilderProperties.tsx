'use client'

import React from 'react'
import { useBuilderStore } from '@/store/builderStore'
import { Settings2, Layout, AlignLeft, Layers, Palette, Hash, Trash2 } from 'lucide-react'

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
      <div className="w-80 bg-[#FAFAFA] border-l border-border flex flex-col h-full shrink-0 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-5 border-b border-border flex items-center gap-2 bg-white">
          <Settings2 className="w-4 h-4 text-muted" />
          <h3 className="text-[13px] font-semibold text-heading uppercase tracking-widest">Properties</h3>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center mb-4 shadow-sm">
            <Layout className="w-5 h-5 text-muted" />
          </div>
          <p className="text-[14px] font-medium text-heading">No component selected</p>
          <p className="text-[13px] text-muted mt-1">Select a component on the canvas to configure it.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 bg-[#FAFAFA] border-l border-border flex flex-col h-full shrink-0 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="p-5 border-b border-border bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Settings2 className="w-4 h-4 text-primary" />
          <h3 className="text-[13px] font-semibold text-heading uppercase tracking-widest">Properties</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[15px] font-semibold text-heading tracking-tight">{selectedNode.name}</p>
            <p className="text-[12px] font-mono text-muted mt-0.5">{selectedNode.type}</p>
          </div>
          <button className="p-2 hover:bg-red-50 text-muted hover:text-red-500 rounded-lg transition-colors group">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-8">
        {/* Identifier */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-3.5 h-3.5 text-muted" />
            <h4 className="text-[13px] font-semibold text-heading">Identifier</h4>
          </div>
          <input 
            type="text" 
            readOnly 
            value={selectedNode.id} 
            className="w-full bg-white border border-border rounded-lg px-3 py-2 text-[13px] font-mono text-muted shadow-sm outline-none"
          />
        </section>
        
        {/* Configuration Props */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <AlignLeft className="w-3.5 h-3.5 text-muted" />
            <h4 className="text-[13px] font-semibold text-heading">Configuration</h4>
          </div>
          {Object.keys(selectedNode.props).length === 0 ? (
            <div className="text-[13px] text-muted bg-white p-4 rounded-lg border border-border border-dashed text-center">
              No configurable properties.
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(selectedNode.props).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-[12px] font-medium text-body mb-1.5 capitalize">{key}</label>
                  {typeof value === 'boolean' ? (
                    <button
                      onClick={() => updateNodeProp(selectedNode.id, key, !value)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${value ? 'bg-primary' : 'bg-[#E5E5E5]'}`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${value ? 'translate-x-4.5' : 'translate-x-1'}`} />
                    </button>
                  ) : (
                    <input 
                      type="text" 
                      value={String(value)}
                      onChange={(e) => updateNodeProp(selectedNode.id, key, e.target.value)}
                      className="w-full bg-white border border-border rounded-lg px-3 py-2.5 text-[13px] text-heading shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Layout & Styling */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-3.5 h-3.5 text-muted" />
            <h4 className="text-[13px] font-semibold text-heading">Layout</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-border shadow-sm flex flex-col items-center hover:border-[#D1D5DB] transition-colors cursor-pointer">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">Padding</span>
              <span className="text-[13px] font-mono text-heading">16px</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-border shadow-sm flex flex-col items-center hover:border-[#D1D5DB] transition-colors cursor-pointer">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">Gap</span>
              <span className="text-[13px] font-mono text-heading">24px</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-border shadow-sm flex flex-col items-center hover:border-[#D1D5DB] transition-colors cursor-pointer col-span-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">Direction</span>
              <div className="flex gap-2 mt-1 w-full bg-[#F5F5EE] p-1 rounded-md">
                <div className="flex-1 text-center text-[12px] py-1 bg-white rounded shadow-sm font-medium">Row</div>
                <div className="flex-1 text-center text-[12px] py-1 text-muted font-medium">Col</div>
              </div>
            </div>
          </div>
        </section>

        {/* Style */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-3.5 h-3.5 text-muted" />
            <h4 className="text-[13px] font-semibold text-heading">Appearance</h4>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-[12px] font-medium text-body mb-1.5">Background</label>
              <div className="flex items-center gap-3 bg-white p-2 border border-border rounded-lg shadow-sm">
                <div className="w-6 h-6 rounded border border-border bg-white shrink-0" />
                <span className="text-[13px] font-mono text-muted flex-1">#FFFFFF</span>
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-body mb-1.5">Border</label>
              <div className="flex items-center gap-3 bg-white p-2 border border-border rounded-lg shadow-sm">
                <div className="w-6 h-6 rounded border border-border bg-[#E5E7EB] shrink-0" />
                <span className="text-[13px] font-mono text-muted flex-1">1px solid</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
