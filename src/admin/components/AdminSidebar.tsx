import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/utils'

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/event', label: 'Event Info' },
  { to: '/admin/hero', label: 'Hero' },
  { to: '/admin/artists', label: 'Artists' },
  { to: '/admin/workshops', label: 'Workshops' },
  { to: '/admin/parties', label: 'Parties' },
  { to: '/admin/schedule', label: 'Schedule' },
  { to: '/admin/gallery', label: 'Gallery' },
  { to: '/admin/faq', label: 'FAQ' },
  { to: '/admin/notices', label: 'Notices' },
]

export function AdminSidebar() {
  return (
    <aside className="w-full border-b border-black/10 bg-white/70 p-4 backdrop-blur lg:w-64 lg:border-b-0 lg:border-r">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted">K-SENSUAL CMS</p>
      <nav className="grid gap-1">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'rounded-xl px-3 py-2 text-sm font-medium text-muted transition hover:bg-black/5 hover:text-text',
                isActive && 'bg-black/5 text-text',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
