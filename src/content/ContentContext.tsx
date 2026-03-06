import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { ContentSectionKey, EventCmsBundle } from '../admin/types/contentSchema'
import { normalizeBundle } from '../admin/utils/contentHelpers'
import { exportBundleToFile, importBundleFromFile, removeDraftBundle, writeDraftBundle } from '../admin/utils/contentStorage'
import { EMPTY_CONTENT } from './defaultContent'
import { loadEventContent } from './contentRepository'

type ContentContextValue = {
  content: EventCmsBundle
  baseContent: EventCmsBundle
  isLoading: boolean
  error: string | null
  updateSection: <K extends ContentSectionKey>(key: K, value: EventCmsBundle[K]) => void
  replaceBundle: (next: EventCmsBundle) => void
  resetToBase: () => void
  exportJson: () => void
  importJson: (file: File) => Promise<void>
}

const EventContentContext = createContext<ContentContextValue | null>(null)

export function EventContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<EventCmsBundle>(EMPTY_CONTENT)
  const [baseContent, setBaseContent] = useState<EventCmsBundle>(EMPTY_CONTENT)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    loadEventContent()
      .then(({ base, current }) => {
        if (!isMounted) return
        setBaseContent(base)
        setContent(current)
      })
      .catch((err: unknown) => {
        if (!isMounted) return
        setError(err instanceof Error ? err.message : 'Failed to load content')
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const updateSection = <K extends ContentSectionKey>(key: K, value: EventCmsBundle[K]) => {
    setContent((prev) => {
      const next = { ...prev, [key]: value }
      writeDraftBundle(next)
      return next
    })
  }

  const replaceBundle = (next: EventCmsBundle) => {
    const normalized = normalizeBundle(baseContent, next)
    setContent(normalized)
    writeDraftBundle(normalized)
  }

  const resetToBase = () => {
    setContent(baseContent)
    removeDraftBundle()
  }

  const exportJson = () => {
    exportBundleToFile(content)
  }

  const importJson = async (file: File) => {
    const candidate = await importBundleFromFile(file)
    const normalized = normalizeBundle(baseContent, candidate)
    setContent(normalized)
    writeDraftBundle(normalized)
  }

  const value = useMemo<ContentContextValue>(
    () => ({
      content,
      baseContent,
      isLoading,
      error,
      updateSection,
      replaceBundle,
      resetToBase,
      exportJson,
      importJson,
    }),
    [content, baseContent, isLoading, error],
  )

  return <EventContentContext.Provider value={value}>{children}</EventContentContext.Provider>
}

export function useEventContent() {
  const context = useContext(EventContentContext)
  if (!context) {
    throw new Error('useEventContent must be used inside EventContentProvider')
  }
  return context
}
