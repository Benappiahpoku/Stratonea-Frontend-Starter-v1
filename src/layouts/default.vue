<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Network status indicator for Ghana's intermittent connectivity -->
    <OfflineIndicator v-if="!isOnline" />

    <!-- Navigation -->
    <nav class="bg-primary-600 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/" class="flex items-center space-x-2">
                <StratoneaLogo white />
                <span class="text-xl font-semibold text-white">Stratonea</span>
              </router-link>
            </div>
            <!-- Desktop Navigation -->
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link v-for="item in navItems" :key="item.path" :to="item.path"
                class="inline-flex items-center px-8 py-4 text-white relative group transition-colors duration-200 font-semibold">
                <span class="relative z-10">{{ item.name }}</span>
                <div
                  class="absolute inset-[10px] rounded-lg bg-[#4B84FC] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  :class="{ 'opacity-100': $route.path === item.path }"></div>
              </router-link>
            </div>
          </div>
          
          <!-- Mobile menu button -->
          <div class="flex items-center sm:hidden">
            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              :aria-expanded="isMobileMenuOpen"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Icon when menu is closed -->
              <svg
                v-if="!isMobileMenuOpen"
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Icon when menu is open -->
              <svg
                v-else
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div v-show="isMobileMenuOpen" class="sm:hidden bg-primary-700" id="mobile-menu">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="text-white block px-3 py-4 rounded-md text-base font-medium hover:bg-primary-500 transition-colors duration-200"
              :class="{ 'bg-primary-500': $route.path === item.path }"
              @click="isMobileMenuOpen = false"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </transition>
    </nav>

    <!-- Main content -->
    <main class="w-full">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-primary-600 text-white mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col items-center space-y-4">
          <!-- Social Icons -->
          <div class="flex space-x-4">
            <a href="https://wa.me/02244314463" target="_blank" rel="noopener noreferrer"
              class="text-white hover:text-white/80 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path transform="translate(0,1)"
                  d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
              </svg>
            </a>
            <a href="mailto:Stratoneaconsult@gmail.com" class="text-white hover:text-white/80 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          <!-- Email -->
          <div class="text-center">
            <a href="mailto:Stratoneaconsult@gmail.com" class="hover:underline">
              Stratoneaconsult@gmail.com
            </a>
          </div>

          <!-- Copyright -->
          <div class="text-center text-sm mt-4">
            © 2025 Created with
            <span class="mx-1">❤️</span>
            by TekLumen
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useNetworkStatus } from '@/composables/useNetworkStatus'
import { computed, ref } from 'vue'
import StratoneaLogo from '@/components/StratoneaLogo.vue'
import OfflineIndicator from '@/components/base/OfflineIndicator.vue'

const { networkInfo } = useNetworkStatus()
const isOnline = computed(() => networkInfo.value.isOnline)

// Mobile menu state
const isMobileMenuOpen = ref(false)

// Navigation items
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]
</script>

<style>
/* Add any additional global styles here */
</style>
