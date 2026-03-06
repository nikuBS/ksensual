import { Input, Textarea } from '../../components/ui/Input'

type FieldOption = {
  label: string
  value: string
}

type AdminFormFieldProps = {
  label: string
  type?: 'text' | 'textarea' | 'number' | 'checkbox' | 'date' | 'time' | 'url' | 'select'
  value: string | number | boolean
  onChange: (next: string | number | boolean) => void
  options?: FieldOption[]
  placeholder?: string
  required?: boolean
}

export function AdminFormField({
  label,
  type = 'text',
  value,
  onChange,
  options = [],
  placeholder,
  required = false,
}: AdminFormFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-text">{label}</span>
      {type === 'textarea' ? (
        <Textarea
          value={String(value)}
          required={required}
          placeholder={placeholder}
          rows={4}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : null}
      {type === 'select' ? (
        <select
          className="w-full rounded-2xl border border-black/15 bg-base/60 px-4 py-3 text-sm text-text"
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}
      {type === 'checkbox' ? (
        <input
          type="checkbox"
          checked={Boolean(value)}
          className="h-4 w-4 rounded border-black/20"
          onChange={(event) => onChange(event.target.checked)}
        />
      ) : null}
      {!['textarea', 'checkbox', 'select'].includes(type) ? (
        <Input
          type={type}
          value={String(value)}
          required={required}
          placeholder={placeholder}
          onChange={(event) => onChange(type === 'number' ? Number(event.target.value) : event.target.value)}
        />
      ) : null}
    </label>
  )
}
