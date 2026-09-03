<template>
  <div class="bg-cyber-card border border-cyber-border rounded-xl p-5 shadow-2xl space-y-6">
    <!-- Header -->
    <div class="border-b border-cyber-border pb-4 flex items-center justify-between">
      <div>
        <h2 class="font-black text-sm uppercase tracking-wider text-white flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-cyber-primary animate-pulse"></span>
          Incident Response Ticket #IR-8829
        </h2>
        <p class="text-xs text-slate-400 mt-0.5">Fill out all fields using evidence data to complete Tier 1 Triage.</p>
      </div>
      <div class="text-right font-mono">
        <span class="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
        <span :class="store.score === 100 ? 'text-cyber-primary' : 'text-cyber-warn'" class="text-xs font-bold uppercase">
          {{ store.score === 100 ? 'VERIFIED (100%)' : 'TRIAGE IN PROGRESS' }}
        </span>
      </div>
    </div>

    <!-- 0. Student Identity -->
    <TicketIdentity />

    <hr class="border-cyber-border no-print" />

    <!-- 1. System Details -->
    <TicketSystemDetails />

    <!-- 2. Threat Intel -->
    <TicketThreatIntel />

    <!-- 3. Vulnerability -->
    <TicketVulnerability />

    <!-- 4. Summary -->
    <TicketSummary />
  </div>
</template>

<script setup lang="ts">
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'
import TicketIdentity from '~/components/ticket/TicketIdentity.vue'
import TicketSystemDetails from '~/components/ticket/TicketSystemDetails.vue'
import TicketThreatIntel from '~/components/ticket/TicketThreatIntel.vue'
import TicketVulnerability from '~/components/ticket/TicketVulnerability.vue'
import TicketSummary from '~/components/ticket/TicketSummary.vue'

const store = useCybersecurityGameStore()
</script>