import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })


const templates = [
  {
    slug: 'crm-workspace',
    name: 'CRM Workspace',
    category: 'CRM & Sales',
    complexity: 'Moderate',
    description: 'Full customer relationship management with contacts, deals pipeline, activity tracking, and reporting.',
    tags: ['crm', 'sales', 'contacts', 'pipeline', 'deals'],
    fields: ['Contacts Table', 'Deals Pipeline', 'Activity Feed', 'Email Log', 'Reports Dashboard'],
    schemaDefault: {
      components: [
        { id: 'nav', type: 'navbar', props: { title: 'CRM Workspace' } },
        { id: 'contacts', type: 'data-table', props: { title: 'Contacts', columns: ['Name','Email','Status','Value','Last Contact'] } },
        { id: 'pipeline', type: 'kanban', props: { title: 'Deals Pipeline', stages: ['Lead','Qualified','Proposal','Closed'] } },
        { id: 'activity', type: 'feed', props: { title: 'Activity Feed' } },
      ]
    }
  },
  {
    slug: 'hr-dashboard',
    name: 'HR Dashboard',
    category: 'HR & People',
    complexity: 'Simple',
    description: 'Employee management, onboarding tracker, leave requests, and team directory.',
    tags: ['hr', 'employees', 'onboarding', 'leave', 'people'],
    fields: ['Employee Directory', 'Onboarding Tracker', 'Leave Requests', 'Team Overview', 'Org Chart'],
    schemaDefault: {
      components: [
        { id: 'nav', type: 'navbar', props: { title: 'HR Dashboard' } },
        { id: 'metrics', type: 'metric-row', props: { metrics: ['Total Employees','Active','On Leave','New This Month'] } },
        { id: 'directory', type: 'data-table', props: { title: 'Employee Directory', columns: ['Name','Role','Department','Status','Start Date'] } },
        { id: 'onboarding', type: 'checklist', props: { title: 'Onboarding Tracker' } },
      ]
    }
  },
  {
    slug: 'admin-panel',
    name: 'Admin Panel',
    category: 'Admin & Internal',
    complexity: 'Simple',
    description: 'Internal admin panel with user management, settings, permissions, and activity logs.',
    tags: ['admin', 'users', 'settings', 'permissions', 'internal'],
    fields: ['User Management', 'Permissions Editor', 'Activity Logs', 'Settings Panel', 'System Status'],
    schemaDefault: {
      components: [
        { id: 'nav', type: 'navbar', props: { title: 'Admin Panel' } },
        { id: 'users', type: 'data-table', props: { title: 'Users', columns: ['Name','Email','Role','Status','Joined'] } },
        { id: 'logs', type: 'log-viewer', props: { title: 'Activity Logs' } },
        { id: 'settings', type: 'settings-form', props: { title: 'Settings' } },
      ]
    }
  },
  {
    slug: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    category: 'Analytics & Data',
    complexity: 'Advanced',
    description: 'Data analytics workspace with charts, metrics, custom reports, and data exports.',
    tags: ['analytics', 'charts', 'data', 'reports', 'metrics'],
    fields: ['Metrics Overview', 'Line Charts', 'Bar Charts', 'Data Table', 'Export Controls', 'Date Range Filter'],
    schemaDefault: {
      components: [
        { id: 'nav', type: 'navbar', props: { title: 'Analytics' } },
        { id: 'metrics', type: 'metric-row', props: { metrics: ['Revenue','Users','Conversion','Churn'] } },
        { id: 'chart1', type: 'line-chart', props: { title: 'Revenue Over Time' } },
        { id: 'chart2', type: 'bar-chart', props: { title: 'Users by Source' } },
      ]
    }
  },
  {
    slug: 'inventory-system',
    name: 'Inventory System',
    category: 'Operations',
    complexity: 'Moderate',
    description: 'Stock management, product catalog, purchase orders, and supplier tracking.',
    tags: ['inventory', 'stock', 'products', 'orders', 'suppliers'],
    fields: ['Product Catalog', 'Stock Levels', 'Purchase Orders', 'Supplier List', 'Low Stock Alerts'],
    schemaDefault: {
      components: [
        { id: 'nav', type: 'navbar', props: { title: 'Inventory' } },
        { id: 'products', type: 'data-table', props: { title: 'Products', columns: ['SKU','Name','Category','Stock','Status','Supplier'] } },
        { id: 'alerts', type: 'alert-list', props: { title: 'Low Stock Alerts' } },
        { id: 'orders', type: 'data-table', props: { title: 'Purchase Orders', columns: ['PO#','Supplier','Items','Total','Status'] } },
      ]
    }
  },
  {
    slug: 'support-workspace',
    name: 'Support Workspace',
    category: 'Customer Support',
    complexity: 'Moderate',
    description: 'Customer support ticketing, live queue, escalation management, and CSAT tracking.',
    tags: ['support', 'tickets', 'helpdesk', 'customer', 'queue'],
    fields: ['Ticket Queue', 'Ticket Detail', 'Customer Profile', 'Response Templates', 'CSAT Scores'],
    schemaDefault: {
      components: [
        { id: 'nav', type: 'navbar', props: { title: 'Support' } },
        { id: 'queue', type: 'ticket-list', props: { title: 'Open Tickets', filters: ['All','Open','Pending','Resolved'] } },
        { id: 'detail', type: 'ticket-detail', props: { title: 'Ticket Detail' } },
        { id: 'metrics', type: 'metric-row', props: { metrics: ['Open','Avg Response Time','CSAT','Resolved Today'] } },
      ]
    }
  },
  {
    slug: 'finance-tracker',
    name: 'Finance Tracker',
    category: 'Finance & Accounting',
    complexity: 'Advanced',
    description: 'Budget tracking, expense management, invoice generation, and financial reporting.',
    tags: ['finance', 'budget', 'expenses', 'invoices', 'accounting'],
    fields: ['Budget Overview', 'Expense Tracker', 'Invoice Manager', 'Financial Reports', 'Approval Flows'],
    schemaDefault: {
      components: [
        { id: 'nav', type: 'navbar', props: { title: 'Finance' } },
        { id: 'metrics', type: 'metric-row', props: { metrics: ['Total Budget','Spent','Remaining','Pending Approval'] } },
        { id: 'expenses', type: 'data-table', props: { title: 'Expenses', columns: ['Date','Category','Amount','Status','Submitter'] } },
        { id: 'invoices', type: 'data-table', props: { title: 'Invoices', columns: ['Invoice#','Client','Amount','Due Date','Status'] } },
      ]
    }
  },
  {
    slug: 'project-manager',
    name: 'Project Manager',
    category: 'Project Management',
    complexity: 'Moderate',
    description: 'Project tracking with tasks, milestones, team assignments, and progress dashboards.',
    tags: ['projects', 'tasks', 'milestones', 'team', 'productivity'],
    fields: ['Project List', 'Task Board', 'Milestone Tracker', 'Team Assignments', 'Progress Charts'],
    schemaDefault: {
      components: [
        { id: 'nav', type: 'navbar', props: { title: 'Projects' } },
        { id: 'projects', type: 'data-table', props: { title: 'Projects', columns: ['Name','Owner','Status','Due Date','Progress'] } },
        { id: 'tasks', type: 'kanban', props: { title: 'Tasks', stages: ['Todo','In Progress','Review','Done'] } },
        { id: 'timeline', type: 'timeline', props: { title: 'Milestones' } },
      ]
    }
  },
]

async function main() {
  console.log('Seeding templates...')
  for (const template of templates) {
    await prisma.template.upsert({
      where: { slug: template.slug },
      update: template,
      create: template,
    })
    console.log(`✓ ${template.name}`)
  }
  console.log('Seeding complete.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
