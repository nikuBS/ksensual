import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { useEventContent } from '../../content/ContentContext'

const links = [
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

export default function AdminDashboard() {
  const { content } = useEventContent()

  const stats = [
    { label: 'Artists', value: content.artists.length },
    { label: 'Workshops', value: content.workshops.length },
    { label: 'Parties', value: content.parties.length },
    { label: 'Gallery', value: content.gallery.length },
    { label: 'FAQ', value: content.faq.length },
    { label: 'Notices', value: content.notices.length },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-text">Event CMS Dashboard</h2>
        <p className="mt-1 text-sm text-muted">Manage static JSON content and export changes for repository sync.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-white">
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-text">{stat.value}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {links.map((item) => (
          <Link key={item.to} to={item.to} className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-text transition hover:bg-black/5">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
