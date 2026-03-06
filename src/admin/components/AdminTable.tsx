import type { ReactNode } from 'react'
import { Button } from '../../components/ui/Button'
import type { Publishable } from '../types/contentSchema'
import { StatusBadge } from './StatusBadge'

type AdminTableProps<T extends Publishable> = {
  rows: T[]
  columns: Array<{ key: string; header: string; render: (row: T) => string | number | ReactNode }>
  onEdit: (row: T) => void
  onDelete: (row: T) => void
  onTogglePublish: (row: T) => void
}

export function AdminTable<T extends Publishable>({ rows, columns, onEdit, onDelete, onTogglePublish }: AdminTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-base/80 text-left">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-semibold text-text">
                {column.header}
              </th>
            ))}
            <th className="px-4 py-3 font-semibold text-text">Status</th>
            <th className="px-4 py-3 font-semibold text-text">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-black/10">
              {columns.map((column) => (
                <td key={`${row.id}-${column.key}`} className="px-4 py-3 text-muted">
                  {column.render(row)}
                </td>
              ))}
              <td className="px-4 py-3">
                <StatusBadge isPublished={row.isPublished} />
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(row)}>Edit</Button>
                  <Button size="sm" variant="outline" onClick={() => onTogglePublish(row)}>
                    {row.isPublished ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => onDelete(row)}>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
