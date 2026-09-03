<template>
  <div class="p-6 space-y-4">
    <div class="flex items-center justify-between border-b border-cyber-border pb-3">
      <h3 class="font-bold text-white text-base">National Vulnerability Database (NVD) Reference</h3>
      <span class="bg-amber-500/10 text-amber-400 text-xs px-2 py-0.5 rounded border border-amber-500/20 font-bold">CVE ADVISORY</span>
    </div>

    <div class="bg-slate-950 p-5 rounded-lg border border-cyber-border space-y-4 text-xs">
      <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-900">
        <div>
          <span class="text-slate-500 font-semibold">Vulnerability Identifier: </span>
          <span class="text-red-400 font-bold text-sm mono">CVE-2022-30190</span>
          <span class="ml-2 text-[10px] bg-red-950/60 text-red-300 border border-red-800/40 px-1.5 py-0.5 rounded font-bold">FOLLINA</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-slate-400">CVSS v3.1:</span>
          <span class="bg-red-600 text-white font-black px-2 py-0.5 rounded text-[11px]">7.8 HIGH</span>
        </div>
      </div>

      <div class="space-y-2 text-slate-300 leading-relaxed">
        <p>
          <strong>Description:</strong> A remote code execution vulnerability exists when MSDT (Microsoft Support Diagnostic Tool) is called using the URL protocol from an application such as Microsoft Word. An attacker who successfully exploits this vulnerability can run arbitrary code with the privileges of the calling application.
        </p>
        <p>
          <strong>Attack Vector:</strong> An attacker sends a crafted Office document (e.g. Word document) containing an external OLE object relationship link pointing to an HTML file hosted on a remote server. The HTML invokes the <code class="text-cyan-400 font-mono">ms-msdt:</code> handler, executing PowerShell commands without macros enabled.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px]">
        <div class="bg-slate-900/60 p-3 rounded border border-slate-800">
          <span class="text-slate-400 font-semibold block mb-1">Impact:</span>
          <span class="text-amber-300">Remote Code Execution (RCE) / System Takeover</span>
        </div>
        <div class="bg-slate-900/60 p-3 rounded border border-slate-800">
          <span class="text-slate-400 font-semibold block mb-1">Mitigation:</span>
          <span class="text-emerald-400">Disable MSDT URL Protocol registry handler</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// CVE Knowledgebase
</script>