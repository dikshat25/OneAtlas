'use client'

import React from 'react'
import { plans } from '@/data/pricing'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'

export function PricingPreview() {
  return (
    <section className="py-24 bg-background relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-body max-w-2xl mx-auto">Start building for free. Scale when you're ready.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative flex flex-col p-8 rounded-2xl border ${plan.isPopular ? 'border-primary shadow-xl scale-105 bg-white z-10' : 'border-border bg-white shadow-sm'}`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-brand text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-heading mb-2">{plan.name}</h3>
                <p className="text-sm text-body min-h-[40px]">{plan.description}</p>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-heading">{plan.price}</span>
                {plan.period && <span className="text-muted font-medium">{plan.period}</span>}
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-muted/30 shrink-0" />
                    )}
                    <span className={feature.included ? 'text-heading font-medium' : 'text-muted'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={plan.isPopular ? 'default' : 'outline'} 
                className={`w-full ${plan.isPopular ? 'bg-gradient-brand hover:opacity-90 text-white' : ''}`}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
