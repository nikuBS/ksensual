import { useEffect, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { AdminFormField } from '../components/AdminFormField'
import { useContentManager } from '../hooks/useContentManager'

export default function EventManager() {
  const { data, setData } = useContentManager('eventInfo')
  const [form, setForm] = useState(data)

  useEffect(() => {
    setForm(data)
  }, [data])

  const update = (key: keyof typeof form, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [key]: String(value) }))
  }

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-2xl font-semibold text-text">Event Info</h2>
        <p className="text-sm text-muted">Single-record event metadata for public pages.</p>
      </header>
      <div className="grid gap-3 rounded-2xl border border-black/10 bg-white p-4 lg:grid-cols-2">
        <AdminFormField label="Event Name" value={form.name} onChange={(value) => update('name', value)} required />
        <AdminFormField label="Slogan" value={form.slogan} onChange={(value) => update('slogan', value)} />
        <AdminFormField label="Start Date" type="date" value={form.startDate} onChange={(value) => update('startDate', value)} required />
        <AdminFormField label="End Date" type="date" value={form.endDate} onChange={(value) => update('endDate', value)} required />
        <AdminFormField label="Venue Name" value={form.venueName} onChange={(value) => update('venueName', value)} />
        <AdminFormField label="Address" value={form.address} onChange={(value) => update('address', value)} />
        <AdminFormField label="Google Maps Link" type="url" value={form.googleMapLink} onChange={(value) => update('googleMapLink', value)} />
        <AdminFormField label="Ticket Link" type="url" value={form.ticketLink} onChange={(value) => update('ticketLink', value)} />
        <AdminFormField label="Poster URL" type="url" value={form.posterImage} onChange={(value) => update('posterImage', value)} />
        <AdminFormField label="Primary CTA" value={form.primaryCtaText} onChange={(value) => update('primaryCtaText', value)} />
        <div className="lg:col-span-2">
          <AdminFormField label="Description" type="textarea" value={form.description} onChange={(value) => update('description', value)} />
        </div>
      </div>
      <Button onClick={() => setData(form)}>Save Event Info</Button>
    </section>
  )
}
