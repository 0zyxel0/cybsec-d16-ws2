<template>
  <header class="border-b border-cyber-border bg-[#0E1524] sticky top-0 z-50 no-print">
    <div class="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
      <!-- Logo & Title -->
      <div class="flex items-center space-x-3">
        <div class="bg-cyber-primary/10 border border-cyber-primary p-2 rounded-lg animate-pulse">
          <svg class="w-6 h-6 text-cyber-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-cyber-primary bg-cyber-primary/10 px-2 py-0.5 rounded">Tier 1 SOC Simulator</span>
            <span class="text-xs text-slate-400">v2.5</span>
          </div>
          <h1 class="text-lg font-extrabold tracking-tight text-white">Operation "Bad Invoice"</h1>
        </div>
      </div>

      <!-- Controls & User Status -->
      <div class="flex flex-wrap items-center gap-3">
        <!-- Logged-in Student Info (Student ID & Email) -->
        <div v-if="store.student" class="flex items-center gap-2.5 bg-cyber-card border border-cyber-border px-3.5 py-1.5 rounded-lg shadow-inner font-mono">
          <div class="w-2 h-2 rounded-full bg-cyber-primary animate-pulse flex-shrink-0"></div>
          <div class="text-xs leading-tight">
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Student ID:</span>
              <span class="text-cyber-accent font-bold">{{ store.student.studentNumber || store.student.id }}</span>
            </div>
            <div class="text-[11px] text-slate-300 truncate max-w-[160px] sm:max-w-[200px]" :title="store.student.email">
              {{ store.student.email }}
            </div>
          </div>
        </div>

        <!-- Live Score / Verification Indicator -->
        <div class="bg-cyber-card border border-cyber-border px-3.5 py-1.5 rounded-lg flex items-center gap-3 shadow-inner">
          <div class="text-right">
            <div class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Verification Score</div>
            <div class="text-sm font-black mono flex items-center justify-end gap-1.5" :class="store.scoreColor">
              <span>{{ store.score }}%</span>
              <span class="text-xs text-slate-500 font-normal">({{ store.correctAnswersCount }}/{{ store.totalAnswerFields }})</span>
            </div>
          </div>
          <div class="w-12 bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <div class="bg-cyber-primary h-full transition-all duration-300" :style="{ width: store.score + '%' }"></div>
          </div>
        </div>

        <!-- Student Profile & Actions -->
        <div class="flex items-center gap-2">
          <!-- Dev Mode Test Submit Button (Active when env=dev) -->
          <button
            v-if="isDev"
            @click="store.triggerDevTestSubmit()"
            class="px-2.5 py-1.5 text-xs bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 font-mono font-bold rounded-lg border border-amber-500/60 shadow-lg shadow-amber-500/15 transition flex items-center gap-1.5 cursor-pointer animate-pulse"
            title="Dev Mode: Auto-fill 100% score and open test submit modal"
          >
            <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Test Submit</span>
          </button>

          <button @click="store.showInstructions = true" class="px-2.5 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition flex items-center gap-1.5 cursor-pointer">
            <svg class="w-4 h-4 text-cyber-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="hidden sm:inline">Mission Guide</span>
          </button>

          <button @click="store.toggleHints" class="px-2.5 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition flex items-center gap-1.5 cursor-pointer" :class="{ 'text-amber-400 border-amber-500/30': store.hintsEnabled }">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span class="hidden sm:inline">{{ store.hintsEnabled ? 'Hints On' : 'Hints Off' }}</span>
          </button>

          <button @click="store.logout()" class="px-2.5 py-1.5 text-xs bg-red-950/40 hover:bg-red-900/60 text-red-300 rounded-lg border border-red-800/40 transition flex items-center gap-1 cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'

const store = useCybersecurityGameStore()
const route = useRoute()

const isDev = computed(() => {
  return route.query.env === 'dev' || store.isDevMode
})

onMounted(() => {
  if (route.query.env === 'dev') {
    store.isDevMode = true
  }
})
</script>