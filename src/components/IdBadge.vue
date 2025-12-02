<template>
  <span :class="badgeClasses">
    <component v-if="icon" :is="icon" :class="iconClasses" />
    <slot></slot>
    <button
      v-if="dismissible"
      type="button"
      :class="closeButtonClasses"
      @click="handleDismiss"
    >
      <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
      <span class="sr-only">Remove badge</span>
    </button>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => [
      'default',
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'info',
      'dark'
    ].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  pill: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Object,
    default: null
  },
  dismissible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['dismiss'])

const badgeClasses = computed(() => {
  const baseClasses = 'inline-flex items-center font-medium gap-1'

  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  }

  // Rounded classes
  const roundedClasses = props.pill ? 'rounded-full' : 'rounded'

  // Variant classes
  const variantClasses = {
    default: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    info: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
    dark: 'bg-gray-800 text-gray-300 dark:bg-gray-700 dark:text-gray-300'
  }

  // Border variant classes
  const borderVariantClasses = {
    default: 'bg-blue-100 text-blue-800 border border-blue-400 dark:bg-gray-700 dark:text-blue-400 dark:border-blue-400',
    primary: 'bg-blue-100 text-blue-800 border border-blue-400 dark:bg-gray-700 dark:text-blue-400 dark:border-blue-400',
    secondary: 'bg-gray-100 text-gray-800 border border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-500',
    success: 'bg-green-100 text-green-800 border border-green-400 dark:bg-gray-700 dark:text-green-400 dark:border-green-400',
    danger: 'bg-red-100 text-red-800 border border-red-400 dark:bg-gray-700 dark:text-red-400 dark:border-red-400',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-gray-700 dark:text-yellow-300 dark:border-yellow-300',
    info: 'bg-cyan-100 text-cyan-800 border border-cyan-400 dark:bg-gray-700 dark:text-cyan-400 dark:border-cyan-400',
    dark: 'bg-gray-800 text-gray-300 border border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500'
  }

  const colorClasses = props.border
    ? borderVariantClasses[props.variant]
    : variantClasses[props.variant]

  return `${baseClasses} ${sizeClasses[props.size]} ${roundedClasses} ${colorClasses}`
})

const iconClasses = computed(() => {
  const sizeClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5'
  }

  return sizeClasses[props.size]
})

const closeButtonClasses = computed(() => {
  return 'inline-flex items-center p-0.5 ms-2 text-sm bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300 transition-colors duration-150'
})

const handleDismiss = () => {
  emit('dismiss')
}
</script>
