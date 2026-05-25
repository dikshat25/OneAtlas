'use client'

import React from 'react'
import { MessageSquare, Cpu, Rocket } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      title: 'Describe Your App',
      description: 'Type what you need in plain English. No technical specs required — just describe your use case naturally.',
      icon: MessageSquare,
      color: 'from-primary to-primary-light'
    },
    {
      title: 'Atlas Builds It',
      description: 'AI matches your prompt to the best template and generates a runtime schema that powers your entire app.',
      icon: Cpu,
      color: 'from-pink to-primary'
    },
    {
      title: 'Deploy & Evolve',
      description: 'One-click deploy. Edit conversationally. Schema evolves incrementally with each change you make.',
      icon: Rocket,
      color: 'from-orange to-pink'
    }
  ]

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">How it works</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-heading">From prompt to production in three steps</h3>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-primary-light/20 via-pink/50 to-orange/20" />

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="relative mb-8">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl shadow-primary/10 transition-transform group-hover:scale-110`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center border-2 border-white shadow-sm">
                    {i + 1}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-heading mb-3">{step.title}</h4>
                <p className="text-body leading-relaxed max-w-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
