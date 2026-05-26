'use client'

import React from 'react'

export function HowItWorks() {
  return (
    <section className="section-pad bg-primary border-b border-border">
      <div className="layout">
        <div className="mb-16">
          <h2 className="label mb-4">HOW IT WORKS</h2>
          <h3 className="section">From prompt to production<br />in three steps.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          
          {/* Step 1 */}
          <div className="flex flex-col relative reveal visible">
            <div className="text-[13px] font-bold text-accent uppercase mb-3">Step 01</div>
            <div className="hidden md:block absolute top-[9px] left-16 right-0 h-px bg-border-subtle" />
            <h4 className="card-heading mb-3">Describe<br />Your App</h4>
            <p className="text-[16px] text-secondary leading-[1.7]">
              Type what you need in plain English. No technical specs required — just describe your use case naturally.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col relative reveal visible" style={{ transitionDelay: '100ms' }}>
            <div className="text-[13px] font-bold text-accent uppercase mb-3">Step 02</div>
            <div className="hidden md:block absolute top-[9px] left-16 right-0 h-px bg-border-subtle" />
            <h4 className="card-heading mb-3">Atlas Builds<br />It</h4>
            <p className="text-[16px] text-secondary leading-[1.7]">
              AI matches your prompt to the best template and generates a runtime schema that powers your entire app.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col relative reveal visible" style={{ transitionDelay: '200ms' }}>
            <div className="text-[13px] font-bold text-accent uppercase mb-3">Step 03</div>
            <h4 className="card-heading mb-3">Deploy &<br />Evolve</h4>
            <p className="text-[16px] text-secondary leading-[1.7]">
              One-click deploy. Edit conversationally. Schema evolves incrementally with each change you make.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
