<template>
  <div class="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden shadow-xl">
    <div class="p-4 bg-[#0E1524] border-b border-cyber-border flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
        <h2 class="font-extrabold text-sm uppercase tracking-wider text-white">Incident Briefing: Operation "Bad Invoice"</h2>
      </div>
      <span class="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20 font-semibold">08:34 AM ALARM</span>
    </div>
    <div class="p-5 text-sm leading-relaxed">
      <p class="mb-4">
        At <strong class="text-white">08:30 AM</strong>, Angela Smith from the <strong class="text-cyber-accent">Finance Department</strong> received an urgent email demanding attention for a "Q3 Overdue Invoice." Thinking it was legitimate, she opened the attached document <code class="bg-slate-950 px-1.5 py-0.5 rounded text-red-400 border border-cyber-border font-medium">Q3_Overdue_Invoice.docx</code>.
      </p>
      <div class="bg-[#090C15] border-l-4 border-cyber-warn p-3 rounded-r-lg mb-4 text-xs font-mono text-slate-300">
        <span class="text-cyber-warn font-bold">[!] Angela's Witness Statement:</span><br>
        "My computer completely froze for a few seconds right after I opened the document. For an instant, a black command window popped up and flashed on my screen, then closed on its own."
      </div>
      <p class="text-slate-300 text-xs sm:text-sm">
        Within four minutes, the Defender AV and internal network routers detected anomalies. You must immediately dissect the digital forensics logs below.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Incident Briefing component
</script>