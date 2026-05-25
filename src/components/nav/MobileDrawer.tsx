'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { X, ChevronDown, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/data/nav'
import { Button } from '@/components/ui/button'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
        aria-hidden="true" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto flex flex-col transition-transform transform translate-x-0">
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center text-white font-bold text-lg">
              O
            </div>
            <span className="text-xl font-bold text-heading">OneAtlas</span>
          </Link>
          <button
            type="button"
            className="p-2 rounded-md text-body hover:text-primary hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary outline-none"
            onClick={onClose}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-4">
          {navItems.map((item) => {
            const hasDropdown = ['Product', 'Use Cases', 'Templates', 'Resources', 'Community'].includes(item.label)
            return (
              <div key={item.label} className="border-b border-border/50 pb-4 last:border-0">
                {hasDropdown ? (
                  <details className="group">
                    <summary className="flex items-center justify-between text-base font-semibold text-heading cursor-pointer list-none">
                      {item.label}
                      <ChevronDown className="h-5 w-5 text-muted transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="mt-3 pl-4 space-y-3">
                      {/* Placeholder items for mobile dropdowns to keep it simple */}
                      <Link href={item.href !== '#' ? item.href : '/'} className="block text-sm text-body" onClick={onClose}>
                        Overview
                      </Link>
                      <Link href="#" className="block text-sm text-body" onClick={onClose}>
                        View All
                      </Link>
                    </div>
                  </details>
                ) : (
                  <Link 
                    href={item.href} 
                    className="block text-base font-semibold text-heading"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border bg-secondary/50">
          <div className="flex flex-col gap-3">
            <Button variant="outline" className="w-full justify-center" onClick={onClose}>
              Login
            </Button>
            <Button className="w-full justify-center bg-gradient-brand text-white" onClick={onClose}>
              Start Building
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
