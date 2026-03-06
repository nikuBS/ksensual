import { useMemo, useState, type ReactNode } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { createId, sortByOrder } from '../utils/contentHelpers'
import type { Publishable } from '../types/contentSchema'
import { AdminFormField } from '../components/AdminFormField'
import { AdminTable } from '../components/AdminTable'
import { EmptyState } from '../components/EmptyState'

type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'date' | 'time' | 'url' | 'select'

type FieldConfig<T> = {
  key: string
  label: string
  type?: FieldType
  placeholder?: string
  options?: Array<{ label: string; value: string }>
  required?: boolean
  getValue?: (item: T) => string | number | boolean
  setValue?: (item: T, value: string | number | boolean) => T
}

type CollectionManagerPageProps<T extends Publishable> = {
  title: string
  description: string
  itemLabel: string
  data: T[]
  onChange: (next: T[]) => void
  searchKeys: Array<keyof T>
  fields: FieldConfig<T>[]
  columns: Array<{ key: string; header: string; render: (row: T) => string | number | ReactNode }>
  createEmpty: () => T
}

export function CollectionManagerPage<T extends Publishable>({
  title,
  description,
  itemLabel,
  data,
  onChange,
  searchKeys,
  fields,
  columns,
  createEmpty,
}: CollectionManagerPageProps<T>) {
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<T | null>(null)

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase()
    const sorted = sortByOrder(data)
    if (!lower) return sorted
    return sorted.filter((item) =>
      searchKeys.some((key) => String(item[key] ?? '').toLowerCase().includes(lower)),
    )
  }, [data, query, searchKeys])

  const startCreate = () => {
    setEditing({ ...createEmpty(), id: createId(itemLabel.toLowerCase()) })
  }

  const onEdit = (item: T) => {
    setEditing(item)
  }

  const upsert = () => {
    if (!editing) return
    const exists = data.some((item) => item.id === editing.id)
    const next = exists
      ? data.map((item) => (item.id === editing.id ? editing : item))
      : [...data, editing]
    onChange(next)
    setEditing(null)
  }

  const remove = (target: T) => {
    onChange(data.filter((item) => item.id !== target.id))
    if (editing?.id === target.id) setEditing(null)
  }

  const toggle = (target: T) => {
    onChange(data.map((item) => (item.id === target.id ? { ...item, isPublished: !item.isPublished } : item)))
    if (editing?.id === target.id) {
      setEditing({ ...target, isPublished: !target.isPublished })
    }
  }

  const applyFieldValue = (field: FieldConfig<T>, value: string | number | boolean) => {
    if (!editing) return
    if (field.setValue) {
      setEditing(field.setValue(editing, value))
      return
    }
    setEditing({ ...editing, [field.key]: value } as T)
  }

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-2xl font-semibold text-text">{title}</h2>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </header>
      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input value={query} placeholder={`Search ${itemLabel.toLowerCase()}...`} onChange={(event) => setQuery(event.target.value)} />
            <Button onClick={startCreate}>Add {itemLabel}</Button>
          </div>
          {filtered.length === 0 ? (
            <EmptyState title={`No ${itemLabel} found`} description="Try another search query or create a new entry." />
          ) : (
            <AdminTable rows={filtered} columns={columns} onEdit={onEdit} onDelete={remove} onTogglePublish={toggle} />
          )}
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-4">
          <h3 className="text-lg font-semibold text-text">{editing ? `Edit ${itemLabel}` : `Create ${itemLabel}`}</h3>
          <div className="mt-3 grid gap-3">
            {fields.map((field) => (
              <AdminFormField
                key={field.key}
                label={field.label}
                type={field.type}
                value={editing ? (field.getValue ? field.getValue(editing) : (editing as Record<string, string | number | boolean>)[field.key] ?? '') : ''}
                required={field.required}
                options={field.options}
                placeholder={field.placeholder}
                onChange={(value) => applyFieldValue(field, value)}
              />
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={upsert} disabled={!editing}>Save</Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Clear</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
