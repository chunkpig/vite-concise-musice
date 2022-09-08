import { getCookies, setCookies, removeCookies } from '@/utils/cookies.ts'
export function inspect(title: string) {
  console.log(getCookies(title))
  return typeof getCookies(title) !== 'string' ? getCookies(title) : null
}
