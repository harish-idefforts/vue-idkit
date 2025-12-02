<template>
  <Transition name="alert">
    <div v-if="!dismissed" :class="alertClasses" role="alert">
      <div class="flex items-start">
        <!-- Icon -->
        <component v-if="showIcon" :is="alertIcon" :class="iconClasses" />

        <!-- Content -->
        <div class="flex-1" :class="{ 'ms-3': showIcon }">
          <h3 v-if="title" :class="titleClasses">
            {{ title }}
          </h3>
          <div :class="contentClasses">
            <slot></slot>
          </div>
          <div v-if="$slots.actions" class="mt-3 flex gap-2">
            <slot name="actions"></slot>
          </div>
        </div>

        <!-- Close button -->
        <button
          v-if="dismissible"
          type="button"
          :class="closeButtonClasses"
          @click="dismiss"
        >
          <span class="sr-only">Close</span>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  variant: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'warning', 'danger'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  dismissible: {
    type: Boolean,
    default: false
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  icon: {
    type: Object,
    default: null
  },
  border: {
    type: Boolean,
    default: false
  },
  borderAccent: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['dismiss'])

const dismissed = ref(false)

const alertIcon = computed(() => {
  if (props.icon) return props.icon

  const icons = {
    info: InformationCircleIcon,
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    danger: XCircleIcon
  }

  return icons[props.variant]
})

const alertClasses = computed(() => {
  const baseClasses = 'p-4 rounded-lg'

  const variantClasses = {
    info: 'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400',
    success: 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400',
    warning: 'text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300',
    danger: 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400'
  }

  const borderClasses = {
    info: 'border border-blue-300 dark:border-blue-800',
    success: 'border border-green-300 dark:border-green-800',
    warning: 'border border-yellow-300 dark:border-yellow-800',
    danger: 'border border-red-300 dark:border-red-800'
  }

  const borderAccentClasses = {
    info: 'border-t-4 border-blue-500',
    success: 'border-t-4 border-green-500',
    warning: 'border-t-4 border-yellow-500',
    danger: 'border-t-4 border-red-500'
  }

  let classes = `${baseClasses} ${variantClasses[props.variant]}`

  if (props.border) {
    classes += ` ${borderClasses[props.variant]}`
  }

  if (props.borderAccent) {
    classes += ` ${borderAccentClasses[props.variant]}`
  }

  return classes
})

const iconClasses = computed(() => {
  return 'flex-shrink-0 w-5 h-5'
})

const titleClasses = computed(() => {
  return 'text-lg font-medium mb-1'
})

const contentClasses = computed(() => {
  return 'text-sm'
})

const closeButtonClasses = computed(() => {
  const variantClasses = {
    info: 'bg-blue-50 text-blue-500 hover:bg-blue-200 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700',
    success: 'bg-green-50 text-green-500 hover:bg-green-200 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700',
    warning: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-200 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700',
    danger: 'bg-red-50 text-red-500 hover:bg-red-200 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
  }

  return `ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 transition-colors duration-150 ${variantClasses[props.variant]}`
})

const dismiss = () => {
  dismissed.value = true
  emit('dismiss')
}
</script>

<style scoped>
.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease;
}

.alert-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.alert-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
