<template>
  <div class="py-16 sm:py-24">
    <div class="w-screen bg-primary-600">
      <!-- Mobile Menu Button -->
      <button 
        @click="isMenuOpen = !isMenuOpen"
        class="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white/10 sm:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Mobile Menu -->
      <div 
        v-if="isMenuOpen" 
        class="fixed inset-0 bg-primary-600 z-40 flex flex-col items-center justify-center space-y-8 sm:hidden"
      >
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="text-white text-xl px-8 py-4 relative group"
          @click="isMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
      </div>

      <!-- Main Content -->
      <div class="flex-1 flex items-center justify-center py-16 sm:py-24">
        <div class="w-full text-center text-white space-y-16">
          <!-- Main Heading -->
          <h1 class="text-5xl sm:text-7xl font-normal">Need to Reach Us?</h1>
          
          <!-- Subheading -->
          <p class="text-xl sm:text-3xl font-light text-white/90">
            You can contact us directly using the details below
          </p>
          
          <!-- Contact Details -->
          <div class="space-y-8 text-xl sm:text-2xl font-light">
            <!-- Address -->
            <p>29 Labone Crescent, Accra</p>

            <!-- Phone -->
            <p>T: <a href="tel:+233-244314463" class="hover:text-[#4B84FC] transition-colors">+233- 244314463</a></p>

            <!-- Email -->
            <p>E: <a href="mailto:Bappiahpoku@gmail.com" class="hover:text-[#4B84FC] transition-colors">Bappiahpoku@gmail.com</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isMenuOpen = ref(false)
const router = useRouter()

// Navigation items
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

// Close mobile menu when route changes
router.afterEach(() => {
  isMenuOpen.value = false
})
</script>
