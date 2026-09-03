<template>
  <div class="flex items-center justify-center min-h-screen bg-cyber-bg text-slate-100">
    <div class="text-center p-8 bg-cyber-card border border-cyber-border rounded-xl shadow-2xl max-w-md w-full mx-4">
      <div class="inline-block p-4 rounded-full bg-cyber-primary/10 border border-cyber-primary mb-4 animate-pulse">
        <svg class="w-8 h-8 text-cyber-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      </div>
      <h2 class="text-xl font-bold tracking-tight text-white mb-2">TechNova SOC Simulator</h2>
      <p class="text-xs text-slate-400 font-mono mb-4">Verifying agent session security token...</p>
      <div class="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
        <div class="bg-cyber-primary h-full w-2/3 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'

const store = useCybersecurityGameStore()
const route = useRoute()

onMounted(async () => {
  if (route.query.env === 'dev') {
    store.isDevMode = true
  }

  try {
    const session: any = await $fetch('/api/auth/session')
    if (session?.authenticated && session?.student) {
      store.setStudent(session.student)
      return navigateTo({ path: '/game', query: route.query })
    } else {
      store.setStudent(null)
      return navigateTo({ path: '/login', query: route.query })
    }
  } catch (error) {
    store.setStudent(null)
    return navigateTo({ path: '/login', query: route.query })
  }
})
</script>