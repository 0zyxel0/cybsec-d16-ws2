import { deleteCookie } from 'h3'

export default defineEventHandler((event) => {
  deleteCookie(event, 'sessionCookie', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })

  return {
    success: true
  }
})