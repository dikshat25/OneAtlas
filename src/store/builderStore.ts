import { create } from 'zustand'
import { ComponentNode } from '@/types'
import { mockSchema } from '@/data/builder-schema'

interface BuilderState {
  schema: ComponentNode[]
  selectedNodeId: string | null
  isSimulating: boolean
  setSchema: (schema: ComponentNode[]) => void
  setSelectedNodeId: (id: string | null) => void
  setIsSimulating: (isSimulating: boolean) => void
}

export const useBuilderStore = create<BuilderState>((set) => ({
  schema: mockSchema,
  selectedNodeId: null,
  isSimulating: false,
  setSchema: (schema) => set({ schema }),
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
  setIsSimulating: (isSimulating) => set({ isSimulating }),
}))
