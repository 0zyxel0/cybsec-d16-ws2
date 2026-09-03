<template>
  <div v-if="store.incidentEscalated" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
    <div class="bg-cyber-card border border-cyber-primary max-w-2xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 relative my-8 animate-in fade-in zoom-in duration-300">
      <!-- Close button -->
      <button @click="store.incidentEscalated = false" class="absolute top-4 right-4 text-slate-500 hover:text-white text-sm no-print">✕</button>

      <!-- Terminal Header -->
      <div class="flex items-center space-x-2 text-xs font-mono text-emerald-400 mb-4 pb-3 border-b border-cyber-border">
        <span class="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span class="font-bold">TIER 2 INCIDENT RESPONSE - TRANSMISSION SECURED</span>
      </div>

      <!-- Live Terminal Log -->
      <div class="bg-slate-950 p-4 rounded-xl border border-cyber-border font-mono text-xs space-y-2 mb-6">
        <div class="text-cyan-400 font-semibold">[08:42:01 AM] Tier 2 IR Lead acknowledged escalation ticket.</div>
        <div class="text-slate-300">> Host FIN-PC-04 (192.168.10.45) has been isolated from the corporate subnet.</div>
        <div class="text-slate-300">> Firewall rule installed: External IP 203.0.113.88 blacklisted.</div>
        <div class="text-slate-300">> Memory dump acquired for infected host. Forensics ongoing.</div>
        <div class="text-emerald-400 font-bold mt-2 pt-2 border-t border-slate-900 flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
          EXCELLENT TRIAGE WORK, ANALYST!
        </div>
      </div>

      <!-- Achievement Badges -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 no-print">
        <div class="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center">
          <div class="text-xl mb-1">🎯</div>
          <div class="text-xs font-bold text-white">Master Correlator</div>
          <div class="text-[10px] text-slate-400">100% Correct IoCs</div>
        </div>
        <div class="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center">
          <div class="text-xl mb-1">⚡</div>
          <div class="text-xs font-bold text-white">Fast Triage</div>
          <div class="text-[10px] text-slate-400">Threat Identified</div>
        </div>
        <div class="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center">
          <div class="text-xl mb-1">🛡️</div>
          <div class="text-xs font-bold text-white">Escalation Pro</div>
          <div class="text-[10px] text-slate-400">Clear Synthesis Memo</div>
        </div>
      </div>

      <!-- Database Sync Status -->
      <div class="bg-[#080B14] p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between mb-6 no-print">
        <span class="text-slate-400">Database Sync Status:</span>
        <span class="text-emerald-400 font-semibold flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          {{ store.submissionMessage || 'Scores & Answers Submitted' }}
        </span>
      </div>

      <!-- Certificate Component -->
      <CertificateView class="mb-6" />

      <!-- Modal Action Buttons -->
      <div class="flex flex-wrap items-center justify-between gap-3 no-print">
        <button
          @click="store.triggerCertificatePrint"
          class="bg-cyber-primary hover:bg-emerald-600 text-black font-extrabold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 transition shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Print / Save Certificate</span>
        </button>

        <button
          @click="store.incidentEscalated = false"
          class="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-4 py-2.5 rounded-lg transition border border-slate-700 cursor-pointer"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'
import CertificateView from '~/components/CertificateView.vue'

const store = useCybersecurityGameStore()
</script>