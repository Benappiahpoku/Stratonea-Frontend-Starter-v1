<template>
  <div class="network-aware-image" :class="{ loading: isLoading }">
    <!-- Placeholder while loading -->
    <div v-if="isLoading" class="placeholder" :style="{ paddingBottom: aspectRatio + '%' }">
      <div class="loading-spinner">
        <svg class="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>

    <!-- Low quality placeholder -->
    <img
      v-if="shouldShowPlaceholder"
      :src="lowQualitySrc"
      :alt="alt"
      class="image placeholder-image"
      :style="{ opacity: imageLoaded ? 0 : 1 }"
    />

    <!-- Main image -->
    <img
      ref="mainImage"
      :src="optimizedSrc"
      :alt="alt"
      class="image main-image"
      :style="{ opacity: imageLoaded ? 1 : 0 }"
      @load="onImageLoad"
    />

    <!-- Data saver notice -->
    <div v-if="showDataSaverNotice" class="data-saver-notice">
      <button @click="loadFullImage" class="load-full-btn">
        Load full quality image {{ props.fullSizeKB ? `(${formatSize(props.fullSizeKB)})` : '' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useNetworkStatus } from '../composables/useNetworkStatus'

interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  lowQualityWidth?: number
  fullSizeKB?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: undefined,
  height: undefined,
  lowQualityWidth: 400,
  fullSizeKB: undefined
})

const { shouldReduceDataUsage } = useNetworkStatus()

const isLoading = ref(true)
const imageLoaded = ref(false)
const loadedFullQuality = ref(false)
const mainImage = ref<HTMLImageElement | null>(null)

// Calculate aspect ratio for placeholder
const aspectRatio = computed(() => {
  if (props.width && props.height) {
    return (props.height / props.width) * 100
  }
  return 56.25 // Default 16:9 aspect ratio
})

// Determine if we should show low quality placeholder
const shouldShowPlaceholder = computed(() => 
  shouldReduceDataUsage() && !loadedFullQuality.value
)

// Show data saver notice if on metered connection or slow network
const showDataSaverNotice = computed(() => 
  shouldReduceDataUsage() && 
  !loadedFullQuality.value && 
  Boolean(props.fullSizeKB) && 
  props.fullSizeKB! > 100
)

// Generate optimized image source based on network conditions
const optimizedSrc = computed(() => {
  const baseUrl = props.src
  if (shouldReduceDataUsage() && !loadedFullQuality.value) {
    // Return low quality version for slow connections
    return generateOptimizedUrl(baseUrl, {
      width: props.lowQualityWidth,
      quality: 40
    })
  }
  // Return full quality for good connections
  return generateOptimizedUrl(baseUrl, {
    width: props.width,
    quality: 80
  })
})

// Generate low quality placeholder
const lowQualitySrc = computed(() => 
  generateOptimizedUrl(props.src, {
    width: props.lowQualityWidth,
    quality: 20
  })
)

// Handle image load
const onImageLoad = () => {
  imageLoaded.value = true
  isLoading.value = false
}

// Load full quality image on demand
const loadFullImage = () => {
  loadedFullQuality.value = true
}

// Format file size for display
const formatSize = (kb: number): string => {
  if (kb >= 1024) {
    return `${(kb / 1024).toFixed(1)} MB`
  }
  return `${kb} KB`
}

// Generate optimized image URL (integrate with your image service)
const generateOptimizedUrl = (url: string, options: { width?: number; quality?: number }) => {
  // This is a placeholder - integrate with your actual image optimization service
  const params = new URLSearchParams()
  if (options.width) params.append('w', options.width.toString())
  if (options.quality) params.append('q', options.quality.toString())
  
  // If using a service like Cloudinary, Imgix, etc., modify the URL accordingly
  return `${url}?${params.toString()}`
}

// Preload low quality image
onMounted(() => {
  if (shouldShowPlaceholder.value) {
    const preloadImage = new Image()
    preloadImage.src = lowQualitySrc.value
  }
})
</script>

<style scoped>
.network-aware-image {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.placeholder {
  position: relative;
  background-color: #f3f4f6;
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
}

.placeholder-image {
  filter: blur(10px);
}

.data-saver-notice {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem;
  text-align: center;
}

.load-full-btn {
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.load-full-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
