<template>
  <div
    v-if="showNotification"
    class="fixed bottom-0 right-0 m-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-sm z-50"
    role="alert"
    aria-live="polite"
  >
    <div class="content flex items-center space-x-3">
      <div class="flex-shrink-0">
        <svg
          v-if="offlineReady"
          class="w-6 h-6 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <svg
          v-else-if="needRefresh"
          class="w-6 h-6 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
      <div class="flex-1">
        <p
          v-if="offlineReady"
          class="text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          App ready to work offline
        </p>
        <p
          v-else-if="needRefresh"
          class="text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          New version available
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Update to get the latest features and improvements
        </p>
      </div>
    </div>
    <div class="buttons flex space-x-3">
      <button
        v-if="needRefresh"
        @click="update"
        class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        :disabled="updating"
      >
        {{ updating ? 'Updating...' : 'Reload' }}
      </button>
      <button
        @click="close"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePWA } from '@/composables/usePWA'

// Get PWA functionality from composable
const { offlineReady, needRefresh, updateServiceWorker } = usePWA()

// Track update state
const updating = ref(false)
const dismissed = ref(false)

// Determine if the notification should be shown
const showNotification = computed(() => 
  !dismissed.value && (offlineReady.value || needRefresh.value)
)

// Handle the update process
const update = async () => {
  updating.value = true
  try {
    await updateServiceWorker()
  } catch (error) {
    console.error('Failed to update:', error)
  } finally {
    updating.value = false
  }
}

// Close the notification
const close = () => {
  dismissed.value = true
}
</script>

<style scoped>
.pwa-notification {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 1rem;
  background: theme('colors.primary.700');
  color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 50;
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
