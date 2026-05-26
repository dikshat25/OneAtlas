'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Sparkles, ArrowUp } from 'lucide-react'
import { useBuilderStore } from '@/store/builderStore'

type Message = {
  id: string
  role: 'user' | 'ai'
  content: string
}

export function BuilderChatStrip() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const { version, setVersion, schema, setSchema } = useBuilderStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMessage }])
    
    // Typing indicator
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsTyping(false)

    // Generate mock response based on keywords
    const lowerInput = userMessage.toLowerCase()
    let responseText = `Applied your edit. Schema updated to v${version + 1}.`

    if (lowerInput.includes('add')) {
      // Very naive extraction for the mock: just take the word after 'add'
      const match = lowerInput.match(/add (\w+)/)
      const field = match ? match[1] : 'Button'
      responseText = `Added ${field} to the schema. Schema updated to v${version + 1}.`
      
      // Inject mock node!
      setSchema([...schema, {
        id: `mock-${Date.now()}`,
        type: 'Button',
        props: { children: `New ${field}`, variant: 'default' }
      }])

    } else if (lowerInput.includes('remove') || lowerInput.includes('delete')) {
      const match = lowerInput.match(/(?:remove|delete) (\w+)/)
      const comp = match ? match[1] : 'component'
      responseText = `Removed ${comp}. Schema updated to v${version + 1}.`
      
      // Pop last node if possible
      if (schema.length > 0) {
        setSchema(schema.slice(0, -1))
      }
    } else if (lowerInput.includes('rename')) {
      responseText = `Renamed successfully. Schema updated to v${version + 1}.`
    } else if (lowerInput.includes('move') || lowerInput.includes('reorder')) {
      responseText = `Reordered components. Schema updated to v${version + 1}.`
    }

    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: responseText }])
    setVersion(version + 1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-20 flex flex-col gap-4">
      {/* Chat History */}
      {messages.length > 0 && (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-card border border-[#E5E7EB] max-h-[400px] overflow-y-auto p-4 flex flex-col gap-4 mb-2">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-[14px] ${
                msg.role === 'user' 
                  ? 'bg-[#FF6600] text-white rounded-br-sm' 
                  : 'bg-[#F5F5EE] text-[#111111] rounded-bl-sm border border-[#E5E7EB]'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl bg-[#F5F5EE] text-[#111111] rounded-bl-sm border border-[#E5E7EB] flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-[#111111]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-[#111111]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-[#111111]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input */}
      <div className="bg-white rounded-full shadow-hover border border-[#E5E7EB] flex items-center p-2 pl-4 transition-all focus-within:border-[#D1D5DB]">
        <Sparkles className="w-5 h-5 text-[#FF6600] shrink-0" />
        <input 
          type="text" 
          placeholder="Describe changes to the layout or components..."
          className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-heading placeholder:text-muted"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            input.trim() ? 'bg-[#FF6600] text-white' : 'bg-[#F5F5EE] text-[#9CA3AF] cursor-not-allowed border border-[#E5E7EB]'
          }`}
          disabled={!input.trim()}
          onClick={handleSend}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

