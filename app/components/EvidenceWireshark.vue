<template>
  <div class="p-6 space-y-4">
    <div class="flex items-center justify-between border-b border-cyber-border pb-3">
      <div>
        <h3 class="font-bold text-white text-base">Finance Subnet Router Packet Capture</h3>
        <p class="text-xs text-slate-400 mt-1">Click on any packet row below to inspect deep header contents.</p>
      </div>
      <span class="bg-blue-500/10 text-blue-400 text-xs px-2 py-0.5 rounded border border-blue-500/20 font-bold">WIRESHARK PORTABLE</span>
    </div>

    <!-- WireShark simulated Table -->
    <div class="border border-slate-800 rounded-lg overflow-hidden bg-[#0A0D18]">
      <div class="overflow-x-auto">
        <table class="w-full text-xs text-left mono">
          <thead class="bg-slate-900 text-slate-400 select-none text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th class="py-2.5 px-3">No.</th>
              <th class="py-2.5 px-2">Time</th>
              <th class="py-2.5 px-3">Source IP</th>
              <th class="py-2.5 px-3">Destination IP</th>
              <th class="py-2.5 px-2">Proto</th>
              <th class="py-2.5 px-2">Len</th>
              <th class="py-2.5 px-3">Info</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-900">
            <tr
              v-for="pkt in store.packets"
              :key="pkt.no"
              @click="store.selectPacket(pkt)"
              :class="[
                store.selectedPacket && store.selectedPacket.no === pkt.no ? 'bg-blue-600/20 text-white' : 'hover:bg-slate-800/50 cursor-pointer',
                pkt.highlight ? 'bg-red-950/20 text-red-200' : 'text-slate-300'
              ]"
            >
              <td class="py-2 px-3 font-semibold text-slate-500">{{ pkt.no }}</td>
              <td class="py-2 px-2">{{ pkt.time }}</td>
              <td class="py-2 px-3" :class="{ 'text-cyan-400': pkt.src === '192.168.10.45' }">{{ pkt.src }}</td>
              <td class="py-2 px-3" :class="{ 'text-yellow-400': pkt.dst === '203.0.113.88' }">{{ pkt.dst }}</td>
              <td class="py-2 px-2">
                <span
                  class="px-1.5 py-0.5 rounded text-[10px] font-bold"
                  :class="{
                    'bg-blue-500/10 text-blue-400 border border-blue-500/20': pkt.proto === 'TCP',
                    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20': pkt.proto === 'HTTP'
                  }"
                >{{ pkt.proto }}</span>
              </td>
              <td class="py-2 px-2">{{ pkt.len }}</td>
              <td class="py-2 px-3 truncate max-w-[200px]">{{ pkt.info }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Interactive Packet Inspector -->
      <div class="bg-[#090C15] border-t border-slate-800 p-4">
        <div v-if="store.selectedPacket" class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Selected Packet #{{ store.selectedPacket.no }} Detail View:</div>
            <button @click="store.selectedPacket = null" class="text-slate-500 hover:text-white text-xs">Clear View</button>
          </div>
          <div class="bg-slate-950/80 p-3 rounded border border-cyber-border text-xs space-y-1 text-slate-300 mono">
            <div><span class="text-slate-500 font-semibold">[Frame Info]:</span> Arrival Time: {{ store.selectedPacket.time }}</div>
            <div><span class="text-slate-500 font-semibold">[Ethernet II]:</span> Src MAC: 00:0c:29:ab:cd:12 → Dst MAC: 00:50:56:c0:00:08</div>
            <div><span class="text-slate-500 font-semibold">[Internet Protocol]:</span> {{ store.selectedPacket.src }} → {{ store.selectedPacket.dst }}</div>
            <div><span class="text-slate-500 font-semibold">[Transport Protocol]:</span> {{ store.selectedPacket.proto }} (Source Port: {{ store.selectedPacket.srcPort }}, Dest Port: {{ store.selectedPacket.dstPort }})</div>
            <div v-if="store.selectedPacket.payload" class="mt-2 pt-2 border-t border-slate-800">
              <span class="text-emerald-400 font-semibold block mb-1">[Application Payload Dump]:</span>
              <pre class="bg-black/60 p-2.5 rounded border border-slate-900 text-[11px] text-green-300 overflow-x-auto whitespace-pre-wrap">{{ store.selectedPacket.payload }}</pre>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-4 text-slate-500 text-xs italic">
          Select any packet in the table above to view deep header parameters and reconstructed payload dumps.
        </div>
      </div>
    </div>
    <div class="text-xs text-slate-400 bg-slate-900 p-3 rounded-lg flex items-center gap-3">
      <span class="p-1 rounded bg-slate-800 text-blue-400">ANALYSIS:</span>
      <span>Notice packet #145 requesting an external payload path. Identify the target IP, port, and file being fetched.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'

const store = useCybersecurityGameStore()
</script>