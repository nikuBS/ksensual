import type { EventCmsBundle } from '../types/contentSchema'

const CONTENT_STORAGE_KEY = 'ksensual-event-cms-draft-v1'

export function readDraftBundle(): EventCmsBundle | null {
  try {
    const raw = window.localStorage.getItem(CONTENT_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as EventCmsBundle
  } catch {
    return null
  }
}

export function writeDraftBundle(bundle: EventCmsBundle) {
  window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(bundle))
}

export function removeDraftBundle() {
  window.localStorage.removeItem(CONTENT_STORAGE_KEY)
}

export function exportBundleToFile(bundle: EventCmsBundle) {
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  const day = new Date().toISOString().slice(0, 10)
  anchor.href = url
  anchor.download = `ksensual-content-${day}.json`
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export async function importBundleFromFile(file: File): Promise<unknown> {
  const text = await file.text()
  return JSON.parse(text)
}
