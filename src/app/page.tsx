import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { ModelsStrip } from '@/components/landing/ModelsStrip'
import { TemplatesShowcase } from '@/components/landing/TemplatesShowcase'
import { AtlasForRoles } from '@/components/landing/AtlasForRoles'
import { WhyAtlas } from '@/components/landing/WhyAtlas'
import { PricingPreview } from '@/components/landing/PricingPreview'
import { FAQ } from '@/components/landing/FAQ'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <HowItWorks />
      <ModelsStrip />
      <TemplatesShowcase />
      <AtlasForRoles />
      <WhyAtlas />
      <PricingPreview />
      <FAQ />
    </div>
  )
}
