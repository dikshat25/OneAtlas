'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-32 overflow-hidden bg-primary-dark">
      {/* CSS-only Animated Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[100px] mix-blend-screen animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-pink/20 rounded-full blur-[120px] mix-blend-screen animate-float-medium pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Pill Badge */}
        <div className="mb-8 inline-flex items-center px-4 py-1.5 rounded-full bg-lavender/10 border border-lavender/20 backdrop-blur-sm">
          <span className="text-sm font-semibold text-lavender tracking-wide">
            AI-Native App Platform
          </span>
        </div>

        {/* Headlines */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-6 max-w-4xl leading-[1.1]">
          Build Internal Tools.<br />
          Deploy in Seconds.
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
          OneAtlas generates operational apps, dashboards, and workflows from a single prompt. No code. No waiting. Just ship.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-gradient-brand text-white hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-primary/25">
            Start Building
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/20 text-white bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm">
            View Templates
          </Button>
        </div>

        {/* Social Proof */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex -space-x-3">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="w-10 h-10 rounded-full border-2 border-primary-dark bg-secondary flex items-center justify-center overflow-hidden"
              >
                {/* Mock Avatar */}
                <div className={`w-full h-full bg-gradient-to-br from-primary-light to-pink opacity-${80 - i * 10}`} />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 text-yellow">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-white/80">Trusted by 2,400+ teams</span>
          </div>
        </div>
      </div>

      {/* Floating Mockup UI */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 px-4 hidden md:block">
        <div className="relative aspect-[16/9] rounded-2xl border border-white/10 bg-navy/80 shadow-2xl overflow-hidden backdrop-blur-xl animate-float-slow">
          {/* Mock Window Header */}
          <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="mx-auto text-xs text-white/50 font-mono">oneatlas.dev/builder</div>
          </div>
          {/* Mock Window Content */}
          <div className="p-8 flex gap-6 h-[calc(100%-48px)]">
            <div className="w-64 border-r border-white/10 flex flex-col gap-4">
              <div className="h-8 w-3/4 bg-white/10 rounded-md" />
              <div className="h-4 w-1/2 bg-white/5 rounded-md" />
              <div className="h-4 w-2/3 bg-white/5 rounded-md" />
              <div className="h-4 w-3/4 bg-white/5 rounded-md" />
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="h-10 w-48 bg-white/10 rounded-md" />
                <div className="h-10 w-32 bg-primary rounded-md" />
              </div>
              <div className="flex-1 bg-white/5 rounded-xl border border-white/10 p-6 flex flex-col gap-4">
                <div className="h-12 w-full bg-white/5 rounded-md" />
                <div className="h-12 w-full bg-white/5 rounded-md" />
                <div className="h-12 w-full bg-white/5 rounded-md" />
              </div>
            </div>
          </div>
          {/* Conversational Mock Strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-14 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center px-6">
            <div className="text-white/60 text-sm">✨ Add a revenue chart below the table...</div>
          </div>
        </div>
      </div>
    </section>
  )
}
