<template>
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <!-- Desktop View -->
      <div class="hidden md:flex justify-center items-center h-16 max-w-7xl mx-auto px-4">
        <div class="flex space-x-8 items-center">
          <router-link to="/" class="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
            <font-awesome-icon icon="fa-solid fa-home" class="text-xl" />
            <span>Home</span>
          </router-link>
          
          <router-link to="/new-invoice" class="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
            <font-awesome-icon icon="fa-solid fa-plus-circle" class="text-xl" />
            <span>New Invoice</span>
          </router-link>
          
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
  
      <!-- Mobile View -->
      <div class="md:hidden flex justify-around items-center h-16">
        <router-link to="/" class="text-primary-600 hover:text-primary-700">
          <font-awesome-icon icon="fa-solid fa-home" class="text-2xl" />
        </router-link>
        
        <router-link to="/new-invoice" class="text-primary-600 hover:text-primary-700">
          <font-awesome-icon icon="fa-solid fa-plus-circle" class="text-2xl" />
        </router-link>
        
        <button @click="shareWhatsApp" class="text-green-600 hover:text-green-700">
          <font-awesome-icon icon="fa-brands fa-whatsapp" class="text-2xl" />
        </button>
        
        <button @click="downloadPDF" class="text-primary-600 hover:text-primary-700">
          <font-awesome-icon icon="fa-solid fa-download" class="text-2xl" />
        </button>
      </div>
    </div>
</template>

<script setup lang="ts">
// No changes needed in the script section
const shareWhatsApp = () => {
  // Implement WhatsApp sharing logic
  console.log('Share via WhatsApp')
}

const downloadPDF = () => {
  // Implement PDF download logic
  console.log('Download PDF')
}
</script>