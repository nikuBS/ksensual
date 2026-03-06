import type { ContentSectionKey, EventCmsBundle } from '../types/contentSchema'
import { useEventContent } from '../../content/ContentContext'

export function useContentManager<K extends ContentSectionKey>(section: K) {
  const { content, updateSection, isLoading, error } = useEventContent()

  const data = content[section]
  const setData = (next: EventCmsBundle[K]) => {
    updateSection(section, next)
  }

  return {
    data,
    setData,
    isLoading,
    error,
  }
}
