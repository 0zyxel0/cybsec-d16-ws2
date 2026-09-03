<template>
  <div v-if="store.showInstructions" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto no-print">
    <div class="bg-cyber-card border border-cyber-border max-w-lg w-full rounded-xl shadow-2xl p-6 relative">
      <button @click="store.showInstructions = false" class="absolute top-4 right-4 text-slate-500 hover:text-white text-sm">✕</button>

      <div class="flex items-center space-x-2 text-cyber-primary mb-4">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="font-extrabold text-sm uppercase tracking-wider text-white">Tier 1 SOC Analyst SOP Guide</h3>
      </div>

      <div class="space-y-3 text-xs text-slate-300 leading-relaxed">
        <p><strong>Mission Objective:</strong> Correlate disparate forensic logs from endpoint antivirus, network packet captures, and vulnerability intel to accurately triage an active threat.</p>

        <ol class="list-decimal list-inside space-y-2 text-slate-400">
          <li><span class="text-slate-200">Review Defender Alert Log</span> (Evidence A) for affected hostname, local IP, quarantined file, and threat name.</li>
          <li><span class="text-slate-200">Analyze Network PCAP</span> (Evidence B) in the Wireshark viewer to locate suspicious HTTP requests and external IP connections.</li>
          <li><span class="text-slate-200">Consult Threat Intel</span> (Evidence C) for CVE identifier and CVSS severity.</li>
          <li><span class="text-slate-200">Fill in the Incident Response Ticket</span>. Correct answers will light up green.</li>
          <li><span class="text-slate-200">Review & Escalate</span> to Tier 2 once your Verification Score reaches 100%.</li>
        </ol>
      </div>

      <div class="mt-6 pt-4 border-t border-cyber-border text-right">
        <button @click="store.showInstructions = false" class="bg-cyber-primary hover:bg-emerald-600 text-black font-bold text-xs px-4 py-2 rounded-lg transition cursor-pointer">
          Got It, Back to Investigation
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'

const store = useCybersecurityGameStore()
</script>