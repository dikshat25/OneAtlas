import React from 'react'
import { Button } from '@/components/ui/button'

export default function SupportPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6">How can we help?</h1>
      <p className="text-lg text-body mb-12">Our support team is available 24/7 to help you build and deploy your applications.</p>
      
      <div className="w-full bg-white p-8 rounded-2xl border border-border shadow-sm flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
          ?
        </div>
        <h3 className="text-xl font-bold text-heading">Contact Support</h3>
        <p className="text-body max-w-md">Need technical assistance or have a question about your account? Create a ticket and we'll get back to you shortly.</p>
        <Button className="bg-gradient-brand text-white">Open a Ticket</Button>
      </div>
    </div>
  )
}
