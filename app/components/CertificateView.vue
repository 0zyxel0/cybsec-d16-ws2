<template>
  <div class="print-card bg-gradient-to-b from-slate-900 to-black border-2 border-amber-500/40 rounded-xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
    <div class="absolute -right-12 -top-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

    <div class="flex justify-center mb-3">
      <div class="border border-amber-500/40 p-2.5 rounded-full bg-amber-500/10">
        <svg class="w-8 h-8 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>

    <h4 class="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">Certificate of Completion</h4>
    <h3 class="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-3">Certified Tier 1 SOC Analyst</h3>

    <p class="text-xs text-slate-400 max-w-md mx-auto mb-4">
      This official credential certifies that
    </p>

    <div class="text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 underline decoration-cyber-primary underline-offset-8 mb-4">
      {{ store.analystName || 'Cybersecurity Student' }}
    </div>

    <p class="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed mb-6">
      has successfully identified, dissected, and escalated high-severity security incident
      <strong>Operation "Bad Invoice"</strong> involving CVE-2022-30190 with 100% forensic accuracy.
    </p>

    <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-[11px] mono text-slate-400">
      <div>
        <span class="block text-slate-600 uppercase text-[9px]">Issued On:</span>
        <span class="text-slate-200 font-semibold">{{ store.reportDate }}</span>
      </div>
      <div>
        <span class="block text-slate-600 uppercase text-[9px]">Simulation Token:</span>
        <span class="text-cyan-400 font-semibold">TN-SOC-2026-BADINV</span>
      </div>
      <div>
        <span class="block text-slate-600 uppercase text-[9px]">Authorized By:</span>
        <span class="text-slate-200 font-semibold">TechNova Security Ops</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'

const store = useCybersecurityGameStore()
</script>