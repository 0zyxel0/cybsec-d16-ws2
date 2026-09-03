<template>
  <div class="pb-16 min-h-screen">
    <!-- Top Navigation / Status Bar -->
    <HeaderBar />

    <!-- MAIN TWO-COLUMN DASHBOARD GRID -->
    <main class="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- LEFT COLUMN: Scenario Background & Evidence Explorer -->
      <section class="lg:col-span-6 space-y-6">
        <IncidentBriefing />
        <EvidencePortal />
      </section>

      <!-- RIGHT COLUMN: Incident Ticket Form & Escalation Console -->
      <section class="lg:col-span-6 space-y-6">
        <IncidentTicketForm />
        <EscalationEmailCard />
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
import { useCybersecurityGameStore } from '~/stores/cybersecurityGameStore'
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