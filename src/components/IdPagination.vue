<template>
  <nav :aria-label="ariaLabel">
    <ul class="inline-flex -space-x-px text-sm">
      <!-- Previous Button -->
      <li>
        <button
          type="button"
          :class="getPreviousClasses"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
          </svg>
          <span v-if="showLabels" class="ms-2">Previous</span>
        </button>
      </li>

      <!-- First Page -->
      <li v-if="showFirstLast && currentPage > 3">
        <button
          type="button"
          :class="getPageClasses(1)"
          @click="goToPage(1)"
        >
          1
        </button>
      </li>

      <!-- First Ellipsis -->
      <li v-if="showFirstLast && currentPage > 4">
        <span :class="ellipsisClasses">...</span>
      </li>

      <!-- Page Numbers -->
      <li v-for="page in visiblePages" :key="page">
        <button
          type="button"
          :class="getPageClasses(page)"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </li>

      <!-- Last Ellipsis -->
      <li v-if="showFirstLast && currentPage < totalPages - 3">
        <span :class="ellipsisClasses">...</span>
      </li>

      <!-- Last Page -->
      <li v-if="showFirstLast && currentPage < totalPages - 2">
        <button
          type="button"
          :class="getPageClasses(totalPages)"
          @click="goToPage(totalPages)"
        >
          {{ totalPages }}
        </button>
      </li>

      <!-- Next Button -->
      <li>
        <button
          type="button"
          :class="getNextClasses"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          <span v-if="showLabels" class="me-2">Next</span>
          <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    required: true
  },
  maxVisiblePages: {
    type: Number,
    default: 5
  },
  showFirstLast: {
    type: Boolean,
    default: true
  },
  showLabels: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: 'Pagination'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const currentPage = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const visiblePages = computed(() => {
  const pages = []
  const maxPages = props.maxVisiblePages
  const total = props.totalPages
  const current = currentPage.value

  let start = Math.max(1, current - Math.floor(maxPages / 2))
  let end = Math.min(total, start + maxPages - 1)

  if (end - start < maxPages - 1) {
    start = Math.max(1, end - maxPages + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const baseButtonClasses = 'flex items-center justify-center px-3 h-8 leading-tight border transition-colors duration-200'

const getPageClasses = (page) => {
  const isActive = page === currentPage.value

  if (isActive) {
    return `${baseButtonClasses} text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white`
  }

  return `${baseButtonClasses} text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`
}

const getPreviousClasses = computed(() => {
  const isDisabled = currentPage.value === 1
  const baseClasses = `${baseButtonClasses} rounded-s-lg`

  if (isDisabled) {
    return `${baseClasses} text-gray-300 bg-white border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-600`
  }

  return `${baseClasses} text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`
})

const getNextClasses = computed(() => {
  const isDisabled = currentPage.value === props.totalPages
  const baseClasses = `${baseButtonClasses} rounded-e-lg`

  if (isDisabled) {
    return `${baseClasses} text-gray-300 bg-white border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-600`
  }

  return `${baseClasses} text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`
})

const ellipsisClasses = computed(() => {
  return `${baseButtonClasses} text-gray-500 bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default`
})

const goToPage = (page) => {
  if (page < 1 || page > props.totalPages || page === currentPage.value) return

  currentPage.value = page
  emit('change', page)
}
</script>
