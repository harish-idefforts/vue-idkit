<template>
  <Teleport to="body">
    <div :class="containerClasses">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="toastClasses(toast)"
        >
          <!-- Icon -->
          <div v-if="toast.showIcon !== false" :class="iconWrapperClasses(toast)">
            <component
              v-if="toast.icon"
              :is="toast.icon"
              class="w-5 h-5"
            />
            <svg
              v-else-if="toast.variant === 'success'"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              v-else-if="toast.variant === 'danger'"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              v-else-if="toast.variant === 'warning'"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              v-else
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>

          <!-- Content -->
          <div class="ml-3 text-sm font-normal flex-1">
            <div v-if="toast.title" class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              {{ toast.title }}
            </div>
            <div class="text-sm font-normal">
              {{ toast.message }}
            </div>
          </div>

          <!-- Close button -->
          <button
            v-if="toast.dismissible !== false"
            type="button"
            class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            @click="dismiss(toast.id)"
          >
            <span class="sr-only">Close</span>
            <svg
              class="w-3 h-3"
              fill="none"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  position: {
    type: String,
    default: 'top-right',
    validator: (value) => ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].includes(value)
  }
})

const toasts = ref([])
let toastId = 0

const containerClasses = computed(() => {
  const positionClasses = {
    'top-left': 'top-5 left-5',
    'top-center': 'top-5 left-1/2 -translate-x-1/2',
    'top-right': 'top-5 right-5',
    'bottom-left': 'bottom-5 left-5',
    'bottom-center': 'bottom-5 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-5 right-5'
  }

  return `fixed ${positionClasses[props.position]} z-50 flex flex-col gap-4`
})

const toastClasses = (toast) => {
  const variantClasses = {
    info: 'text-blue-500 bg-white dark:bg-gray-800 dark:text-blue-400',
    success: 'text-green-500 bg-white dark:bg-gray-800 dark:text-green-400',
    warning: 'text-orange-500 bg-white dark:bg-gray-800 dark:text-orange-400',
    danger: 'text-red-500 bg-white dark:bg-gray-800 dark:text-red-400'
  }

  const baseClasses = 'flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800'

  return `${baseClasses} ${variantClasses[toast.variant || 'info']}`
}

const iconWrapperClasses = (toast) => {
  const variantClasses = {
    info: 'text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200',
    success: 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200',
    warning: 'text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200',
    danger: 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200'
  }

  return `inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${variantClasses[toast.variant || 'info']}`
}

const show = (options) => {
  const id = ++toastId
  const toast = {
    id,
    message: options.message || '',
    title: options.title || '',
    variant: options.variant || 'info',
    duration: options.duration || 3000,
    dismissible: options.dismissible !== false,
    showIcon: options.showIcon !== false,
    icon: options.icon || null
  }

  toasts.value.push(toast)

  if (toast.duration > 0) {
    setTimeout(() => {
      dismiss(id)
    }, toast.duration)
  }

  return id
}

const dismiss = (id) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const dismissAll = () => {
  toasts.value = []
}

defineExpose({
  show,
  dismiss,
  dismissAll
})
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
