'use client'

import React from 'react'
import { useBuilderStore } from '@/store/builderStore'
import { ComponentNode } from '@/types'
import { Plus, Search, Filter, MoreHorizontal, CheckCircle2, Circle, Clock, ArrowUpRight, BarChart3, Users, Briefcase } from 'lucide-react'

function RenderComponent({ node, isSimulating, onSelect, isSelected }: { node: ComponentNode, isSimulating: boolean, onSelect: (id: string) => void, isSelected: boolean }) {
  const handleClick = (e: React.MouseEvent) => {
    if (isSimulating) return
    e.stopPropagation()
    onSelect(node.id)
  }

  const selectionClass = !isSimulating && isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-[#F5F5EE] z-10' : ''
  const hoverClass = !isSimulating ? 'hover:ring-1 hover:ring-primary/50 hover:ring-offset-1 hover:ring-offset-[#F5F5EE]' : ''
  const baseClass = `relative transition-all duration-200 ${!isSimulating ? 'cursor-pointer' : ''} ${selectionClass} ${hoverClass}`

  switch (node.type) {
    case 'navbar':
      return (
        <div onClick={handleClick} className={`${baseClass} h-16 border-b border-border bg-white flex items-center px-8 justify-between shrink-0`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <div className="w-3 h-3 bg-white rounded-sm" />
            </div>
            <div className="font-bold text-[17px] tracking-tight text-heading">{String(node.props.title || 'Workspace')}</div>
          </div>
          <div className="flex gap-8 text-[14px] font-medium text-body">
            <span className="text-primary cursor-pointer transition-colors hover:text-primary">Overview</span>
            <span className="cursor-pointer transition-colors hover:text-primary">Issues</span>
            <span className="cursor-pointer transition-colors hover:text-primary">Views</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-xs font-semibold text-heading">US</div>
          </div>
        </div>
      )
    
    case 'data-table':
      const columns = (node.props.columns as string[]) || ['Identifier', 'Title', 'Status', 'Assignee', 'Created']
      return (
        <div onClick={handleClick} className={`${baseClass} bg-white rounded-2xl border border-border flex flex-col overflow-hidden m-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]`}>
          <div className="p-5 border-b border-border flex justify-between items-center bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary rounded-lg border border-border/50">
                <Briefcase className="w-4 h-4 text-heading" />
              </div>
              <h3 className="font-semibold text-[16px] tracking-tight text-heading">{String(node.props.title || 'Active Projects')}</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input type="text" placeholder="Search..." className="h-9 pl-9 pr-4 rounded-lg border border-border bg-secondary text-sm focus:outline-none focus:ring-1 focus:ring-primary w-48 transition-all" readOnly />
              </div>
              <button className="h-9 px-3 rounded-lg border border-border bg-white text-heading text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted" /> Filter
              </button>
              {!isSimulating && <button className="h-9 px-4 rounded-lg bg-primary text-white text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" /> New
              </button>}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px]">
              <thead className="bg-[#F9FAFB] border-b border-border">
                <tr>
                  {columns.map((col, idx) => <th key={col} className={`py-3 px-5 font-semibold text-body ${idx === 0 ? 'w-24' : ''}`}>{col}</th>)}
                  <th className="py-3 px-5 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {[1, 2, 3, 4].map(i => (
                  <tr key={i} className="hover:bg-secondary/40 transition-colors group">
                    <td className="py-3 px-5 text-muted font-mono text-[13px]">PRJ-0{i}</td>
                    <td className="py-3 px-5 font-medium text-heading">Website Redesign Phase {i}</td>
                    <td className="py-3 px-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium bg-green/10 text-green">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-secondary border border-border flex items-center justify-center text-[10px] font-bold">U{i}</div>
                        <span className="text-body">User {i}</span>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-body">Oct {10+i}, 2023</td>
                    <td className="py-3 px-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 rounded hover:bg-secondary text-muted"><MoreHorizontal className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )

    case 'metric-row':
      const metrics = (node.props.metrics as string[]) || ['Total Revenue', 'Active Users', 'New Signups', 'Conversion']
      return (
        <div onClick={handleClick} className={`${baseClass} grid grid-cols-2 lg:grid-cols-4 gap-6 m-6`}>
          {metrics.map((m, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[14px] font-medium text-body">{m}</p>
                <div className={`p-2 rounded-lg ${i === 0 ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted'}`}>
                  {i === 1 ? <Users className="w-4 h-4" /> : <BarChart3 className="w-4 h-4" />}
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold tracking-tight text-heading">
                  {i === 0 ? '$' : ''}{[24.5, 12, 3.4, 8.2][i]}{i === 0 || i === 3 ? 'k' : 'k'}
                </p>
                <span className="text-[13px] font-medium text-green flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" /> +12%
                </span>
              </div>
            </div>
          ))}
        </div>
      )

    case 'kanban':
      const stages = (node.props.stages as string[]) || ['Todo', 'In Progress', 'In Review', 'Done']
      return (
        <div onClick={handleClick} className={`${baseClass} flex gap-6 p-6 overflow-x-auto min-h-[500px]`}>
          {stages.map((stage, idx) => (
            <div key={stage} className="w-[320px] shrink-0 flex flex-col gap-4">
              <div className="flex justify-between items-center px-1">
                <h4 className="font-semibold text-[14px] text-heading flex items-center gap-2">
                  <Circle className={`w-3 h-3 ${idx === 0 ? 'text-muted' : idx === 3 ? 'text-green' : 'text-primary'} fill-current`} />
                  {stage} <span className="text-muted font-normal ml-1">3</span>
                </h4>
                <button className="text-muted hover:text-heading"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all cursor-grab active:cursor-grabbing group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[12px] font-mono text-muted group-hover:text-primary transition-colors">LIN-0{i}{idx}</span>
                      <div className="w-6 h-6 rounded-full bg-secondary border border-border flex items-center justify-center text-[9px] font-bold">U{i}</div>
                    </div>
                    <p className="text-[14px] font-medium text-heading leading-snug mb-4">Implement new user authentication flow</p>
                    <div className="flex items-center gap-3 text-[12px] text-muted">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Oct 24</span>
                      <span className="px-2 py-0.5 rounded-md bg-secondary border border-border">Backend</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
      
    case 'timeline':
    case 'feed':
      return (
        <div onClick={handleClick} className={`${baseClass} bg-white rounded-2xl border border-border p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] m-6 max-w-lg`}>
          <h4 className="font-semibold text-[16px] tracking-tight text-heading mb-6">{String(node.props.title || 'Activity Timeline')}</h4>
          <div className="space-y-6 relative before:absolute before:inset-y-2 before:left-[15px] before:w-[2px] before:bg-border/60">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex gap-4 relative z-10">
                <div className={`w-8 h-8 rounded-full border-2 border-white shrink-0 flex items-center justify-center shadow-sm ${i === 1 ? 'bg-primary text-white' : 'bg-secondary text-muted'}`}>
                  {i === 1 ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </div>
                <div className="pt-1.5">
                  <p className="text-[14px] font-medium text-heading">
                    {i === 1 ? 'Deployment successful' : i === 2 ? 'Code reviewed by team' : 'Pull request opened'}
                  </p>
                  <p className="text-[13px] text-body mt-0.5">{i} hours ago by Developer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return (
        <div onClick={handleClick} className={`${baseClass} m-6 p-8 border border-dashed border-border rounded-2xl bg-white text-center hover:bg-secondary/30 transition-colors`}>
          <h4 className="font-semibold text-[16px] text-heading">{String(node.props.title || node.name || 'Component')}</h4>
          <p className="text-[13px] text-muted mt-2 font-mono">type: {node.type}</p>
        </div>
      )
  }
}

export function BuilderCanvas() {
  const { schema, selectedNodeId, setSelectedNodeId, isSimulating } = useBuilderStore()

  const handleRootClick = () => {
    if (isSimulating) return
    setSelectedNodeId('root')
  }

  return (
    <div className="flex-1 bg-[#E8E8E3] overflow-auto p-4 md:p-8 relative flex justify-center custom-scrollbar">
      <div 
        className={`w-full max-w-[1200px] bg-[#F5F5EE] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden min-h-[850px] transition-all duration-300 relative ${
          !isSimulating && selectedNodeId === 'root' ? 'ring-2 ring-primary border-primary' : 'border border-border/50'
        }`}
        onClick={handleRootClick}
      >
        {/* Simulate Window Controls (Mac style) */}
        <div className="h-10 bg-white border-b border-border flex items-center px-4 gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          <div className="mx-auto flex items-center gap-2 px-4 h-6 rounded-md bg-secondary border border-border text-[11px] font-mono text-muted">
            <Search className="w-3 h-3" /> oneatlas.app/preview
          </div>
          <div className="w-16" /> {/* Spacer to balance */}
        </div>

        {(!schema || schema.length === 0) ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted">
            <div className="w-16 h-16 rounded-2xl bg-white border border-border flex items-center justify-center mb-4 shadow-sm">
               <Plus className="w-6 h-6 text-muted" />
            </div>
            <p className="font-medium text-heading">Empty Canvas</p>
            <p className="text-sm mt-1">Select a template or drag components here.</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col w-full h-full relative">
            {schema.map(node => (
              <RenderComponent 
                key={node.id} 
                node={node} 
                isSimulating={isSimulating}
                isSelected={selectedNodeId === node.id}
                onSelect={setSelectedNodeId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
