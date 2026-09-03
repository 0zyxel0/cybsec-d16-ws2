<template>
  <div class="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden shadow-xl">
    <!-- Evidence Selection Tabs -->
    <div class="flex border-b border-cyber-border bg-[#0E1524]">
      <button
        @click="store.activeEvidenceTab = 'av'"
        :class="store.activeEvidenceTab === 'av' ? 'border-b-2 border-cyber-primary text-cyber-primary bg-[#131A2A]' : 'text-slate-400 hover:text-white hover:bg-slate-900'"
        class="flex-1 py-3 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>Evidence A: Defender Log</span>
      </button>
      <button
        @click="store.activeEvidenceTab = 'wireshark'"
        :class="store.activeEvidenceTab === 'wireshark' ? 'border-b-2 border-cyber-accent text-cyber-accent bg-[#131A2A]' : 'text-slate-400 hover:text-white hover:bg-slate-900'"
        class="flex-1 py-3 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>Evidence B: Network PCAP</span>
      </button>
      <button
        @click="store.activeEvidenceTab = 'cve'"
        :class="store.activeEvidenceTab === 'cve' ? 'border-b-2 border-cyber-warn text-cyber-warn bg-[#131A2A]' : 'text-slate-400 hover:text-white hover:bg-slate-900'"
        class="flex-1 py-3 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>Evidence C: Threat Intel</span>
      </button>
    </div>

    <!-- TAB CONTENTS -->
    <EvidenceAv v-show="store.activeEvidenceTab === 'av'" />
    <EvidenceWireshark v-show="store.activeEvidenceTab === 'wireshark'" />
    <EvidenceCve v-show="store.activeEvidenceTab === 'cve'" />
  </div>
</template>

<script setup lang="ts">
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'

const store = useCybersecurityGameStore()
</script>