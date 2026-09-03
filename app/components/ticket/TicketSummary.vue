<template>
  <div>
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
        <span class="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">4</span>
        Incident Summary
      </h3>
      <span class="text-xs text-slate-500 italic no-print">Freeform Synthesis</span>
    </div>
    <p class="text-[11px] text-slate-400 mb-2">Write 2-3 sentences explaining exactly what happened using evidence, logs, and vulnerability info.</p>

    <textarea
      v-model="store.ticket.summary"
      rows="3"
      placeholder="Provide a detailed incident summary. Include how the compromise started, the network communication behavior, and the vulnerability name/ID used."
      class="w-full bg-[#070A12] text-xs rounded-lg p-3 border border-cyber-border focus:border-cyber-primary outline-none text-slate-200 leading-relaxed"
    ></textarea>

    <!-- Educational rubric checklist -->
    <div class="mt-2.5 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 no-print">
      <div class="text-[11px] font-bold text-slate-400 uppercase mb-2">Content Keyword Checklist (Auto-graders):</div>
      <div class="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
        <span class="flex items-center gap-1" :class="store.summaryChecklist.finance ? 'text-emerald-400' : 'text-slate-500'">
          <span class="text-xs">{{ store.summaryChecklist.finance ? '●' : '○' }}</span> Finance/Angela Smith
        </span>
        <span class="flex items-center gap-1" :class="store.summaryChecklist.invoice ? 'text-emerald-400' : 'text-slate-500'">
          <span class="text-xs">{{ store.summaryChecklist.invoice ? '●' : '○' }}</span> Invoice Document Opened
        </span>
        <span class="flex items-center gap-1" :class="store.summaryChecklist.cve ? 'text-emerald-400' : 'text-slate-500'">
          <span class="text-xs">{{ store.summaryChecklist.cve ? '●' : '○' }}</span> CVE-2022-30190 / Follina
        </span>
        <span class="flex items-center gap-1" :class="store.summaryChecklist.payload ? 'text-emerald-400' : 'text-slate-500'">
          <span class="text-xs">{{ store.summaryChecklist.payload ? '●' : '○' }}</span> update.exe Payload Download
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'

const store = useCybersecurityGameStore()
</script>