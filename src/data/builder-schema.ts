import { ComponentNode } from '@/types'

export const mockSchema: ComponentNode[] = [
  {
    id: 'root',
    name: 'CRM Workspace',
    type: 'AppLayout',
    props: {},
    children: [
      {
        id: 'layout',
        name: 'Layout',
        type: 'Container',
        props: {},
        children: [
          {
            id: 'header',
            name: 'Header',
            type: 'TopNav',
            props: {},
            children: [
              { id: 'appTitle', name: 'AppTitle', type: 'Text', props: { text: 'CRM' } },
              { id: 'navLinks', name: 'NavLinks', type: 'LinkGroup', props: {} }
            ]
          },
          {
            id: 'main',
            name: 'Main',
            type: 'MainContent',
            props: {},
            children: [
              {
                id: 'contactsTable',
                name: 'ContactsTable',
                type: 'DataTable',
                props: { dataSource: 'contacts_table', filters: 'status = active', sort: 'created_at DESC' },
                children: [
                  { id: 'searchBar', name: 'SearchBar', type: 'Input', props: { placeholder: 'Search contacts...' } },
                  { id: 'filterDropdown', name: 'FilterDropdown', type: 'Dropdown', props: {} },
                  { id: 'dataGrid', name: 'DataGrid', type: 'Grid', props: {} }
                ]
              },
              {
                id: 'sidePanel',
                name: 'SidePanel',
                type: 'Panel',
                props: {},
                children: [
                  { id: 'contactDetail', name: 'ContactDetail', type: 'Card', props: {} },
                  { id: 'activityFeed', name: 'ActivityFeed', type: 'List', props: {} }
                ]
              }
            ]
          },
          {
            id: 'footer',
            name: 'Footer',
            type: 'BottomNav',
            props: {},
            children: [
              { id: 'statusBar', name: 'StatusBar', type: 'Status', props: {} }
            ]
          }
        ]
      }
    ]
  }
]
