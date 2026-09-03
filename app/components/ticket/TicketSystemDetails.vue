<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-xs font-bold uppercase text-cyber-primary tracking-wider flex items-center gap-1.5">
        <span class="text-[10px] bg-cyber-primary/10 text-cyber-primary px-1.5 py-0.5 rounded">1</span>
        Affected System Details
      </h3>
      <span v-if="store.hintsEnabled" class="text-xs text-slate-500 italic no-print">Clue: Check Evidence A</span>
    </div>

    <div class="space-y-3">
      <!-- Hostname -->
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="text-[11px] font-semibold text-slate-300">Hostname</label>
          <span v-if="store.ticketValidation.hostname" class="text-[10px] text-emerald-400 font-bold">&#10004; Correct</span>
        </div>
        <div class="relative">
          <input
            v-model="store.ticket.hostname"
            type="text"
            placeholder="e.g. FIN-PC-XX"
            class="w-full bg-[#070A12] text-xs rounded-lg p-2.5 border outline-none transition font-mono"
            :class="store.getInputClass('hostname')"
          />
          <button v-if="store.hintsEnabled" @click="store.activeEvidenceTab = 'av'" class="absolute right-2.5 top-2.5 text-amber-500 hover:text-amber-400" title="Check Antivirus Tab">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Internal IP Address -->
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="text-[11px] font-semibold text-slate-300">Internal IP Address</label>
          <span v-if="store.ticketValidation.internalIP" class="text-[10px] text-emerald-400 font-bold">&#10004; Correct</span>
        </div>
        <div class="relative">
          <input
            v-model="store.ticket.internalIP"
            type="text"
            placeholder="e.g. 192.168.x.x"
            class="w-full bg-[#070A12] text-xs rounded-lg p-2.5 border outline-none transition font-mono"
            :class="store.getInputClass('internalIP')"
          />
          <button v-if="store.hintsEnabled" @click="store.activeEvidenceTab = 'av'" class="absolute right-2.5 top-2.5 text-amber-500 hover:text-amber-400" title="Check Antivirus Tab">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Department -->
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="text-[11px] font-semibold text-slate-300">Department</label>
          <span v-if="store.ticketValidation.department" class="text-[10px] text-emerald-400 font-bold">&#10004; Correct</span>
        </div>
        <div class="relative">
          <input
            v-model="store.ticket.department"
            type="text"
            placeholder="e.g. Accounting, Finance..."
            class="w-full bg-[#070A12] text-xs rounded-lg p-2.5 border outline-none transition"
            :class="store.getInputClass('department')"
          />
          <button v-if="store.hintsEnabled" @click="store.activeEvidenceTab = 'av'" class="absolute right-2.5 top-2.5 text-amber-500 hover:text-amber-400" title="Check Scenario Briefing">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'

const store = useCybersecurityGameStore()
</script>