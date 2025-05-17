<template>
  <div 
    class="loading-spinner" 
    :class="[size, { 'with-label': label }]"
    role="status"
    :aria-label="ariaLabel"
  >
    <!-- Simple, lightweight SVG spinner -->
    <svg 
      class="spinner" 
      viewBox="0 0 50 50"
      :class="{ 'low-motion': useReducedMotion }"
    >
      <circle
        class="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="4"
      />
    </svg>

    <!-- Optional loading text -->
    <span v-if="label" class="label" :class="{ 'sr-only': hideLabel }">
      {{ label }}
    </span>

    <!-- Network speed indicator -->
    <div 
      v-if="showNetworkSpeed" 
      class="network-speed"
      :class="connectionQuality"
    >
      {{ networkSpeedLabel }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNetworkStatus } from '@/composables/useNetworkStatus'

// Props with Ghana-specific defaults
interface Props {
  /** Size of the spinner (small, medium, large) */
  size?: 'sm' | 'md' | 'lg'
  /** Loading text to display */
  label?: string
  /** Hide label visually but keep for screen readers */
  hideLabel?: boolean
  /** Custom aria-label for accessibility */
  ariaLabel?: string
  /** Show network speed indicator */
  showNetworkSpeed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  label: undefined,
  hideLabel: false,
  ariaLabel: 'Loading',
  showNetworkSpeed: false
})

// Network status integration
const { networkInfo } = useNetworkStatus()

// Prefers reduced motion for battery saving
const useReducedMotion = computed(() => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

// Network speed indicator
const connectionQuality = computed(() => networkInfo.value.connectionQuality)
const networkSpeedLabel = computed(() => {
  switch (networkInfo.value.connectionQuality) {
    case 'poor':
      return 'Slow Connection'
    case 'fair':
      return 'Fair Connection'
    default:
      return ''
  }
})
</script>

<style scoped lang="postcss">
.loading-spinner {
  @apply inline-flex flex-col items-center justify-center;
}

/* Size variants */
.sm .spinner {
  @apply w-4 h-4;
}

.md .spinner {
  @apply w-8 h-8;
}

.lg .spinner {
  @apply w-12 h-12;
}

/* Spinner animation */
.spinner {
  @apply animate-spin;
}

.spinner.low-motion {
  @apply animate-[spin_2s_linear_infinite];
}

/* SVG circle styling */
.path {
  @apply stroke-current text-primary-600 dark:text-primary-400;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

/* Loading text */
.label {
  @apply mt-2 text-sm text-gray-600 dark:text-gray-300;
}

.with-label {
  @apply space-y-2;
}

/* Network speed indicator */
.network-speed {
  @apply mt-1 text-xs px-2 py-1 rounded-full;
}

.network-speed.poor {
  @apply bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200;
}

.network-speed.fair {
  @apply bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200;
}

/* Animation for the spinner path */
@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .spinner {
    @apply animate-[spin_2s_linear_infinite];
  }
  
  .path {
    animation: dash 2.5s ease-in-out infinite;
  }
}
</style>