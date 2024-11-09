// utils/getLastPathSegment.ts
export const getLastPathSegment = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean)
  return segments[segments.length - 1] || ''
}
