import { defaultCmsContent, type CmsContent, validateCmsContent } from '../utils/cms'

const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID
const API_KEY = import.meta.env.VITE_JSONBIN_API_KEY
const API_ROOT = 'https://api.jsonbin.io/v3'
const LOCAL_STORAGE_KEY = 'ksensual-cms-local'

type CmsStorageMode = 'local' | 'jsonbin'

function isLocalHost(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
}

export function getCmsStorageMode(): CmsStorageMode {
  const configuredMode = import.meta.env.VITE_CMS_STORAGE?.toLowerCase()

  if (configuredMode === 'local' || configuredMode === 'jsonbin') {
    return configuredMode
  }

  return import.meta.env.DEV && isLocalHost() ? 'local' : 'jsonbin'
}

function assertBinId(): string {
  if (!BIN_ID) {
    throw new Error('VITE_JSONBIN_BIN_ID is not configured.')
  }

  return BIN_ID
}

function buildHeaders(includeWriteKey = false): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (API_KEY) {
    headers['X-Master-Key'] = API_KEY
  } else if (includeWriteKey) {
    throw new Error('VITE_JSONBIN_API_KEY is not configured.')
  }

  return headers
}

function extractRecord(payload: unknown): unknown {
  if (typeof payload === 'object' && payload !== null && 'record' in payload) {
    return (payload as { record: unknown }).record
  }

  return payload
}

function getLocalStorageContent(): CmsContent {
  if (typeof window === 'undefined') {
    throw new Error('localStorage mode is only available in the browser.')
  }

  const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!stored) {
    return defaultCmsContent
  }

  try {
    const parsed = JSON.parse(stored) as unknown
    const validation = validateCmsContent(parsed)
    if (!validation.ok) {
      throw new Error(validation.errors.join(' '))
    }
    return validation.data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown localStorage parsing error.'
    throw new Error(`Failed to read local CMS data: ${message}`)
  }
}

function saveLocalStorageContent(content: CmsContent): CmsContent {
  if (typeof window === 'undefined') {
    throw new Error('localStorage mode is only available in the browser.')
  }

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(content))
  return content
}

export async function fetchCmsContent(signal?: AbortSignal): Promise<CmsContent> {
  if (getCmsStorageMode() === 'local') {
    const content = getLocalStorageContent()
    if (!window.localStorage.getItem(LOCAL_STORAGE_KEY)) {
      saveLocalStorageContent(content)
    }
    return content
  }

  const response = await fetch(`${API_ROOT}/b/${assertBinId()}/latest`, {
    method: 'GET',
    headers: buildHeaders(false),
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch CMS data (${response.status}).`)
  }

  const payload = (await response.json()) as unknown
  const validation = validateCmsContent(extractRecord(payload))

  if (!validation.ok) {
    throw new Error(validation.errors.join(' '))
  }

  return validation.data
}

export async function saveCmsContent(content: CmsContent): Promise<CmsContent> {
  const validation = validateCmsContent(content)

  if (!validation.ok) {
    throw new Error(validation.errors.join(' '))
  }

  if (getCmsStorageMode() === 'local') {
    return saveLocalStorageContent(validation.data)
  }

  const response = await fetch(`${API_ROOT}/b/${assertBinId()}`, {
    method: 'PUT',
    headers: buildHeaders(true),
    body: JSON.stringify(validation.data),
  })

  if (!response.ok) {
    throw new Error(`Failed to save CMS data (${response.status}).`)
  }

  const payload = (await response.json()) as unknown
  const saved = validateCmsContent(extractRecord(payload))

  if (!saved.ok) {
    return validation.data
  }

  return saved.data
}
