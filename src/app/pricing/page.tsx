export const dynamic = 'force-dynamic';
import React from 'react'
import { PricingPreview } from '@/components/landing/PricingPreview'
import { FAQ } from '@/components/landing/FAQ'
import prisma from '@/lib/prisma'

export default async function PricingPage() {
  const plans = await prisma.pricingPlan.findMany({ orderBy: { order: 'asc' } })
  const faqs = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="pt-20 min-h-screen bg-page">
      <PricingPreview plans={plans} />
      <FAQ faqs={faqs} />
    </div>
  )
}

