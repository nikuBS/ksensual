const ASSET_VERSION = import.meta.env.VITE_ASSET_VERSION ?? '20260305'

/**
 * public 정적 파일 경로에 버전 파라미터를 붙여 캐시 갱신을 유도한다.
 * 예: assetPath('placeholders/a.png') -> /ksensual/placeholders/a.png?v=20260305
 */
export function assetPath(path: string): string {
  if (/^(https?:\/\/|data:|blob:)/.test(path)) return path
  const baseUrl = import.meta.env.BASE_URL
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  const duplicatedBasePrefix = `${normalizedBase}${normalizedBase.slice(1)}`
  const normalizedInput = path.startsWith(duplicatedBasePrefix)
    ? path.replace(duplicatedBasePrefix, normalizedBase)
    : path

  const isAlreadyAbsolute = normalizedInput.startsWith('/')
  const isAlreadyBased = normalizedInput.startsWith(normalizedBase)
  const hasVersion = /(?:\?|&)v=/.test(normalizedInput)

  if ((isAlreadyAbsolute || isAlreadyBased) && hasVersion) {
    return normalizedInput
  }

  const normalizedPath = normalizedInput.startsWith('/')
    ? normalizedInput.startsWith(normalizedBase)
      ? normalizedInput
      : `${normalizedBase}${normalizedInput.slice(1)}`
    : `${normalizedBase}${normalizedInput}`
  const url = isAlreadyBased ? normalizedInput : normalizedPath
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}v=${ASSET_VERSION}`
}
