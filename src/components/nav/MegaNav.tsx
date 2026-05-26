'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Menu, ChevronDown, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/data/nav'
import { Button } from '@/components/ui/button'
import { MobileDrawer } from './MobileDrawer'

export function MegaNav() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (pathname?.startsWith('/builder')) return null

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-200 ease-in-out',
        isScrolled
          ? 'bg-[#F5F5EE]/92 backdrop-blur-md border-b border-[#E5E7EB]'
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="layout h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group outline-none">
              <span className="text-[20px] font-bold text-[#111111] tracking-tight">
                OneAtlas
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-[32px]">
            {navItems.map((item) => {
              const hasDropdown = ['Product', 'Use Cases', 'Templates', 'Resources', 'Community'].includes(item.label)
              
              return (
                <div 
                  key={item.label} 
                  className="relative h-[72px] flex items-center group"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center text-[15px] font-medium text-[#4B5563] hover:text-[#111111] transition-colors"
                  >
                    {item.label}
                    {hasDropdown && <ChevronDown className="ml-1 h-[14px] w-[14px] opacity-60" />}
                  </Link>

                  {/* Dropdowns */}
                  {hasDropdown && activeDropdown === item.label && (
                    <div className="absolute top-[72px] left-1/2 -translate-x-1/2 pt-1">
                      <div className="bg-white rounded-2xl shadow-card border border-[#E5E7EB] overflow-hidden">
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

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/support" className="text-[15px] font-medium text-[#4B5563] hover:text-[#111111] transition-colors">
              Contact Sales
            </Link>
            {session ? (
              <>
                <button 
                  onClick={() => signOut()} 
                  className="text-[15px] font-medium text-[#4B5563] hover:text-[#111111] transition-colors"
                >
                  Sign Out
                </button>
                <Button asChild className="h-10 px-4 text-[14px] rounded-xl bg-[#FF6600] text-white hover:bg-[#E65C00] transition-colors">
                  <Link href="/dashboard">My Apps</Link>
                </Button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => signIn()} 
                  className="text-[15px] font-medium text-[#4B5563] hover:text-[#111111] transition-colors"
                >
                  Login
                </button>
                <Button asChild className="h-10 px-4 text-[14px] rounded-xl bg-[#FF6600] text-white hover:bg-[#E65C00] transition-colors">
                  <Link href="/builder">Start Building</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#4B5563]"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  )
}

function TemplatesDropdown() {
  return (
    <div className="w-[800px] p-8 grid grid-cols-3 gap-8">
      <div>
        <h3 className="label mb-4">By Category</h3>
        <ul className="space-y-3">
          {['CRM', 'HR', 'Admin', 'Analytics', 'Inventory', 'Support'].map(item => (
            <li key={item}>
              <Link href={`/templates?category=${item.toLowerCase()}`} className="text-[15px] text-[#6B7280] hover:text-[#111111] transition-colors block">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="label mb-4">By Complexity</h3>
        <ul className="space-y-3 mb-6">
          {['Simple', 'Moderate', 'Advanced'].map(item => (
            <li key={item}>
              <Link href={`/templates?complexity=${item.toLowerCase()}`} className="text-[15px] text-[#6B7280] hover:text-[#111111] transition-colors block">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="label mb-4">Trending</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4 items-center group cursor-pointer">
              <div className="w-12 h-12 bg-[#F5F5EE] rounded-[12px] border border-[#ECECEC] group-hover:border-[#D1D5DB] transition-colors" />
              <div>
                <p className="text-[15px] font-medium text-[#111111]">Template {i}</p>
                <p className="text-[13px] text-[#9CA3AF]">Business Ops</p>
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
    <div className="w-[600px] p-8 grid grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h4 className="text-[15px] font-medium text-[#111111]">Runtime-Generated Apps</h4>
          <p className="text-[14px] text-[#6B7280] mt-1">Apps stay editable after generation. Not static exports.</p>
        </div>
        <div>
          <h4 className="text-[15px] font-medium text-[#111111]">Multi-Model AI Gateway</h4>
          <p className="text-[14px] text-[#6B7280] mt-1">Route to the right model for every task.</p>
        </div>
      </div>
      <div className="bg-[#FAFAFA] border border-[#ECECEC] p-6 rounded-[16px] flex flex-col justify-end">
        <h3 className="text-[16px] font-semibold text-[#111111] mb-2">What's new in v2</h3>
        <p className="text-[14px] text-[#6B7280] mb-4">Enterprise RBAC and custom domains are now live.</p>
        <Button asChild variant="secondary" size="sm" className="w-fit text-[13px]">
          <Link href="/blog">Read Announcement</Link>
        </Button>
      </div>
    </div>
  )
}

function UseCasesDropdown() {
  return (
    <div className="w-[400px] p-8 grid grid-cols-2 gap-x-6 gap-y-6">
      {['Operations', 'HR & People', 'Finance', 'Customer Support', 'Founders', 'Product Managers'].map(item => (
        <Link key={item} href={`/templates?category=${item.toLowerCase().split(' ')[0]}`} className="group block">
          <h4 className="text-[15px] font-medium text-[#111111] group-hover:text-[#FF6600] transition-colors">{item}</h4>
          <p className="text-[13px] text-[#9CA3AF] mt-1">Build {item.toLowerCase()} apps</p>
        </Link>
      ))}
    </div>
  )
}

function ResourcesDropdown() {
  return (
    <div className="w-[200px] py-2">
      {['Docs', 'Help Center', 'Blog', 'Updates'].map(item => (
        <Link 
          key={item} 
          href={item === 'Help Center' ? '/support' : item === 'Updates' ? '/blog' : `/${item.toLowerCase().replace(' ', '-')}`} 
          className="block px-6 py-2.5 text-[15px] text-[#4B5563] hover:bg-[#FAFAFA] hover:text-[#111111]"
        >
          {item}
        </Link>
      ))}
      <div className="h-px bg-[#ECECEC] my-2" />
      <Link href="#" className="flex items-center justify-between px-6 py-2.5 text-[15px] text-[#4B5563] hover:bg-[#FAFAFA] hover:text-[#111111]">
        YouTube <ExternalLink className="h-3 w-3" />
      </Link>
    </div>
  )
}

function CommunityDropdown() {
  return (
    <div className="w-[200px] py-2">
      {['Discord', 'LinkedIn', 'Twitter / X', 'Reddit', 'GitHub', 'Instagram'].map(item => (
        <Link key={item} href="#" className="block px-6 py-2.5 text-[15px] text-[#4B5563] hover:bg-[#FAFAFA] hover:text-[#111111]">
          {item}
        </Link>
      ))}
    </div>
  )
}
