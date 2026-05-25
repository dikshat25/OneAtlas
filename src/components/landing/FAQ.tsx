'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'

export function FAQ({ faqs }: { faqs: any[] }) {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-border rounded-xl bg-secondary [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-heading">
                {faq.question}
                <span className="ml-4 shrink-0 transition duration-200 group-open:-rotate-180">
                  <ChevronDown className="w-5 h-5 text-muted" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-body">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
