<template>
  <div class="min-h-screen bg-gray-50 pb-16">
    <!-- Network status indicator for Ghana's intermittent connectivity -->
    <OfflineIndicator v-if="!networkInfo.isOnline" />

    <!-- Navigation -->
    <nav class="bg-primary-600 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/" class="flex items-center space-x-4">
                <StratoneaLogo white />
                <span class="text-xl font-semibold text-white border-l pl-4 border-white/30">Invoice Maker</span>
              </router-link>
            </div>
            <!-- Desktop Navigation -->
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link v-for="item in navItems" :key="item.path" :to="item.path"
                class="inline-flex items-center px-8 py-4 text-white relative group transition-colors duration-200 font-semibold">
                <span class="relative z-10">{{ item.name }}</span>
              </router-link>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="sm:hidden flex items-center">
            <button 
              @click="isMobileMenuOpen = !isMobileMenuOpen" 
              class="text-white p-2"
              aria-label="Main menu"
            >
              <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path 
                  :class="{'hidden': isMobileMenuOpen, 'inline-flex': !isMobileMenuOpen }"
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path 
                  :class="{'hidden': !isMobileMenuOpen, 'inline-flex': isMobileMenuOpen }"
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div :class="{'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen}" class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="block px-3 py-2 text-white font-medium hover:bg-primary-700"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>

    <!-- Donation content -->
    <Donation v-if="showDonation" @close="handleDonationClose" />

      <!-- To Always See and Edit Donation Control  -->

    <!-- <Donation v-if="showDonation" @close="showDonation = false" /> -->

  <!-- Footer -->
  <Footer />

 
  </div>
</template>

<script setup lang="ts">

// Imports
import { useNetworkStatus } from '@/composables/useNetworkStatus'
import { ref } from 'vue'
import OfflineIndicator from '@/components/base/OfflineIndicator.vue'
import StratoneaLogo from '@/components/StratoneaLogo.vue'

import Footer from '@/components/Footer.vue'
 import Donation from '@/components/Donation.vue'


  //== To Always See and Edit Donation Control ==//
  // const showDonation = ref(true)

  //== To Always See and Edit Donation Control ==//



 // ===== Constants & Config =====
const DONATION_MODAL_KEY = 'stratonea_donation_last_closed'
const DONATION_MODAL_FIRST_SEEN_KEY = 'stratonea_first_seen'
const DONATION_MODAL_INTERVAL = 7 * 24 * 60 * 60 * 1000 // 7 days in ms

// ===== Helper Functions =====

/**
 * Returns the timestamp of the user's first visit.
 * If not set, sets it to now and returns now.
 */
function getOrSetFirstSeen(): number {
  let firstSeen = localStorage.getItem(DONATION_MODAL_FIRST_SEEN_KEY)
  if (!firstSeen) {
    const now = Date.now()
    localStorage.setItem(DONATION_MODAL_FIRST_SEEN_KEY, now.toString())
    return now
  }
  return parseInt(firstSeen, 10)
}

/**
 * Determines if the donation modal should be shown.
 * - Only show if at least 7 days have passed since first visit.
 * - After first show, only show every 7 days after last closed.
 */
function shouldShowDonationModal(): boolean {
  const now = Date.now()
  const firstSeen = getOrSetFirstSeen()
  // Don't show until 7 days after first visit
  if (now - firstSeen < DONATION_MODAL_INTERVAL) return false

  const lastClosed = localStorage.getItem(DONATION_MODAL_KEY)
  if (!lastClosed) return true // Never closed before, show after 7 days
  const lastClosedTime = parseInt(lastClosed, 10)
  return isNaN(lastClosedTime) || now - lastClosedTime > DONATION_MODAL_INTERVAL
}

/**
 * Records the current time as the last time the donation modal was closed.
 */
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



const { networkInfo } = useNetworkStatus()
const isMobileMenuOpen = ref(false)

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'History', path: '/history' },
  { name: 'Settings', path: '/settings' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]
</script>

<style>
/* Add any additional global styles here */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
