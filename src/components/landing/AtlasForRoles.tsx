'use client'

import React from 'react'
import { Rocket, Settings, Target, Code, Users, PieChart } from 'lucide-react'

export function AtlasForRoles() {
  const roles = [
    {
      title: 'Founders',
      description: 'Ship internal tools without an engineering team',
      icon: Rocket,
      color: 'text-pink bg-pink/10'
    },
    {
      title: 'Operations',
      description: 'Automate workflows and dashboards in minutes',
      icon: Settings,
      color: 'text-orange bg-orange/10'
    },
    {
      title: 'Product Managers',
      description: 'Build without waiting for dev cycles',
      icon: Target,
      color: 'text-primary bg-primary/10'
    },
    {
      title: 'Engineers',
      description: 'Scaffold backend-ready apps from templates',
      icon: Code,
      color: 'text-teal bg-teal/10'
    },
    {
      title: 'HR & People',
      description: 'Self-service HR dashboards and forms',
      icon: Users,
      color: 'text-cyan bg-cyan/10'
    },
    {
      title: 'Finance',
      description: 'Custom finance trackers and approval flows',
      icon: PieChart,
      color: 'text-yellow bg-yellow/10'
    }
  ]

  return (
    <section className="py-24 bg-secondary border-t border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">Built for every role in your company</h2>
          <p className="text-lg text-body max-w-2xl mx-auto">OneAtlas empowers everyone to build the tools they need to do their best work, regardless of technical ability.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <div 
              key={i} 
              className="bg-surface p-6 rounded-2xl border border-border shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-primary/20 transition-all group cursor-default flex items-start gap-4"
            >
              <div className={`p-3 rounded-xl ${role.color} group-hover:bg-primary group-hover:text-white transition-colors shrink-0`}>
                <role.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-heading mb-1 group-hover:text-primary transition-colors">{role.title}</h3>
                <p className="text-sm text-body leading-relaxed">{role.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

