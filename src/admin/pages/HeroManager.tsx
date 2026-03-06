import { useEffect, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { AdminFormField } from '../components/AdminFormField'
import { useContentManager } from '../hooks/useContentManager'

export default function HeroManager() {
  const { data, setData } = useContentManager('hero')
  const [form, setForm] = useState(data)

  useEffect(() => {
    setForm(data)
  }, [data])

  const update = (key: keyof typeof form, value: string | number | boolean) => {
    if (key === 'backgroundType') {
      setForm((prev) => ({ ...prev, backgroundType: value === 'video' ? 'video' : 'image' }))
      return
    }
    setForm((prev) => ({ ...prev, [key]: String(value) }))
  }

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-2xl font-semibold text-text">Hero</h2>
        <p className="text-sm text-muted">Manage top visual section and primary CTA.</p>
      </header>
      <div className="grid gap-3 rounded-2xl border border-black/10 bg-white p-4 lg:grid-cols-2">
        <AdminFormField label="Title" value={form.title} onChange={(value) => update('title', value)} required />
        <AdminFormField label="Subtitle" value={form.subtitle} onChange={(value) => update('subtitle', value)} />
        <AdminFormField
          label="Background Type"
          type="select"
          value={form.backgroundType}
          options={[{ label: 'Image', value: 'image' }, { label: 'Video', value: 'video' }]}
          onChange={(value) => update('backgroundType', value)}
        />
        <AdminFormField label="Background URL" type="url" value={form.backgroundUrl} onChange={(value) => update('backgroundUrl', value)} />
        <AdminFormField label="Background Mobile URL" type="url" value={form.backgroundMobileUrl ?? ''} onChange={(value) => update('backgroundMobileUrl', value)} />
        <AdminFormField label="CTA Label" value={form.ctaLabel} onChange={(value) => update('ctaLabel', value)} />
        <AdminFormField label="CTA Link" value={form.ctaLink} onChange={(value) => update('ctaLink', value)} />
        <div className="lg:col-span-2">
          <AdminFormField label="Description" type="textarea" value={form.description} onChange={(value) => update('description', value)} />
        </div>
      </div>
      <Button onClick={() => setData(form)}>Save Hero</Button>
    </section>
  )
}
