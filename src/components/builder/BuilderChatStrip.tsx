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
    await new Promise(resolve => setTimeout(resolve, 1200))
    setIsTyping(false)

    // Generate mock response based on keywords
    const lowerInput = userMessage.toLowerCase()
    let responseText = `Applied your edit. Schema updated to v${version + 1}.`

    if (lowerInput.includes('add')) {
      const match = lowerInput.match(/add (\w+)/)
      const field = match ? match[1] : 'Button'
      responseText = `Added ${field} to the schema. Schema updated to v${version + 1}.`
      
      // Inject mock node
      setSchema([...schema, {
        id: `mock-${Date.now()}`,
        name: field.charAt(0).toUpperCase() + field.slice(1),
        type: 'default',
        props: { title: `New ${field}` }
      }])

    } else if (lowerInput.includes('remove') || lowerInput.includes('delete')) {
      const match = lowerInput.match(/(?:remove|delete) (\w+)/)
      const comp = match ? match[1] : 'component'
      responseText = `Removed ${comp}. Schema updated to v${version + 1}.`
      
      if (schema.length > 0) {
        setSchema(schema.slice(0, -1))
      }
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
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[640px] px-4 z-20 flex flex-col gap-3">
      {/* Chat History */}
      {messages.length > 0 && (
        <div className="bg-[#FAFAFA]/95 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-border max-h-[360px] overflow-y-auto p-5 flex flex-col gap-4 custom-scrollbar">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2.5 max-w-[85%] text-[14px] leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-2xl rounded-tr-sm' 
                  : 'bg-white text-heading rounded-2xl rounded-tl-sm border border-border'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="px-4 py-3.5 bg-white text-heading rounded-2xl rounded-tl-sm border border-border shadow-sm flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-border flex items-center p-2 pl-5 transition-all focus-within:border-[#D1D5DB] focus-within:shadow-[0_12px_48px_rgba(0,0,0,0.12)]">
        <Sparkles className="w-5 h-5 text-primary shrink-0" />
        <input 
          type="text" 
          placeholder="Ask OneAtlas to build or modify something..."
          className="flex-1 bg-transparent border-none outline-none px-4 text-[15px] font-medium text-heading placeholder:text-muted placeholder:font-normal"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm ${
            input.trim() ? 'bg-primary text-white hover:bg-primary/90' : 'bg-[#FAFAFA] text-muted cursor-not-allowed border border-border'
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
