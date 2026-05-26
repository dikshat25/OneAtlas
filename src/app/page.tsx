export const dynamic = 'force-dynamic';
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { ModelsStrip } from '@/components/landing/ModelsStrip'
import { TemplatesShowcase } from '@/components/landing/TemplatesShowcase'
import { AtlasForRoles } from '@/components/landing/AtlasForRoles'
import { WhyAtlas } from '@/components/landing/WhyAtlas'
import { PricingPreview } from '@/components/landing/PricingPreview'
import { FAQ } from '@/components/landing/FAQ'
import { Footer } from '@/components/layout/Footer'
import prisma from '@/lib/prisma'

export default async function Home() {
  const templates = await prisma.template.findMany()
  const faqs = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } })
  const plans = await prisma.pricingPlan.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <HowItWorks />
      <ModelsStrip />
      <TemplatesShowcase templates={templates} />
      <AtlasForRoles />
      <WhyAtlas />
      <PricingPreview plans={plans} />
      <FAQ faqs={faqs} />
    </div>
  )
}
