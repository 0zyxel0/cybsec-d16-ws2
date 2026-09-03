import { getCookie } from 'h3'

export default defineEventHandler((event) => {
  const sessionCookie = getCookie(event, 'sessionCookie')

  if (!sessionCookie) {
    return {
      authenticated: false,
      student: null
    }
  }

  try {
    const session = JSON.parse(sessionCookie)

    if (!session?.id) {
      return {
        authenticated: false,
        student: null
      }
    }

    return {
      authenticated: true,
      student: session
    }
  } catch (error) {
    console.error('Invalid session cookie:', error)

    return {
      authenticated: false,
      student: null
    }
  }
})