'use client'

import React from 'react'
import { useBuilderStore } from '@/store/builderStore'

export function BuilderCanvas() {
  const { selectedNodeId, setSelectedNodeId } = useBuilderStore()

  // Fake table data for the CRM mockup
  const contacts = [
    { id: 1, name: 'Alice Freeman', company: 'Acme Corp', status: 'Active', email: 'alice@acme.co' },
    { id: 2, name: 'Bob Smith', company: 'Global Tech', status: 'Lead', email: 'bob@global.com' },
    { id: 3, name: 'Charlie Davis', company: 'Stark Ind.', status: 'Inactive', email: 'charlie@stark.io' },
    { id: 4, name: 'Diana Prince', company: 'Themyscira', status: 'Active', email: 'diana@island.org' },
  ]

  return (
    <div className="flex-1 bg-secondary overflow-auto p-8 relative flex justify-center">
      <div 
        className={`w-full max-w-5xl bg-page rounded-lg border shadow-xl flex flex-col overflow-hidden h-[800px] transition-all duration-200 ${
          selectedNodeId === 'root' ? 'ring-2 ring-primary border-primary' : 'border-border'
        }`}
        onClick={() => setSelectedNodeId('root')}
      >
        {/* Mock App Header */}
        <div 
          className={`h-14 border-b border-border bg-surface flex items-center px-6 justify-between ${
            selectedNodeId === 'header' ? 'ring-2 ring-primary border-transparent' : ''
          }`}
          onClick={(e) => { e.stopPropagation(); setSelectedNodeId('header') }}
        >
          <div className="font-bold text-lg text-heading">CRM Workspace</div>
          <div className="flex gap-4 text-sm font-medium text-body">
            <span className="text-primary">Dashboard</span>
            <span>Contacts</span>
            <span>Reports</span>
            <span>Settings</span>
          </div>
        </div>

        {/* Mock App Main Content */}
        <div 
          className={`flex-1 flex p-6 gap-6 overflow-hidden ${
            selectedNodeId === 'main' ? 'ring-2 ring-primary inset-ring inset-ring-primary' : ''
          }`}
          onClick={(e) => { e.stopPropagation(); setSelectedNodeId('main') }}
        >
          {/* Main Table Area */}
          <div 
            className={`flex-1 bg-surface rounded-xl border border-border flex flex-col overflow-hidden ${
              selectedNodeId === 'contactsTable' ? 'ring-2 ring-primary border-transparent' : ''
            }`}
            onClick={(e) => { e.stopPropagation(); setSelectedNodeId('contactsTable') }}
          >
            <div className="p-4 border-b border-border flex justify-between items-center bg-page/50">
              <h3 className="font-semibold text-heading">Contacts Directory</h3>
              <div className="flex gap-2">
                <input type="text" placeholder="Search..." className="border border-border rounded-md px-3 py-1 text-sm outline-none" />
                <button className="bg-primary text-white px-3 py-1 rounded-md text-sm">Add New</button>
              </div>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-muted">
                <tr>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Company</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {contacts.map(c => (
                  <tr key={c.id} className="hover:bg-secondary/50">
                    <td className="p-4 font-medium text-heading">{c.name}</td>
                    <td className="p-4 text-body">{c.company}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        c.status === 'Active' ? 'bg-green/10 text-green' : c.status === 'Lead' ? 'bg-yellow/10 text-yellow' : 'bg-muted-bg text-muted'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-body">{c.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Side Panel Area */}
          <div 
            className={`w-72 flex flex-col gap-6 ${
              selectedNodeId === 'sidePanel' ? 'ring-2 ring-primary rounded-xl' : ''
            }`}
            onClick={(e) => { e.stopPropagation(); setSelectedNodeId('sidePanel') }}
          >
            <div className="bg-surface rounded-xl border border-border p-5 shadow-sm">
              <h4 className="font-semibold text-heading mb-4">Quick Stats</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted mb-1">Total Contacts</p>
                  <p className="text-2xl font-bold text-heading">1,248</p>
                </div>
                <div>
                  <p className="text-xs text-muted mb-1">New this week</p>
                  <p className="text-2xl font-bold text-green">+42</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 bg-surface rounded-xl border border-border p-5 shadow-sm">
              <h4 className="font-semibold text-heading mb-4">Recent Activity</h4>
              <div className="space-y-4 relative before:absolute before:inset-y-2 before:left-[11px] before:w-[2px] before:bg-border">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-3 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-primary/10 border-2 border-white shrink-0 flex items-center justify-center" />
                    <div>
                      <p className="text-sm font-medium text-heading">Call logged</p>
                      <p className="text-xs text-muted">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

