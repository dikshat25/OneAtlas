import { create } from 'zustand'
import { ComponentNode } from '@/types'
import { mockSchema } from '@/data/builder-schema'

interface BuilderState {
  schema: ComponentNode[]
  selectedNodeId: string | null
  isSimulating: boolean
  version: number
  appName: string
  setSchema: (schema: ComponentNode[]) => void
  setSelectedNodeId: (id: string | null) => void
  setIsSimulating: (isSimulating: boolean) => void
  setVersion: (version: number) => void
  setAppName: (name: string) => void
  updateNodeProp: (nodeId: string, propKey: string, value: any) => void
}

export const useBuilderStore = create<BuilderState>((set) => ({
  schema: mockSchema,
  selectedNodeId: null,
  isSimulating: false,
  version: 1,
  appName: 'CRM Workspace',
  setSchema: (schema) => set({ schema }),
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
  setIsSimulating: (isSimulating) => set({ isSimulating }),
  setVersion: (version) => set({ version }),
  setAppName: (appName) => set({ appName }),
  updateNodeProp: (nodeId, propKey, value) => set((state) => {
    // Deep clone and update node prop
    const updateNode = (nodes: ComponentNode[]): ComponentNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, props: { ...node.props, [propKey]: value } }
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) }
        }
        return node
      })
    }
    return { schema: updateNode(state.schema) }
  }),
}))
