'use client'

import { useEffect } from 'react'
import { useBuilderStore } from '@/store/builderStore'

export function BuilderStoreInitializer({ schema, projectId }: { schema: any, projectId: string }) {
  const setSchema = useBuilderStore((state) => state.setSchema)

  useEffect(() => {
    if (schema && Array.isArray(schema.nodes)) {
      setSchema(schema.nodes)
    } else if (schema && Array.isArray(schema.components)) {
      setSchema(schema.components)
    } else if (schema && Array.isArray(schema)) {
      setSchema(schema)
    }
  }, [schema, setSchema])

  // Optionally store projectId in state or context if needed for auto-saving
  
  return null
}
