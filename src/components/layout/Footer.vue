<template>
  <!-- Footer -->
  <footer class="bg-primary-600 text-white mt-auto mb-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col items-center space-y-4">
        <!-- Social Icons
        <div class="flex space-x-4">
         <span>  We will love to hear from you - <a
          href="mailto:Stratoneaconsult@gmail.com" >Click to email </a> </span>   <a
            href="mailto:Stratoneaconsult@gmail.com"
            class="text-white hover:text-white/80 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>  <span>  <a
            href="https://wa.me/0594093926"
            target="_blank"
            rel="noopener noreferrer">or &nbsp; Chat with us on </a>  </span> 
          <a
            href="https://wa.me/0594093926"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white hover:text-white/80 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                transform="translate(0,1)"
                d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
              />
            </svg>
          </a>
         
        </div> -->

        <!-- Social Icons -->

        <div class="text-center">
          <span class="text-md text-center"
            >We will love to hear from you. <br /> </span> 
            <span class="text-sm">
            <a href="https://wa.me/0594093926"
            target="_blank"
            rel="noopener noreferrer"> WhatsApp:+233-0594093926 </a><br />
            <a  href="mailto:Stratoneaconsult@gmail.com">Email: Startoneaconsult@gmail.com </a>
          </span>
        </div>

        <!-- Support Us -->
        <div class="text-center">
          <span class="text-sm text-center"
            >Enjoying the Tool? Support the Stratonea SME Fund to help keep it FREE</span
          >
          <button
            @click="copyToClipboard('0594093926')"
            class="text-white text-sm hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
          >
            <span class="flex text-sm items-center gap-1">
              Momo Us:
              <font-awesome-icon icon="fa-solid fa-copy" />
              0594093926
            </span>
          </button>
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
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast.ts'

const toast = useToast()

// Copy to clipboard function
async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  } catch (err) {
    toast.error('Failed to copy. Please try manually.')
  }
}
</script>
