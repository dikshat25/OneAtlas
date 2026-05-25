export type TemplateCategory =
  | 'CRM & Sales'
  | 'HR & People'
  | 'Admin & Internal'
  | 'Analytics & Data'
  | 'Finance & Accounting'
  | 'Operations'
  | 'Customer Support'
  | 'Project Management'

export interface Template {
  id: string
  slug: string
  name: string
  category: TemplateCategory
  complexity: 'Simple' | 'Moderate' | 'Advanced'
  description: string
  tags: string[]
  fields: string[]
  thumbnail?: string
}
