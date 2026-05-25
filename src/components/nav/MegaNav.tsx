'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/data/nav'
import { Button } from '@/components/ui/button'
import { MobileDrawer } from './MobileDrawer'

export function MegaNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out',
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center text-white font-bold text-lg">
                O
              </div>
              <span className="text-xl font-bold text-heading group-hover:text-primary transition-colors">
                OneAtlas
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const hasDropdown = ['Product', 'Use Cases', 'Templates', 'Resources', 'Community'].includes(item.label)
              
              return (
                <div 
                  key={item.label} 
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center px-3 py-2 text-sm font-medium text-body hover:text-primary rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                  >
                    {item.label}
                    {hasDropdown && <ChevronDown className="ml-1 h-4 w-4 opacity-50" />}
                  </Link>

                  {/* Dropdowns */}
                  {hasDropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 outline-none">
                      <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
                        {item.label === 'Templates' && <TemplatesDropdown />}
                        {item.label === 'Product' && <ProductDropdown />}
                        {item.label === 'Use Cases' && <UseCasesDropdown />}
                        {item.label === 'Resources' && <ResourcesDropdown />}
                        {item.label === 'Community' && <CommunityDropdown />}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-body hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-2"
            >
              Login
            </Link>
            <Button 
              className="bg-gradient-brand hover:opacity-90 text-white rounded-full transition-transform hover:scale-105"
            >
              Start Building
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-body hover:text-primary hover:bg-secondary outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  )
}

function TemplatesDropdown() {
  return (
    <div className="w-[800px] p-6 grid grid-cols-3 gap-8">
      <div>
        <h3 className="text-sm font-semibold text-heading mb-4 uppercase tracking-wider">By Category</h3>
        <ul className="space-y-3">
          {['CRM', 'HR', 'Admin', 'Analytics', 'Inventory', 'Support'].map(item => (
            <li key={item}>
              <Link href={`/templates?category=${item.toLowerCase()}`} className="text-sm text-body hover:text-primary transition-colors block">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-heading mb-4 uppercase tracking-wider">By Complexity</h3>
        <ul className="space-y-3 mb-6">
          {['Simple', 'Moderate', 'Advanced'].map(item => (
            <li key={item}>
              <Link href={`/templates?complexity=${item.toLowerCase()}`} className="text-sm text-body hover:text-primary transition-colors block">
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <div className="bg-secondary p-4 rounded-lg border border-border">
          <p className="text-xs font-semibold text-primary mb-1">Featured</p>
          <p className="text-sm text-heading font-medium">CRM Workspace</p>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-heading mb-4 uppercase tracking-wider">Trending</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-3 items-center group cursor-pointer">
              <div className="w-12 h-12 bg-muted-bg rounded border border-border group-hover:border-primary transition-colors" />
              <div>
                <p className="text-sm font-medium text-heading group-hover:text-primary transition-colors">Template {i}</p>
                <p className="text-xs text-muted">Business Ops</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductDropdown() {
  return (
    <div className="w-[600px] p-6 grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-heading">Runtime-Generated Apps</h4>
          <p className="text-xs text-muted mt-1">Apps stay editable after generation. Not static exports.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-heading">Multi-Model AI Gateway</h4>
          <p className="text-xs text-muted mt-1">Route to the right model for every task.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-heading">Incremental Edits</h4>
          <p className="text-xs text-muted mt-1">Conversational edits mutate schema incrementally.</p>
        </div>
      </div>
      <div className="bg-gradient-brand p-6 rounded-xl text-white flex flex-col justify-end min-h-[200px]">
        <h3 className="font-bold text-lg mb-2">What's new in v2</h3>
        <p className="text-sm opacity-90 mb-4">Enterprise RBAC and custom domains are now live.</p>
        <Button variant="secondary" size="sm" className="w-fit text-primary font-semibold">
          Read Announcement
        </Button>
      </div>
    </div>
  )
}

function UseCasesDropdown() {
  return (
    <div className="w-[400px] p-6 grid grid-cols-2 gap-x-4 gap-y-6">
      {['Operations', 'HR & People', 'Finance', 'Customer Support', 'Founders', 'Product Managers'].map(item => (
        <Link key={item} href="#" className="group block">
          <h4 className="text-sm font-semibold text-heading group-hover:text-primary transition-colors">{item}</h4>
          <p className="text-xs text-muted mt-1">Build {item.toLowerCase()} apps</p>
        </Link>
      ))}
    </div>
  )
}

function ResourcesDropdown() {
  return (
    <div className="w-[200px] py-2">
      {['Docs', 'Help Center', 'Blog', 'Updates'].map(item => (
        <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} className="block px-4 py-2 text-sm text-body hover:bg-secondary hover:text-primary">
          {item}
        </Link>
      ))}
      <div className="h-px bg-border my-1" />
      <Link href="#" className="flex items-center justify-between px-4 py-2 text-sm text-body hover:bg-secondary hover:text-primary">
        YouTube <ExternalLink className="h-3 w-3" />
      </Link>
    </div>
  )
}

function CommunityDropdown() {
  return (
    <div className="w-[200px] py-2">
      {['Discord', 'LinkedIn', 'Twitter / X', 'Reddit', 'GitHub', 'Instagram'].map(item => (
        <Link key={item} href="#" className="block px-4 py-2 text-sm text-body hover:bg-secondary hover:text-primary">
          {item}
        </Link>
      ))}
    </div>
  )
}
