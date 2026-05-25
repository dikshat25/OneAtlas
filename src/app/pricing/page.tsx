import React from 'react'
import { PricingPreview } from '@/components/landing/PricingPreview'
import { FAQ } from '@/components/landing/FAQ'

export default function PricingPage() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <PricingPreview />
      <FAQ />
    </div>
  )
}
