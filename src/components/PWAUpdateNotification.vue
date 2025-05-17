<template>
  <div
    v-if="needRefresh || offlineReady"
    class="fixed bottom-0 right-0 m-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-sm z-50"
    role="alert"
    aria-live="polite"
  >
    <!-- Offline Ready Message -->
    <div v-if="offlineReady" class="flex items-center space-x-3">
      <div class="flex-shrink-0">
        <svg
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
      </div>
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
          App ready to work offline
        </p>
      </div>
      <button
        @click="close"
        class="flex-shrink-0 text-gray-400 hover:text-gray-500"
        aria-label="Close notification"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          ></path>
        </svg>
      </button>
    </div>

    <!-- Update Available Message -->
    <div v-if="needRefresh" class="flex flex-col space-y-3">
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0">
          <svg
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
          <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
            New version available
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Update to get the latest features and improvements
          </p>
        </div>
      </div>
      <div class="flex space-x-3">
        <button
          @click="handleUpdate"
          class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          :disabled="updating"
        >
          {{ updating ? 'Updating...' : 'Update Now' }}
        </button>
        <button
          @click="close"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Later
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePWA } from '@/composables/usePWA'

// Get PWA functionality from composable
const { offlineReady, needRefresh, updateServiceWorker } = usePWA()

// Track update state
const updating = ref(false)

// Handle the update process
async function handleUpdate() {
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
function close() {
  offlineReady.value = false
  needRefresh.value = false
}
</script>
