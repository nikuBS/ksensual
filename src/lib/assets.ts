const ASSET_VERSION = import.meta.env.VITE_ASSET_VERSION ?? '20260305'

/**
 * public 정적 파일 경로에 버전 파라미터를 붙여 캐시 갱신을 유도한다.
 * 예: assetPath('placeholders/a.png') -> /ksensual/placeholders/a.png?v=20260305
 */
export function assetPath(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path
  const baseUrl = import.meta.env.BASE_URL
  const url = `${baseUrl}${normalizedPath}`
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}v=${ASSET_VERSION}`
}

