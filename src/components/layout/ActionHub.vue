<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
    <!-- Desktop View -->
    <div class="hidden md:flex justify-center items-center h-16 max-w-7xl mx-auto px-4">
      <div class="flex space-x-8 items-center">
        <router-link to="/" class="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
          <font-awesome-icon icon="fa-solid fa-home" class="text-xl" />
          <span>Home</span>
        </router-link>

        <button @click="handleNewInvoice" class="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
          <font-awesome-icon icon="fa-solid fa-plus-circle" class="text-xl" />
          <span>New Invoice</span>
        </button>

        <button @click="shareWhatsApp" class="flex items-center space-x-2 text-green-600 hover:text-green-700">
          <font-awesome-icon icon="fa-brands fa-whatsapp" class="text-xl" />
          <span>Share WhatsApp</span>
        </button>

        <button @click="downloadPDF" class="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
          <font-awesome-icon icon="fa-solid fa-download" class="text-xl" />
          <span>Download PDF</span>
        </button>
      </div>
    </div>


    <!-- Mobile View (Updated with text labels) -->
    <div class="md:hidden flex justify-around items-center h-20 py-2">
      <router-link to="/" class="flex flex-col items-center text-primary-600 hover:text-primary-700">
        <font-awesome-icon icon="fa-solid fa-home" class="text-2xl mb-1" />
        <span class="text-xs">Home</span>
      </router-link>

      <button @click="handleNewInvoice" class="flex flex-col items-center text-primary-600 hover:text-primary-700">
        <font-awesome-icon icon="fa-solid fa-plus-circle" class="text-2xl mb-1" />
        <span class="text-xs">New Invoice</span>
      </button>

      <button @click="shareWhatsApp" class="flex flex-col items-center text-green-600 hover:text-green-700">
        <font-awesome-icon icon="fa-brands fa-whatsapp" class="text-2xl mb-1" />
        <span class="text-xs">Share WhatsApp</span>
      </button>

      <button @click="downloadPDF" class="flex flex-col items-center text-primary-600 hover:text-primary-700">
        <font-awesome-icon icon="fa-solid fa-download" class="text-2xl mb-1" />
        <span class="text-xs">Download PDF</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
// ActionHub.vue: Floating action bar for navigation and invoice actions.
// Receives invoice data and logo as props. Emits events for parent to handle logic.
// Added new invoice handling with page refresh functionality.
import { useRouter } from 'vue-router'

// ===== Constants & Config =====
const router = useRouter()


async function handleNewInvoice() {
  try {
    emit('reset-invoice-counter')
    // First, navigate to /new-invoice
    await router.push('/new-invoice')

    // Then refresh the page
    window.location.reload()

    console.log('[ActionHub] Navigated to /new-invoice and refreshed page')
  } catch (error) {
    console.error('[ActionHub] Navigation error:', error)
  }
}

// ===== [New Feature] START =====
/**
 * Props for ActionHub.
 * - invoice: The invoice data (optional for flexibility)
 * - companyLogo: The company logo (optional for flexibility)
 */
withDefaults(
  defineProps<{
    invoice?: any
    companyLogo?: string | null
  }>(),
  {
    invoice: undefined,
    companyLogo: null
  }
)

const emit = defineEmits<{
  (e: 'download-pdf'): void
  (e: 'share-whatsapp'): void
  (e: 'reset-invoice-counter'): void
}>()
// ===== [New Feature] END =====

// ===== [New Feature] START =====
/**
 * Emits WhatsApp share event to parent.
 */
function shareWhatsApp() {
  console.log('[ActionHub] WhatsApp button clicked, emitting share-whatsapp event')
  emit('share-whatsapp')
}

/**
 * Emits PDF download event to parent.
 */
function downloadPDF() {
  console.log('[ActionHub] Download PDF button clicked, emitting download-pdf event')
  emit('download-pdf')
}
// ===== [New Feature] END =====
</script>