import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Execute client-side check as per spec
  if (import.meta.server) {
    return
  }

  const store = useCybersecurityGameStore()

  try {
    const session: any = await $fetch('/api/session')

    if (!session || session?.authenticated === false || !session?.student) {
      store.setStudent(null)
      return navigateTo('/login')
    }

    store.setStudent(session.student)
  } catch (error) {
    console.error('Authentication check failed in middleware:', error)
    store.setStudent(null)
    return navigateTo('/login')
  }
})