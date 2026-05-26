'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export function useTemplate() {
  const router  = useRouter()
  const [loading, setLoading] = useState(false)

  const applyTemplate = async (templateSlug: string, templateName: string) => {
    setLoading(true)
    try {
      toast.loading(`Setting up ${templateName}...`)

      const res = await fetch('/api/apps', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name:       templateName,
          templateId: templateSlug,
        }),
      })

      if (!res.ok) throw new Error('Failed to create app')

      const { data: app } = await res.json()

      toast.dismiss()
      toast.success('App created! Opening builder...')
      router.push(`/builder?appId=${app.id}`)
    } catch (err) {
      toast.dismiss()
      toast.error('Could not create app. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return { applyTemplate, loading }
}
