import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { templates } from '../src/data/templates'
import { plans } from '../src/data/pricing'
import { faqs } from '../src/data/faq'
import { mockSchema } from '../src/data/builder-schema'
import * as bcrypt from 'bcryptjs'
import "dotenv/config"

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // 1. Seed User
  const hashedPassword = await bcrypt.hash('password123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'demo@oneatlas.dev' },
    update: {},
    create: {
      email: 'demo@oneatlas.dev',
      name: 'Demo User',
      password: hashedPassword,
    },
  })
  console.log('Seeded User:', user.email)

  // 2. Seed Templates
  for (const t of templates) {
    await prisma.template.upsert({
      where: { slug: t.slug },
      update: {
        name: t.name,
        category: t.category,
        complexity: t.complexity,
        description: t.description,
        tags: t.tags,
        fields: t.fields,
        schema: JSON.stringify(mockSchema),
      },
      create: {
        slug: t.slug,
        name: t.name,
        category: t.category,
        complexity: t.complexity,
        description: t.description,
        tags: t.tags,
        fields: t.fields,
        schema: JSON.stringify(mockSchema), // Seed with mock schema for now
      }
    })
  }
  console.log('Seeded Templates')

  // 3. Seed Pricing Plans
  await prisma.pricingPlan.deleteMany()
  for (const [index, p] of plans.entries()) {
    await prisma.pricingPlan.create({
      data: {
        name: p.name,
        price: p.price,
        period: p.period || null,
        description: p.description,
        isPopular: p.isPopular || false,
        features: JSON.stringify(p.features),
        order: index,
      }
    })
  }
  console.log('Seeded Pricing Plans')

  // 4. Seed FAQs
  await prisma.fAQ.deleteMany()
  for (const [index, f] of faqs.entries()) {
    await prisma.fAQ.create({
      data: {
        question: f.question,
        answer: f.answer,
        order: index,
      }
    })
  }
  console.log('Seeded FAQs')

  // 5. Seed a Mock Project for the user
  const firstTemplate = await prisma.template.findFirst()
  if (firstTemplate) {
    await prisma.project.create({
      data: {
        name: 'My First App',
        schema: firstTemplate.schema,
        userId: user.id,
        templateId: firstTemplate.id,
      }
    })
    console.log('Seeded a Project for Demo User')
  }

  // 6. Seed a Mock Blog Post
  await prisma.blogPost.deleteMany()
  await prisma.blogPost.create({
    data: {
      title: 'Introducing OneAtlas: AI-Native Internal Tools',
      excerpt: 'Build internal tools without an engineering team. Say hello to OneAtlas.',
      content: 'Long form content goes here...',
      authorName: 'Founders',
      category: 'Product',
      readTime: '4 min read',
    }
  })
  console.log('Seeded Blog Post')

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
