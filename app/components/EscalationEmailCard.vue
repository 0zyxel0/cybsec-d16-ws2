<template>
  <div class="bg-cyber-card border border-cyber-border rounded-xl shadow-2xl relative overflow-hidden no-print">
    <div class="absolute top-0 left-0 right-0 h-1 bg-cyber-warn"></div>

    <div class="p-5 border-b border-cyber-border bg-[#0E1524] flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="h-2 w-2 rounded-full bg-cyber-warn animate-pulse"></span>
        <h2 class="font-extrabold text-sm uppercase tracking-wider text-white">Tier 2 Escalation Email Draft</h2>
      </div>
      <span class="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-bold uppercase">Ready to Send</span>
    </div>

    <div class="p-5 space-y-4 text-xs">
      <!-- Simulated Mail Headers -->
      <div class="space-y-2 bg-[#090D15] p-3 rounded-lg border border-cyber-border font-mono">
        <div class="flex border-b border-slate-900 pb-2">
          <span class="w-16 text-slate-500 font-bold">TO:</span>
          <span class="text-blue-300 font-semibold">tier2-ir@technovasolutions.com</span>
        </div>
        <div class="flex border-b border-slate-900 py-2">
          <span class="w-16 text-slate-500 font-bold">FROM:</span>
          <span class="text-slate-300">{{ store.analystName || '[Your Name]' }}, Tier 1 SOC Analyst</span>
        </div>
        <div class="flex py-1">
          <span class="w-16 text-slate-500 font-bold">SUBJECT:</span>
          <span class="text-red-400 font-bold truncate">URGENT: High Severity Incident Escalation - {{ store.ticket.hostname || '[Insert Hostname]' }}</span>
        </div>
      </div>

      <!-- Interactive Dynamic Preview Body (Editable Textarea) -->
      <div class="relative">
        <textarea
          v-model="store.customEmailBody"
          @input="store.isEmailEdited = true"
          rows="14"
          class="w-full bg-[#0A0E18] p-4 pb-12 rounded-lg border border-cyber-border text-slate-300 leading-relaxed text-xs font-mono focus:border-cyber-primary outline-none resize-y"
          placeholder="Drafting escalation email..."
        ></textarea>
        <div class="absolute right-3 bottom-3 flex items-center gap-2 no-print">
          <span v-if="store.isEmailEdited" class="text-[9px] text-amber-400 font-semibold uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Draft Edited</span>
          <button
            v-if="store.isEmailEdited"
            @click="store.resetEmailTemplate"
            class="text-[9px] text-blue-400 hover:text-blue-300 underline font-semibold bg-slate-900/80 px-2 py-0.5 rounded border border-blue-500/20 cursor-pointer"
          >
            Reset to Template
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center justify-between gap-2 pt-2">
        <div class="flex items-center gap-2">
          <button
            @click="store.copyEmailToClipboard"
            class="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3.5 py-2 rounded-lg transition font-medium flex items-center gap-1.5 border border-slate-700 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span>{{ store.copiedText ? 'Draft Copied!' : 'Copy Email Text' }}</span>
          </button>

          <!-- Dev Mode Fast Submit Trigger -->
          <button
            v-if="isDev"
            @click="store.triggerDevTestSubmit()"
            class="bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 px-3 py-2 rounded-lg border border-amber-500/60 font-mono font-bold text-xs transition flex items-center gap-1.5 cursor-pointer animate-pulse"
            title="Dev Mode: Test submit activity with perfect score"
          >
            <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>[DEV] Test Submit</span>
          </button>
        </div>

        <button
          @click="store.escalateIncident"
          :disabled="store.score < 100 || store.submitting || !store.analystName.trim() || !store.studentEmail.trim()"
          class="px-5 py-2.5 rounded-lg transition-all duration-300 font-bold flex items-center gap-2"
          :class="store.score === 100 && !store.submitting && store.analystName.trim() && store.studentEmail.trim()
            ? 'bg-cyber-primary hover:bg-emerald-600 text-black shadow-lg shadow-emerald-500/20 cursor-pointer'
            : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'"
        >
          <svg v-if="store.submitting" class="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ store.submitting ? 'Transmitting To Tier 2...' : 'Escalate Incident (Handshake)' }}</span>
          <svg v-if="!store.submitting" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'

const store = useCybersecurityGameStore()
const route = useRoute()

const isDev = computed(() => {
  return route.query.env === 'dev' || store.isDevMode
})

// Watch defaultEmailBody to update customEmailBody when template changes, unless user edited
watch(
  () => store.defaultEmailBody,
  (newVal) => {
    if (!store.isEmailEdited) {
      store.customEmailBody = newVal
    }
  },
  { immediate: true }
)
</script>