'use client'

import React, { useState } from 'react'
import { Sparkles, ArrowUp } from 'lucide-react'

export function BuilderChatStrip() {
  const [input, setInput] = useState('')

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-20">
      <div className="bg-white rounded-full shadow-2xl border border-primary/20 flex items-center p-2 pl-4 transition-all focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary">
        <Sparkles className="w-5 h-5 text-primary shrink-0" />
        <input 
          type="text" 
          placeholder="Describe changes to the layout or components..."
          className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-heading placeholder:text-muted"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            input.trim() ? 'bg-primary text-white hover:bg-primary-light' : 'bg-secondary text-muted cursor-not-allowed'
          }`}
          disabled={!input.trim()}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
