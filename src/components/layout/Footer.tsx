'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from '@/data/nav'

export function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/builder')) return null

  return (
    <footer className="bg-black pt-20 pb-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm w-fit">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">
                O
              </div>
              <span className="text-xl font-bold text-white">OneAtlas</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              The AI-native platform for building and deploying internal tools, operational dashboards, and workflow apps.
            </p>
            <div className="flex gap-4">
              {/* Mock Social Icons */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-surface/5 hover:bg-surface/10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer" />
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-3">
              {navItems.slice(0, 4).map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Resources</h4>
            <ul className="space-y-3">
              {['Documentation', 'API Reference', 'Blog', 'Community', 'Help Center'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-3">
              {['About', 'Careers', 'Privacy Policy', 'Terms of Service', 'Contact'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} OneAtlas, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}

