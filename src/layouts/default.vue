<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Network status indicator for Ghana's intermittent connectivity -->
    <OfflineIndicator v-if="!isOnline" />

    <!-- Navigation content -->
    <Navigation />

    <!-- Main content -->
    <main class="w-full">
      <router-view />
    </main>

    <!-- <AppButton text="Sign in" type="button" :loading="false" :disabled="false" /> -->

    <FloatingAddButton />

    <!-- Donation content -->
    <Donation v-if="showDonation" @close="handleDonationClose" />

    <!-- To Always See and Edit Donation Control  -->

    <!-- <Donation v-if="showDonation" @close="showDonation = false" /> -->

    <!-- Footer content -->
    <Footer />

    <ActionHub />
  </div>
</template>

<script setup lang="ts">
  import { useNetworkStatus } from '@/composables/useNetworkStatus.ts'
  import { ref, computed } from 'vue'
  import OfflineIndicator from '@/components/base/OfflineIndicator.vue'
  import Footer from '@/components/Footer.vue'
  import Navigation from '@/components/Navigation.vue'
  import FloatingAddButton from '@/components/base/FloatingAddButton.vue'
  import ActionHub from '@/components/base/ActionHub.vue'
  import Donation from '@/components/Donation.vue'

  const { networkInfo } = useNetworkStatus()
  const isOnline = computed(() => networkInfo.value.isOnline)

  //== To Always See and Edit Donation Control ==//
  // const showDonation = ref(true)

  //== To Always See and Edit Donation Control ==//

  // ==== Donation Control in Parent Component //

  // ===== Constants & Config =====

  const DONATION_MODAL_KEY = 'stratonea_donation_last_closed'
  const DONATION_MODAL_INTERVAL = 7 * 24 * 60 * 60 * 1000 // 7 days in ms

  // ===== Helper Functions =====
  function shouldShowDonationModal(): boolean {
    const lastClosed = localStorage.getItem(DONATION_MODAL_KEY)
    if (!lastClosed) return true
    const lastClosedTime = parseInt(lastClosed, 10)
    return isNaN(lastClosedTime) || Date.now() - lastClosedTime > DONATION_MODAL_INTERVAL
  }

  function recordDonationModalClosed(): void {
    localStorage.setItem(DONATION_MODAL_KEY, Date.now().toString())
  }

  // ===== Main Logic =====
  const showDonation = ref(shouldShowDonationModal())

  function handleDonationClose() {
    recordDonationModalClosed()
    showDonation.value = false
  }

  // ==== End Donation Control in Parent Component //

</script>

<style>
  /* Add any additional global styles here */
</style>
