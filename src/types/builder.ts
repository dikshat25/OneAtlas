export interface ComponentNode {
  id: string
  name: string
  type: string
  children?: ComponentNode[]
  props: Record<string, unknown>
}

export interface SchemaVersion {
  version: number
  timestamp: string
  components: ComponentNode[]
}
