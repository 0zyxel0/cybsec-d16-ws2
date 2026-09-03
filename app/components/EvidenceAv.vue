<template>
  <div class="p-6 space-y-4">
    <div class="flex items-center justify-between border-b border-cyber-border pb-3">
      <h3 class="font-bold text-white text-base">Defender Endpoint Alert Log</h3>
      <span class="bg-red-500/10 text-red-400 text-xs px-2 py-0.5 rounded border border-red-500/20 font-bold tracking-wider">THREAT DETECTED</span>
    </div>

    <div class="bg-slate-950 rounded-lg p-5 border border-cyber-border mono text-xs leading-relaxed text-slate-300 shadow-inner">
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-y-2 gap-x-4">
        <div class="sm:col-span-4 text-slate-500 font-semibold">[ALERT ID]</div>
        <div class="sm:col-span-8 text-white">99384-AV</div>

        <div class="sm:col-span-4 text-slate-500 font-semibold">[TIMESTAMP]</div>
        <div class="sm:col-span-8 text-cyber-accent">08:34:12 AM</div>

        <div class="sm:col-span-4 text-slate-500 font-semibold">[HOSTNAME]</div>
        <div class="sm:col-span-8 text-yellow-400">FIN-PC-04</div>

        <div class="sm:col-span-4 text-slate-500 font-semibold">[LOCAL IP]</div>
        <div class="sm:col-span-8 text-cyan-400">192.168.10.45</div>

        <div class="sm:col-span-4 text-slate-500 font-semibold">[THREAT NAME]</div>
        <div class="sm:col-span-8 text-cyber-danger font-bold bg-red-950/20 px-1 rounded inline-block">Exploit:Win32/Follina.Aldha</div>

        <div class="sm:col-span-4 text-slate-500 font-semibold">[AFFECTED FILE]</div>
        <div class="sm:col-span-8 text-red-300">C:\Users\asmith\Downloads\Q3_Overdue_Invoice.docx</div>

        <div class="sm:col-span-4 text-slate-500 font-semibold">[PROCESS HASH]</div>
        <div class="sm:col-span-8 text-slate-400">8a9b4c3d2e1f...</div>

        <div class="sm:col-span-4 text-slate-500 font-semibold">[ACTION TAKEN]</div>
        <div class="sm:col-span-8 text-emerald-400 font-semibold">File Quarantined successfully.</div>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-900 text-amber-400 font-medium flex items-start gap-2">
        <svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <span>[WARNING]: Outbound network connection detected prior to quarantine event. Attack likely initiated external download sequence.</span>
      </div>
    </div>
    <div class="text-xs text-slate-400 bg-slate-900 p-3 rounded-lg flex items-center gap-3">
      <span class="p-1 rounded bg-slate-800 text-blue-400">TIP:</span>
      <span>Look closely at the <strong>Affected File Name</strong> and <strong>Internal Host details</strong>. These must go directly into the corresponding ticket fields.</span>
    </div>
  </div>
</template>