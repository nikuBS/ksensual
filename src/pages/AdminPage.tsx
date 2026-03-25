import { useEffect, useMemo, useState } from 'react'
import { fetchCmsContent, getCmsStorageMode, saveCmsContent } from '../api/jsonbin'
import { SitePreview } from '../components/cms/SitePreview'
import { Button } from '../components/ui/Button'
import { Input, Textarea } from '../components/ui/Input'
import { defaultCmsContent, formatCmsJson, parseCmsJson, type CmsContent, type SiteStatus } from '../utils/cms'

type SaveState = {
  kind: 'idle' | 'success' | 'error'
  message: string
}

function getMessageClass(kind: SaveState['kind']): string {
  if (kind === 'success') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700'
  }

  if (kind === 'error') {
    return 'border-rose-200 bg-rose-50 text-rose-700'
  }

  return 'border-black/10 bg-white/60 text-muted'
}

function updateStatus(rawJson: string, nextStatus: SiteStatus): string {
  const result = parseCmsJson(rawJson)

  if (!result.ok) {
    return rawJson
  }

  return formatCmsJson({
    ...result.data,
    status: nextStatus,
  })
}

function MaintenancePreview({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white/85 px-6 py-10 text-center shadow-[0_18px_60px_rgba(6,50,71,0.1)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(16,183,198,0.18),transparent_28%),radial-gradient(circle_at_bottom,rgba(255,221,166,0.2),transparent_30%)]" />
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accentSoft">Maintenance</p>
      <h3 className="mt-4 text-3xl font-heading text-[#063247]">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted">{subtitle}</p>
    </div>
  )
}

export default function AdminPage() {
  const [rawJson, setRawJson] = useState<string>(formatCmsJson(defaultCmsContent))
  const [remoteStatus, setRemoteStatus] = useState<SiteStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [saveState, setSaveState] = useState<SaveState>({ kind: 'idle', message: 'Load JSONbin data to begin editing.' })
  const [passwordInput, setPasswordInput] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)

  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD
  const storageMode = getCmsStorageMode()

  useEffect(() => {
    if (!adminPassword) {
      setIsUnlocked(true)
    }
  }, [adminPassword])

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setSaveState({ kind: 'idle', message: 'Fetching latest JSONbin data...' })
        const content = await fetchCmsContent(controller.signal)
        setRawJson(formatCmsJson(content))
        setRemoteStatus(content.status)
        setSaveState({ kind: 'idle', message: 'JSONbin data loaded successfully.' })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown fetch error.'
        setSaveState({ kind: 'error', message })
      } finally {
        setLoading(false)
      }
    }

    void load()

    return () => controller.abort()
  }, [refreshKey])

  const parsed = useMemo(() => parseCmsJson(rawJson), [rawJson])
  const previewContent: CmsContent | null = parsed.ok ? parsed.data : null
  const currentStatus = previewContent?.status ?? remoteStatus
  const previewImage = previewContent?.main.heroImage ?? ''

  function handleUnlock() {
    if (!adminPassword) {
      setIsUnlocked(true)
      return
    }

    if (passwordInput === adminPassword) {
      setIsUnlocked(true)
      setSaveState({ kind: 'idle', message: 'Admin access unlocked.' })
      return
    }

    setSaveState({ kind: 'error', message: 'Admin password does not match.' })
  }

  function handleToggleStatus(nextStatus: SiteStatus) {
    setRawJson((currentRawJson) => updateStatus(currentRawJson, nextStatus))
  }

  async function handleSave() {
    const result = parseCmsJson(rawJson)

    if (!result.ok) {
      setSaveState({ kind: 'error', message: result.errors.join(' ') })
      return
    }

    try {
      setSaving(true)
      const saved = await saveCmsContent(result.data)
      setRawJson(formatCmsJson(saved))
      setRemoteStatus(saved.status)
      setSaveState({ kind: 'success', message: 'CMS data saved to JSONbin successfully.' })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown save error.'
      setSaveState({ kind: 'error', message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen px-3 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="rounded-[28px] border border-black/10 bg-white/75 p-6 shadow-[0_18px_60px_rgba(6,50,71,0.12)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accentSoft">Admin CMS</p>
              <h1 className="mt-3 font-heading text-4xl text-[#063247] sm:text-5xl">JSONbin Operations Panel</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted sm:text-base">
                Edit landing content, switch service status, validate raw JSON, and preview the result before saving.
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-accentSoft">
                Storage target: {storageMode === 'local' ? 'LOCAL_STORAGE' : 'JSONBIN'}
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-base/70 px-4 py-3 text-sm text-muted">
              <p>Remote status: <span className="font-semibold text-[#063247]">{remoteStatus ?? 'UNKNOWN'}</span></p>
              <p>Editing status: <span className="font-semibold text-[#063247]">{currentStatus ?? 'UNKNOWN'}</span></p>
            </div>
          </div>
        </section>

        {!isUnlocked ? (
          <section className="rounded-[28px] border border-black/10 bg-white/75 p-6 shadow-[0_18px_60px_rgba(6,50,71,0.12)] backdrop-blur sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accentSoft">Authentication</p>
            <h2 className="mt-3 text-2xl font-bold text-[#063247]">Simple Admin Gate</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              This is only a lightweight front-end guard. Because GitHub Pages is static, any API key bundled into the site can still be exposed in the browser.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Input
                type="password"
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.target.value)}
                placeholder="Enter admin password"
              />
              <Button type="button" onClick={handleUnlock}>Unlock Admin</Button>
            </div>
          </section>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
            <section className="rounded-[28px] border border-black/10 bg-white/75 p-6 shadow-[0_18px_60px_rgba(6,50,71,0.12)] backdrop-blur sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accentSoft">Controls</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#063247]">Service Status + Raw JSON</h2>
                </div>
                <Button type="button" variant="outline" onClick={() => setRefreshKey((value) => value + 1)} disabled={loading}>
                  Reload Remote Data
                </Button>
              </div>

              <div className="mt-6 rounded-[24px] border border-black/10 bg-base/70 p-5">
                <p className="text-sm font-semibold text-[#063247]">Service status</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    type="button"
                    onClick={() => handleToggleStatus('OPEN')}
                    variant={currentStatus === 'OPEN' ? 'primary' : 'outline'}
                    disabled={loading}
                  >
                    OPEN
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleToggleStatus('MAINTENANCE')}
                    variant={currentStatus === 'MAINTENANCE' ? 'primary' : 'outline'}
                    disabled={loading}
                  >
                    MAINTENANCE
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="cms-json" className="text-sm font-semibold text-[#063247]">Raw JSON editor</label>
                <Textarea
                  id="cms-json"
                  value={rawJson}
                  onChange={(event) => setRawJson(event.target.value)}
                  className="mt-3 min-h-[420px] font-mono text-xs leading-6"
                  spellCheck={false}
                />
              </div>

              <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${getMessageClass(saveState.kind)}`}>
                {loading ? 'Loading remote data...' : saveState.message}
              </div>

              {!parsed.ok ? (
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  {parsed.errors.join(' ')}
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                <Button type="button" onClick={handleSave} disabled={saving || loading}>
                  {saving ? 'Saving...' : 'Save to JSONbin'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setRawJson(formatCmsJson(defaultCmsContent))}
                  disabled={saving}
                >
                  Load Example JSON
                </Button>
              </div>

              {previewImage ? (
                <div className="mt-6 rounded-[24px] border border-black/10 bg-base/70 p-4">
                  <p className="text-sm font-semibold text-[#063247]">Hero image preview</p>
                  <img src={previewImage} alt="Hero preview" className="mt-3 h-52 w-full rounded-2xl object-cover" />
                </div>
              ) : null}
            </section>

            <section className="rounded-[28px] border border-black/10 bg-white/75 p-6 shadow-[0_18px_60px_rgba(6,50,71,0.12)] backdrop-blur sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accentSoft">Preview</p>
              <h2 className="mt-2 text-2xl font-bold text-[#063247]">Before Save</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Validate content visually before publishing. If the status is set to maintenance, the public site will switch to the maintenance screen.
              </p>
              <div className="mt-6">
                {previewContent ? (
                  previewContent.status === 'MAINTENANCE' ? (
                    <MaintenancePreview title={previewContent.main.title} subtitle={previewContent.main.subtitle} />
                  ) : (
                    <SitePreview content={previewContent} compact />
                  )
                ) : (
                  <div className="rounded-[24px] border border-dashed border-black/15 px-6 py-10 text-center text-sm text-muted">
                    Fix JSON validation errors to render the preview.
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        <section className="rounded-[28px] border border-black/10 bg-white/75 p-6 shadow-[0_18px_60px_rgba(6,50,71,0.12)] backdrop-blur sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accentSoft">Security Notes</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-base/70 p-4 text-sm leading-6 text-muted">
              Front-end API keys are exposed after build. Treat this setup as operational convenience, not strong security.
            </div>
            <div className="rounded-2xl border border-black/10 bg-base/70 p-4 text-sm leading-6 text-muted">
              Use a hidden admin route, a simple password gate, and a dedicated JSONbin for admin-managed content.
            </div>
            <div className="rounded-2xl border border-black/10 bg-base/70 p-4 text-sm leading-6 text-muted">
              For stronger protection, move write operations to a serverless function and keep the master key off the client.
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
