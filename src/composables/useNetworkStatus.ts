import { ref, onMounted, onUnmounted } from 'vue'

export interface NetworkInfo {
  isOnline: boolean
  connectionType: string
  effectiveType: string
  downlink: number
  rtt: number
  saveData: boolean
  lastOnlineTime?: number
  reconnectionAttempts: number
  connectionQuality: 'excellent' | 'good' | 'fair' | 'poor'
  isMetered?: boolean
}

export interface ConnectionQualityThresholds {
  excellent: { downlink: number; rtt: number }
  good: { downlink: number; rtt: number }
  fair: { downlink: number; rtt: number }
}

// Thresholds optimized for Ghana's network conditions
const CONNECTION_QUALITY_THRESHOLDS: ConnectionQualityThresholds = {
  excellent: { downlink: 5, rtt: 150 },    // 5 Mbps, 150ms
  good: { downlink: 2, rtt: 300 },         // 2 Mbps, 300ms
  fair: { downlink: 0.5, rtt: 500 }        // 500 Kbps, 500ms
}

export function useNetworkStatus() {
  const networkInfo = ref<NetworkInfo>({
    isOnline: navigator.onLine,
    connectionType: 'unknown',
    effectiveType: 'unknown',
    downlink: 0,
    rtt: 0,
    saveData: false,
    reconnectionAttempts: 0,
    connectionQuality: 'good'
  })

  // Calculate connection quality based on current metrics
  const calculateConnectionQuality = (downlink: number, rtt: number): NetworkInfo['connectionQuality'] => {
    if (downlink >= CONNECTION_QUALITY_THRESHOLDS.excellent.downlink && 
        rtt <= CONNECTION_QUALITY_THRESHOLDS.excellent.rtt) {
      return 'excellent'
    }
    if (downlink >= CONNECTION_QUALITY_THRESHOLDS.good.downlink && 
        rtt <= CONNECTION_QUALITY_THRESHOLDS.good.rtt) {
      return 'good'
    }
    if (downlink >= CONNECTION_QUALITY_THRESHOLDS.fair.downlink && 
        rtt <= CONNECTION_QUALITY_THRESHOLDS.fair.rtt) {
      return 'fair'
    }
    return 'poor'
  }

  // Update network type and quality information
  const updateNetworkInfo = () => {
    const connection = (navigator as any).connection
    const isCurrentlyOnline = navigator.onLine
    
    if (connection) {
      const quality = calculateConnectionQuality(connection.downlink, connection.rtt)
      
      networkInfo.value = {
        ...networkInfo.value,
        isOnline: isCurrentlyOnline,
        connectionType: connection.type,
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
        isMetered: connection.metered,
        connectionQuality: quality,
        lastOnlineTime: isCurrentlyOnline ? Date.now() : networkInfo.value.lastOnlineTime,
        reconnectionAttempts: isCurrentlyOnline ? 0 : networkInfo.value.reconnectionAttempts + 1
      }
    } else {
      networkInfo.value = {
        ...networkInfo.value,
        isOnline: isCurrentlyOnline,
        lastOnlineTime: isCurrentlyOnline ? Date.now() : networkInfo.value.lastOnlineTime,
        reconnectionAttempts: isCurrentlyOnline ? 0 : networkInfo.value.reconnectionAttempts + 1
      }
    }
  }

  // Initialize network info
  onMounted(() => {
    updateNetworkInfo()

    window.addEventListener('online', updateNetworkInfo)
    window.addEventListener('offline', updateNetworkInfo)

    const connection = (navigator as any).connection
    if (connection) {
      connection.addEventListener('change', updateNetworkInfo)
    }
  })

  // Cleanup listeners
  onUnmounted(() => {
    window.removeEventListener('online', updateNetworkInfo)
    window.removeEventListener('offline', updateNetworkInfo)

    const connection = (navigator as any).connection
    if (connection) {
      connection.removeEventListener('change', updateNetworkInfo)
    }
  })

  // Helper computed properties and methods
  const isSlowConnection = () => {
    const { effectiveType, connectionQuality } = networkInfo.value
    return effectiveType === 'slow-2g' || 
           effectiveType === '2g' || 
           effectiveType === 'slow-3g' ||
           connectionQuality === 'poor'
  }

  const shouldReduceDataUsage = () => {
    return networkInfo.value.saveData || 
           isSlowConnection() || 
           networkInfo.value.isMetered
  }

  const getTimeSinceLastOnline = () => {
    if (!networkInfo.value.lastOnlineTime) return null
    return Date.now() - networkInfo.value.lastOnlineTime
  }

  const getConnectionStatus = () => {
    const { isOnline, connectionQuality, effectiveType } = networkInfo.value
    
    if (!isOnline) return 'offline'
    if (connectionQuality === 'poor' || effectiveType === 'slow-2g') return 'very-slow'
    if (connectionQuality === 'fair' || effectiveType === '2g') return 'slow'
    if (connectionQuality === 'good' || effectiveType === '3g') return 'moderate'
    return 'fast'
  }

  const getReconnectionDelay = () => {
    // Exponential backoff with max delay of 30 seconds
    const attempts = networkInfo.value.reconnectionAttempts
    return Math.min(Math.pow(2, attempts) * 1000, 30000)
  }

  // Actively check connection by pinging a reliable endpoint
  const checkActiveConnection = async () => {
    try {
      const startTime = performance.now()
      await fetch('https://www.google.com/favicon.ico', {
        mode: 'no-cors',
        cache: 'no-cache'
      })
      const endTime = performance.now()
      
      // Update RTT based on actual ping
      if (networkInfo.value.isOnline) {
        networkInfo.value.rtt = endTime - startTime
        networkInfo.value.connectionQuality = calculateConnectionQuality(
          networkInfo.value.downlink,
          networkInfo.value.rtt
        )
      }
      
      return true
    } catch (error) {
      return false
    }
  }

  return {
    networkInfo,
    isSlowConnection,
    shouldReduceDataUsage,
    getTimeSinceLastOnline,
    getConnectionStatus,
    getReconnectionDelay,
    checkActiveConnection
  }
}
