'use client'

import React from 'react'
import { Shield, Zap, Layers, Globe } from 'lucide-react'

export function WhyAtlas() {
  const reasons = [
    {
      title: 'Enterprise-Grade Security',
      description: 'SOC2 compliant, AES-256 encryption, and RBAC built right into every generated app.',
      icon: Shield,
    },
    {
      title: 'Instant Deployment',
      description: 'Apps are hosted and live the second they are generated. Zero config required.',
      icon: Zap,
    },
    {
      title: 'Extensible Architecture',
      description: 'Connect your own databases, APIs, and custom UI components via our SDK.',
      icon: Layers,
    },
    {
      title: 'Custom Domains',
      description: 'Serve your internal tools securely on your own company subdomains.',
      icon: Globe,
    }
  ]

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">Why choose OneAtlas?</h2>
          <p className="text-lg text-body max-w-2xl mx-auto">Not just a prototype builder. We generate production-ready operational systems.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, i) => (
            <div key={i} className="flex gap-4 p-6 rounded-2xl border border-border bg-secondary hover:bg-white hover:shadow-lg transition-all group">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <reason.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-heading mb-2">{reason.title}</h3>
                <p className="text-body leading-relaxed">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
