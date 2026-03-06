import { cn } from '../../lib/utils'

type StatusBadgeProps = {
  isPublished: boolean
}

export function StatusBadge({ isPublished }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700',
      )}
    >
      {isPublished ? 'Published' : 'Draft'}
    </span>
  )
}
