<template>
  <div class="min-h-screen bg-cyber-bg flex items-center justify-center p-4 selection:bg-cyber-primary selection:text-black">
    <div class="max-w-md w-full">
      <!-- Brand / Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center p-3 bg-cyber-primary/10 border border-cyber-primary rounded-xl mb-3 shadow-lg">
          <svg class="w-8 h-8 text-cyber-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div class="flex items-center justify-center gap-2 mb-1">
          <span class="text-[10px] font-bold uppercase tracking-widest text-cyber-primary bg-cyber-primary/10 px-2.5 py-0.5 rounded border border-cyber-primary/20">SOC AUTHENTICATION GATEWAY</span>
        </div>
        <h1 class="text-2xl font-black text-white tracking-tight">TechNova Cyber Range</h1>
        <p class="text-xs text-slate-400 mt-1 font-mono">Agent Identity Verification & Access Terminal</p>
      </div>

      <!-- Login Card -->
      <div class="bg-cyber-card border border-cyber-border rounded-xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-primary via-cyber-accent to-cyber-primary"></div>

        <!-- Terminal Status Header -->
        <div class="flex items-center justify-between border-b border-cyber-border/70 pb-3 mb-6 font-mono text-[11px]">
          <span class="text-slate-400 flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-cyber-primary animate-ping"></span>
            SYS: SECURE_PORT_443
          </span>
          <span class="text-cyber-accent">SESSION: NEW</span>
        </div>

        <!-- Error Message Banner -->
        <div v-if="errorMessage" class="mb-5 bg-red-950/40 border border-red-500/50 rounded-lg p-3 text-xs text-red-300 flex items-start gap-2.5">
          <svg class="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="font-mono">{{ errorMessage }}</div>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
              Agent Email / Identity
            </label>
            <input
              v-model="email"
              type="email"
              required
              autocomplete="email"
              placeholder="agent@metrotech.org"
              class="w-full bg-[#070A12] text-xs text-slate-100 rounded-lg px-3.5 py-2.5 border border-cyber-border focus:border-cyber-primary outline-none transition font-mono"
              :disabled="isLoading"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
              Security Passcode
            </label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                autocomplete="current-password"
                placeholder="••••••••••••"
                class="w-full bg-[#070A12] text-xs text-slate-100 rounded-lg px-3.5 py-2.5 pr-10 border border-cyber-border focus:border-cyber-primary outline-none transition font-mono"
                :disabled="isLoading"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                tabindex="-1"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
              >
                <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
              </button>
            </div>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              :disabled="isLoading || !email.trim() || !password"
              class="w-full bg-cyber-primary hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-500 text-black font-extrabold text-xs uppercase tracking-wider py-3 px-4 rounded-lg transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              <svg v-if="isLoading" class="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isLoading ? 'AUTHENTICATING AGENT...' : 'INITIALIZE MISSION' }}</span>
            </button>
          </div>
        </form>

        <div class="mt-6 pt-4 border-t border-cyber-border/70 text-center font-mono text-[10px] text-slate-500">
          Operation: "Bad Invoice" • Tier 1 Threat Analysis
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'

definePageMeta({
  middleware: []
})

const store = useCybersecurityGameStore()
const route = useRoute()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  if (route.query.env === 'dev') {
    store.isDevMode = true
  }

  try {
    const session: any = await $fetch('/api/session')
    if (session?.authenticated && session?.student) {
      store.setStudent(session.student)
      return navigateTo({ path: '/game', query: route.query })
    }
  } catch {
    // Not authenticated, stay on login page
  }
})

const handleLogin = async () => {
  if (!email.value || !password.value) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const res: any = await $fetch('/api/login', {
      method: 'POST',
      body: {
        email: email.value.trim(),
        password: password.value
      }
    })

    if (res?.success && res?.student) {
      store.setStudent(res.student)
      store.startGame()
      return navigateTo({ path: '/game', query: route.query })
    } else {
      errorMessage.value = 'Authentication rejected. Check credentials.'
    }
  } catch (err: any) {
    console.error('Login error:', err)
    errorMessage.value = err?.data?.statusMessage || err?.message || 'Access Denied: Invalid agent credentials'
  } finally {
    isLoading.value = false
  }
}
</script>