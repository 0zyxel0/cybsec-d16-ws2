<template>
  <div v-if="store.showDevTestModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto no-print">
    <!-- Persistent Modal Container -->
    <div class="bg-cyber-card border-2 border-amber-500/80 max-w-2xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 relative my-8 animate-in fade-in zoom-in duration-300">
      <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-500 rounded-t-2xl"></div>

      <!-- Close button -->
      <button
        @click="store.showDevTestModal = false"
        class="absolute top-4 right-4 text-slate-400 hover:text-white text-sm bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-700 transition cursor-pointer"
        title="Close Test Modal"
      >
        ✕
      </button>

      <!-- Terminal Header -->
      <div class="flex items-center space-x-2 text-xs font-mono text-amber-400 mb-4 pb-3 border-b border-cyber-border">
        <span class="h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping"></span>
        <span class="font-bold tracking-wider">[DEV ENVIRONMENT] TEST SUBMIT CONSOLE</span>
      </div>

      <!-- Auto-Fill Success Banner -->
      <div class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 font-mono text-xs">
        <div class="flex items-center gap-2 text-amber-300 font-bold mb-1">
          <svg class="w-4 h-4 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
          </svg>
          PERFECT SCORE ACTIVITY LOADED (100%)
        </div>
        <p class="text-slate-300 text-[11px] leading-relaxed">
          All 11 IoC fields and the Tier 2 Escalation synthesis memo have been populated with 100% correct answers for <strong>Operation "Bad Invoice"</strong>.
        </p>
      </div>

      <!-- Submission Info Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono text-xs">
        <div class="bg-slate-950/80 p-3.5 rounded-xl border border-cyber-border">
          <div class="text-[10px] uppercase font-bold text-slate-400 mb-1">Verification Status</div>
          <div class="text-emerald-400 font-bold text-base flex items-center gap-1.5">
            <span>Score: 100%</span>
            <span class="text-xs text-slate-500 font-normal">({{ store.correctAnswersCount }}/{{ store.totalAnswerFields }})</span>
          </div>
          <div class="text-[10px] text-slate-400 mt-1">All IoCs & Checklist validated</div>
        </div>

        <div class="bg-slate-950/80 p-3.5 rounded-xl border border-cyber-border">
          <div class="text-[10px] uppercase font-bold text-slate-400 mb-1">Agent Details</div>
          <div class="text-white font-semibold truncate">{{ store.analystName }}</div>
          <div class="text-[11px] text-cyber-accent truncate">{{ store.studentEmail }}</div>
          <div class="text-[10px] text-slate-400 mt-0.5">ID: {{ store.student?.studentNumber || store.student?.id || '20260001' }}</div>
        </div>
      </div>

      <!-- Pre-Submission State -->
      <div v-if="!store.incidentEscalated" class="space-y-4">
        <p class="text-xs text-slate-300 leading-relaxed font-mono">
          Ready to submit scores to the backend database. Click the button below to execute the test submission:
        </p>

        <div class="flex flex-wrap items-center gap-3 pt-2">
          <button
            @click="store.escalateIncident"
            :disabled="store.submitting"
            class="flex-1 bg-gradient-to-r from-emerald-500 to-cyber-primary hover:from-emerald-400 hover:to-emerald-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-black font-extrabold text-xs uppercase tracking-wider py-3 px-5 rounded-xl transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            <svg v-if="store.submitting" class="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ store.submitting ? 'SUBMITTING SCORES...' : 'SUBMIT SCORES (100%)' }}</span>
          </button>

          <button
            @click="store.showDevTestModal = false"
            :disabled="store.submitting"
            class="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl border border-slate-700 transition cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
        </div>

        <div v-if="store.submitting" class="text-center font-mono text-xs text-cyber-accent animate-pulse pt-2">
          {{ store.submissionMessage || 'Transmitting payload to TechNova SOC database...' }}
        </div>
      </div>

      <!-- Post-Submission Success State -->
      <div v-else class="space-y-5 animate-in fade-in duration-300">
        <div class="bg-emerald-950/40 border-2 border-emerald-500/60 rounded-xl p-4 text-left font-mono">
          <div class="flex items-center gap-2.5 text-emerald-300 font-bold text-sm mb-1.5">
            <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            SUBMISSION SUCCESSFUL!
          </div>
          <p class="text-xs text-slate-200">
            {{ store.submissionMessage || 'Scores and answers successfully recorded in NocoDB database.' }}
          </p>
          <div class="mt-2.5 pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-400/90 flex items-center gap-1.5">
            <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
            Database Synchronization Complete • Status 200 OK
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3 pt-2">
          <button
            @click="openCertificateModal"
            class="flex-1 bg-cyber-primary hover:bg-emerald-600 text-black font-extrabold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>View Full Debrief & Certificate</span>
          </button>

          <button
            @click="store.triggerCertificatePrint"
            class="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <svg class="w-4 h-4 text-cyber-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print Award</span>
          </button>

          <button
            @click="store.showDevTestModal = false"
            class="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs rounded-xl border border-slate-800 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'

const store = useCybersecurityGameStore()

const openCertificateModal = () => {
  store.showDevTestModal = false
  store.incidentEscalated = true
}
</script>