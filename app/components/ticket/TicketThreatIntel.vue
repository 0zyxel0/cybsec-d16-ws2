<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-xs font-bold uppercase text-cyber-accent tracking-wider flex items-center gap-1.5">
        <span class="text-[10px] bg-cyber-accent/10 text-cyber-accent px-1.5 py-0.5 rounded">2</span>
        Threat Intelligence (IoCs)
      </h3>
      <span v-if="store.hintsEnabled" class="text-xs text-slate-500 italic no-print">Clue: Look at Evidence A & B</span>
    </div>

    <div class="space-y-3">
      <!-- Malware Name -->
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="text-[11px] font-semibold text-slate-300">Malware/Threat Name</label>
          <span v-if="store.ticketValidation.threatName" class="text-[10px] text-emerald-400 font-bold">&#10004; Correct</span>
        </div>
        <input
          v-model="store.ticket.threatName"
          type="text"
          placeholder="e.g. Exploit:Win32..."
          class="w-full bg-[#070A12] text-xs rounded-lg p-2.5 border outline-none transition font-mono"
          :class="store.getInputClass('threatName')"
        />
      </div>

      <!-- File Name -->
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="text-[11px] font-semibold text-slate-300">Malicious Initial File Name</label>
          <span v-if="store.ticketValidation.fileName" class="text-[10px] text-emerald-400 font-bold">&#10004; Correct</span>
        </div>
        <input
          v-model="store.ticket.fileName"
          type="text"
          placeholder="Name of attachment document"
          class="w-full bg-[#070A12] text-xs rounded-lg p-2.5 border outline-none transition font-mono"
          :class="store.getInputClass('fileName')"
        />
      </div>

      <!-- External IP -->
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="text-[11px] font-semibold text-slate-300">Attacker/External IP Address</label>
          <span v-if="store.ticketValidation.externalIP" class="text-[10px] text-emerald-400 font-bold">&#10004; Correct</span>
        </div>
        <input
          v-model="store.ticket.externalIP"
          type="text"
          placeholder="e.g. 203.0.xxx.xx"
          class="w-full bg-[#070A12] text-xs rounded-lg p-2.5 border outline-none transition font-mono"
          :class="store.getInputClass('externalIP')"
        />
      </div>

      <!-- Port & Protocol -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="text-[11px] font-semibold text-slate-300">Attacker Port</label>
            <span v-if="store.ticketValidation.attackerPort" class="text-[10px] text-emerald-400 font-bold">&#10004; OK</span>
          </div>
          <input
            v-model="store.ticket.attackerPort"
            type="text"
            placeholder="e.g. 80"
            class="w-full bg-[#070A12] text-xs rounded-lg p-2.5 border outline-none transition font-mono"
            :class="store.getInputClass('attackerPort')"
          />
        </div>
        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="text-[11px] font-semibold text-slate-300">Protocol</label>
            <span v-if="store.ticketValidation.attackerProtocol" class="text-[10px] text-emerald-400 font-bold">&#10004; OK</span>
          </div>
          <select
            v-model="store.ticket.attackerProtocol"
            class="w-full bg-[#070A12] text-xs rounded-lg p-2.5 border outline-none transition font-mono"
            :class="store.getInputClass('attackerProtocol')"
          >
            <option value="">Select protocol</option>
            <option value="TCP">TCP</option>
            <option value="UDP">UDP</option>
            <option value="ICMP">ICMP</option>
          </select>
        </div>
      </div>

      <!-- Secondary File -->
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="text-[11px] font-semibold text-slate-300">Secondary Payload File</label>
          <span v-if="store.ticketValidation.secondaryFile" class="text-[10px] text-emerald-400 font-bold">&#10004; Correct</span>
        </div>
        <input
          v-model="store.ticket.secondaryFile"
          type="text"
          placeholder="e.g. update.exe"
          class="w-full bg-[#070A12] text-xs rounded-lg p-2.5 border outline-none transition font-mono"
          :class="store.getInputClass('secondaryFile')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'

const store = useCybersecurityGameStore()
</script>