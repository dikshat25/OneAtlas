'use client'

import React, { useState } from 'react'
import { submitSupportTicket } from '@/app/actions/support'
import { Button } from '@/components/ui/button'

export default function SupportPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    const formData = new FormData(e.currentTarget)
    const result = await submitSupportTicket(formData)
    
    if (result.success) {
      setStatus('success')
      e.currentTarget.reset()
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6">How can we help?</h1>
      <p className="text-lg text-body mb-12">Our support team is available 24/7 to help you build and deploy your applications.</p>
      
      <form className="w-full" onSubmit={handleSubmit}>
        {status === 'success' && (
          <div className="p-4 bg-green-500/10 text-green-600 rounded-lg text-sm font-medium border border-green-500/20 mb-6">
            Your ticket has been submitted successfully.
          </div>
        )}
        {status === 'error' && (
          <div className="p-4 bg-red-500/10 text-red-500 rounded-lg text-sm font-medium border border-red-500/20 mb-6">
            There was an error submitting your ticket.
          </div>
        )}
        <div className="w-full bg-white p-8 rounded-2xl border border-border shadow-sm flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
            ?
          </div>
          <h3 className="text-xl font-bold text-heading">Contact Support</h3>
          <p className="text-body max-w-md">Need technical assistance or have a question about your account? Create a ticket and we'll get back to you shortly.</p>
          
          <div className="w-full space-y-4 text-left">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-heading mb-1">Email</label>
              <input type="email" id="email" name="email" required className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-heading mb-1">Subject</label>
              <input type="text" id="subject" name="subject" required className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-heading mb-1">Message</label>
              <textarea id="message" name="message" required rows={4} className="w-full p-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"></textarea>
            </div>
          </div>

          <Button type="submit" disabled={status === 'loading'} className="w-full bg-gradient-brand hover:opacity-90 text-white rounded-lg py-6 mt-2">
            {status === 'loading' ? 'Submitting...' : 'Submit Ticket'}
          </Button>
        </div>
      </form>
    </div>
  )
}
