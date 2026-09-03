import { deleteCookie } from 'h3'

export default defineEventHandler((event) => {
  deleteCookie(event, 'sessionCookie', {
    path: '/'
  })

  return {
    success: true
  }
})