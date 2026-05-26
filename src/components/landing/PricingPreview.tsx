'use client'

import React, { useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export function PricingPreview({ plans }: { plans: any[] }) {
  const [isAnnual, setIsAnnual] = useState(false)

  const getPrice = (priceStr: string) => {
    if (!priceStr || priceStr === 'Custom' || priceStr === 'Free') return priceStr;
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    if (isNaN(num) || num === 0) return priceStr;
    
    if (isAnnual) {
      return `$${Math.round(num * 0.75)}`;
    }
    return `$${num}`;
  }

  return (
    <section className="section-pad bg-background border-t border-border relative">
      <div className="layout">
        <div className="text-center mb-16">
          <h2 className="section mb-4">Simple, transparent pricing.</h2>
          <p className="text-[18px] text-muted-foreground max-w-2xl mx-auto mb-10">Start building for free. Scale when you're ready.</p>
          
          <div className="flex items-center justify-center gap-3">
            <span className={`text-[14px] font-semibold ${!isAnnual ? 'text-foreground' : 'text-muted'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${isAnnual ? 'bg-background' : 'bg-border'}`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform ${isAnnual ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-[14px] font-semibold ${isAnnual ? 'text-foreground' : 'text-muted'}`}>Annual</span>
              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">Save 25%</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative flex flex-col p-8 rounded-[24px] bg-white transition-all ${
                plan.isPopular 
                  ? 'border-[1.5px] border-[#FF6600] shadow-xl' 
                  : 'border border-border shadow-sm'
              }`}
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="card-heading">{plan.name}</h3>
                  {plan.isPopular && (
                    <span className="px-2.5 py-1 bg-background text-primary text-[11px] font-bold uppercase tracking-wider rounded-md border border-border">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-[14px] text-muted-foreground min-h-[40px]">{plan.description}</p>
              </div>
              
              <div className="mb-8 flex items-baseline gap-1 relative h-12">
                <AnimatePresence mode="popLayout">
                  <motion.span 
                    key={isAnnual ? 'annual' : 'monthly'}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="text-[48px] font-bold text-foreground tracking-[-0.03em] inline-block leading-[1]"
                  >
                    {getPrice(plan.price)}
                  </motion.span>
                </AnimatePresence>
                {plan.period && <span className="text-[16px] text-muted-foreground font-medium">{plan.period}</span>}
              </div>
              
              <ul className="space-y-0 mb-8 flex-1">
                  {typeof plan.features === 'string' ? JSON.parse(plan.features).map((feature: any, i: number) => (
                    <li key={i} className="flex items-center gap-3 py-2 border-b border-[#F9FAFB] last:border-0">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-primary shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-[#D1D5DB] shrink-0" />
                      )}
                      <span className={`text-[15px] ${feature.included ? 'text-[#4B5563]' : 'text-muted'}`}>{feature.text}</span>
                    </li>
                  )) : plan.features.map((feature: any, i: number) => (
                    <li key={i} className="flex items-center gap-3 py-2 border-b border-[#F9FAFB] last:border-0">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-primary shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-[#D1D5DB] shrink-0" />
                      )}
                      <span className={`text-[15px] ${feature.included ? 'text-[#4B5563]' : 'text-muted'}`}>{feature.text}</span>
                    </li>
                  ))}
              </ul>
              
              <Button asChild
                variant={plan.isPopular ? 'default' : 'secondary'} 
                className="w-full h-12 text-[15px]"
              >
                <Link href={plan.name === 'Enterprise' ? '/support' : '/builder'}>
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
