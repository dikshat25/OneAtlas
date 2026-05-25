'use client'

import { useEffect } from 'react'
import { useBuilderStore } from '@/store/builderStore'

export function BuilderStoreInitializer({ schema, projectId }: { schema: any, projectId: string }) {
  const setRootNode = useBuilderStore((state) => state.setRootNode)

  useEffect(() => {
    if (schema) {
      setRootNode(schema)
    }
  }, [schema, setRootNode])

  // Optionally store projectId in state or context if needed for auto-saving
  
  return null
}
