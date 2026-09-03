<template>
  <div class="pb-16 min-h-screen">
    <!-- Top Navigation / Status Bar -->
    <HeaderBar />

    <!-- Mobile Tabs (Visible only on small screens) -->
    <div class="lg:hidden px-4 mt-4 mb-2">
      <div class="flex bg-slate-900 rounded-lg p-1 space-x-1 border border-cyber-border overflow-x-auto">
        <button 
          @click="mobileTab = 'briefing'" 
          :class="['flex-1 py-2 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap', mobileTab === 'briefing' ? 'bg-cyber-primary text-slate-900 shadow' : 'text-slate-400 hover:text-slate-200']"
        >
          Briefing
        </button>
        <button 
          @click="mobileTab = 'evidence'" 
          :class="['flex-1 py-2 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap', mobileTab === 'evidence' ? 'bg-cyber-primary text-slate-900 shadow' : 'text-slate-400 hover:text-slate-200']"
        >
          Evidence
        </button>
        <button 
          @click="mobileTab = 'ticket'" 
          :class="['flex-1 py-2 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap', mobileTab === 'ticket' ? 'bg-cyber-primary text-slate-900 shadow' : 'text-slate-400 hover:text-slate-200']"
        >
          Ticket
        </button>
        <button 
          @click="mobileTab = 'escalation'" 
          :class="['flex-1 py-2 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap', mobileTab === 'escalation' ? 'bg-cyber-primary text-slate-900 shadow' : 'text-slate-400 hover:text-slate-200']"
        >
          Escalation
        </button>
      </div>
    </div>

    <!-- MAIN TWO-COLUMN DASHBOARD GRID -->
    <main class="max-w-7xl mx-auto px-4 py-4 lg:py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- LEFT COLUMN: Scenario Background & Evidence Explorer -->
      <section class="lg:col-span-6 flex-col gap-6" :class="[mobileTab === 'briefing' || mobileTab === 'evidence' ? 'flex' : 'hidden lg:flex']">
        <div :class="[mobileTab === 'briefing' ? 'block' : 'hidden lg:block']">
          <IncidentBriefing />
        </div>
        <div :class="[mobileTab === 'evidence' ? 'block' : 'hidden lg:block']">
          <EvidencePortal />
        </div>
      </section>

      <!-- RIGHT COLUMN: Incident Ticket Form & Escalation Console -->
      <section class="lg:col-span-6 flex-col gap-6" :class="[mobileTab === 'ticket' || mobileTab === 'escalation' ? 'flex' : 'hidden lg:flex']">
        <div :class="[mobileTab === 'ticket' ? 'block' : 'hidden lg:block']">
          <IncidentTicketForm />
        </div>
        <div :class="[mobileTab === 'escalation' ? 'block' : 'hidden lg:block']">
          <EscalationEmailCard />
        </div>
      </section>
    </main>

    <!-- SUCCESS / CERTIFICATE MODAL -->
    <SuccessModal />

    <!-- DEV TEST SUBMIT MODAL -->
    <DevTestModal />

    <!-- MISSION GUIDE MODAL -->
    <MissionGuideModal />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'
import { useRoute } from 'vue-router'
import HeaderBar from '~/components/HeaderBar.vue'
import IncidentBriefing from '~/components/IncidentBriefing.vue'
import EvidencePortal from '~/components/EvidencePortal.vue'
import IncidentTicketForm from '~/components/IncidentTicketForm.vue'
import EscalationEmailCard from '~/components/EscalationEmailCard.vue'
import SuccessModal from '~/components/SuccessModal.vue'
import DevTestModal from '~/components/DevTestModal.vue'
import MissionGuideModal from '~/components/MissionGuideModal.vue'

definePageMeta({
  middleware: ['auth']
})

const store = useCybersecurityGameStore()
const route = useRoute()

const mobileTab = ref('briefing')

onMounted(() => {
  if (route.query.SessionSet) {
    store.sessionSet = String(route.query.SessionSet)
  }
  if (route.query.env === 'dev') {
    store.isDevMode = true
  }
  store.startGame()
})
</script>