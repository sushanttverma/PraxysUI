'use client'

import DataTable from '@/app/components/ui/data-table'

interface User {
  name: string
  email: string
  role: string
  status: string
  [key: string]: unknown
}

const users: User[] = [
  { name: 'Alice Chen', email: 'alice@praxys.xyz', role: 'Admin', status: 'Active' },
  { name: 'Bob Wilson', email: 'bob@praxys.xyz', role: 'Developer', status: 'Active' },
  { name: 'Charlie Kim', email: 'charlie@praxys.xyz', role: 'Designer', status: 'Away' },
  { name: 'Diana Lopez', email: 'diana@praxys.xyz', role: 'Developer', status: 'Active' },
  { name: 'Eve Johnson', email: 'eve@praxys.xyz', role: 'Manager', status: 'Offline' },
]

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (row: User) => {
      const color =
        row.status === 'Active'
          ? 'text-green-400'
          : row.status === 'Away'
            ? 'text-amber-400'
            : 'text-text-faint'
      return (
        <span className={`flex items-center gap-1.5 ${color}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {row.status}
        </span>
      )
    },
  },
]

export default function DataTableDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-2xl mx-auto">
      <div className="w-full">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
          Click column headers to sort
        </p>
        <DataTable columns={columns} data={users} striped hoverable />
      </div>
    </div>
  )
}
