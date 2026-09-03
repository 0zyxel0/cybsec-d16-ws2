<template>
  <div class="space-y-3">
    <!-- Student / Analyst Identity Section -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-950/70 border border-cyber-border rounded-lg">
      <div>
        <label class="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Lead Analyst Name</label>
        <input
          v-model="store.analystName"
          type="text"
          placeholder="First & Last Name"
          class="w-full bg-[#0A0E18] text-xs text-slate-100 rounded-lg p-2.5 border border-cyber-border focus:border-cyber-primary outline-none transition"
        />
      </div>
      <div>
        <label class="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Student Email Address</label>
        <input
          v-model="store.studentEmail"
          type="email"
          placeholder="your.email@metrotech.org"
          class="w-full bg-[#0A0E18] text-xs text-slate-100 rounded-lg p-2.5 border border-cyber-border focus:border-cyber-primary outline-none transition"
        />
      </div>
      <div>
        <label class="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Date of Report</label>
        <input
          v-model="store.reportDate"
          type="date"
          class="w-full bg-[#0A0E18] text-xs text-slate-100 rounded-lg p-2.5 border border-cyber-border focus:border-cyber-primary outline-none transition"
        />
      </div>
    </div>

    <!-- Missing Student Info Warning -->
    <div v-if="store.score === 100 && (!store.analystName.trim() || !store.studentEmail.trim())" class="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg text-[11px] text-amber-400 no-print">
      Please enter your <strong>Student Name</strong> and <strong>Email Address</strong> above to escalate the incident and claim your certificate.
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'

const store = useCybersecurityGameStore()
</script>