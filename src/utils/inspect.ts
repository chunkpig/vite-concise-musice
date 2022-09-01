import { getCookies, setCookies, removeCookies } from '@/utils/cookies.ts'
export function inspect(title: string) {
  return typeof getCookies(title) !== 'string' ? getCookies(title) : null
}
