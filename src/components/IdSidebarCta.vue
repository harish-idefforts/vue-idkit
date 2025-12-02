<template>
  <div
    v-if="visible"
    :id="id"
    class="p-4 mt-6 rounded-lg"
    :class="variantClasses"
    role="alert"
  >
    <div class="flex items-center mb-3">
      <span
        class="text-sm font-semibold me-2 px-2.5 py-0.5 rounded"
        :class="labelClasses"
      >
        {{ label }}
      </span>
      <button
        v-if="closable"
        type="button"
        class="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1 inline-flex items-center justify-center h-6 w-6"
        :class="closeButtonClasses"
        :aria-label="closeAriaLabel"
        @click="handleClose"
      >
        <span class="sr-only">Close</span>
        <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
    <p class="mb-3 text-sm" :class="textClasses">
      <slot />
    </p>
    <slot name="actions">
      <a
        v-if="actionText && actionHref"
        :class="actionClasses"
        :href="actionHref"
      >
        {{ actionText }}
      </a>
    </slot>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  /**
   * Unique ID for the CTA
   */
  id: {
    type: String,
    default: 'sidebar-cta'
  },
  /**
   * Label text displayed in the badge
   */
  label: {
    type: String,
    default: 'Beta'
  },
  /**
   * Color variant
   */
  variant: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'green', 'yellow', 'red', 'purple', 'gray'].includes(value)
  },
  /**
   * Whether the CTA can be closed
   */
  closable: {
    type: Boolean,
    default: true
  },
  /**
   * Aria label for close button
   */
  closeAriaLabel: {
    type: String,
    default: 'Close'
  },
  /**
   * Action link text
   */
  actionText: {
    type: String,
    default: ''
  },
  /**
   * Action link href
   */
  actionHref: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const visible = ref(true)

const variantClasses = computed(() => {
  const variants = {
    blue: 'bg-blue-50 dark:bg-blue-900',
    green: 'bg-green-50 dark:bg-green-900',
    yellow: 'bg-yellow-50 dark:bg-yellow-900',
    red: 'bg-red-50 dark:bg-red-900',
    purple: 'bg-purple-50 dark:bg-purple-900',
    gray: 'bg-gray-100 dark:bg-gray-700'
  }
  return variants[props.variant]
})

const labelClasses = computed(() => {
  const variants = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900',
    green: 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900',
    red: 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900',
    gray: 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100'
  }
  return variants[props.variant]
})

const textClasses = computed(() => {
  const variants = {
    blue: 'text-blue-800 dark:text-blue-400',
    green: 'text-green-800 dark:text-green-400',
    yellow: 'text-yellow-800 dark:text-yellow-400',
    red: 'text-red-800 dark:text-red-400',
    purple: 'text-purple-800 dark:text-purple-400',
    gray: 'text-gray-800 dark:text-gray-300'
  }
  return variants[props.variant]
})

const closeButtonClasses = computed(() => {
  const variants = {
    blue: 'bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800',
    green: 'bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:bg-green-900 dark:text-green-400 dark:hover:bg-green-800',
    yellow: 'bg-yellow-50 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-400 dark:hover:bg-yellow-800',
    red: 'bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800',
    purple: 'bg-purple-50 text-purple-500 focus:ring-purple-400 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-400 dark:hover:bg-purple-800',
    gray: 'bg-gray-100 text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
  }
  return variants[props.variant]
})

const actionClasses = computed(() => {
  const variants = {
    blue: 'text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300',
    green: 'text-sm text-green-800 underline font-medium hover:text-green-900 dark:text-green-400 dark:hover:text-green-300',
    yellow: 'text-sm text-yellow-800 underline font-medium hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300',
    red: 'text-sm text-red-800 underline font-medium hover:text-red-900 dark:text-red-400 dark:hover:text-red-300',
    purple: 'text-sm text-purple-800 underline font-medium hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300',
    gray: 'text-sm text-gray-800 underline font-medium hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
  }
  return variants[props.variant]
})

const handleClose = () => {
  visible.value = false
  emit('close')
}
</script>
