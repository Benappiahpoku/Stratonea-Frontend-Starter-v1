import { ref } from 'vue'
import type { RegisterSWOptions } from 'vite-plugin-pwa/types'

// Import dynamically to avoid SSR issues
const { useRegisterSW } = await import('virtual:pwa-register/vue')

export function usePWA() {
  const {
    offlineReady,
    needRefresh,
    updateServiceWorker
  } = useRegisterSW({
    immediate: true,
    onRegistered(registration) {
      // Check if we have an existing service worker
      if (registration) {
        console.log('Service worker registered')
      }
    },
    onRegisterError(error: Error) {
      console.error('Service worker registration error:', error)
    }
  } as RegisterSWOptions)

  // Track registration status
  const isRegistered = ref(false)

  // Handle service worker update with proper error handling
  async function handleServiceWorkerUpdate(): Promise<void> {
    try {
      await updateServiceWorker(true) // true to reload the page after update
    } catch (error) {
      console.error('Error updating service worker:', error)
      // You might want to show a notification to the user here
    }
  }

  return {
    offlineReady,
    needRefresh,
    updateServiceWorker: handleServiceWorkerUpdate,
    isRegistered
  }
}
