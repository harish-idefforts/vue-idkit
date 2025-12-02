<template>
  <div class="relative inline-block" @mouseenter="show" @mouseleave="hide">
    <!-- Trigger Element -->
    <slot></slot>

    <!-- Tooltip -->
    <Transition name="tooltip">
      <div
        v-if="isVisible"
        :class="tooltipClasses"
        role="tooltip"
      >
        {{ text }}
        <slot name="content"></slot>
        <!-- Arrow -->
        <div :class="arrowClasses"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  placement: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'right', 'bottom', 'left'].includes(value)
  },
  variant: {
    type: String,
    default: 'dark',
    validator: (value) => ['dark', 'light'].includes(value)
  }
})

const isVisible = ref(false)

const show = () => {
  isVisible.value = true
}

const hide = () => {
  isVisible.value = false
}

const tooltipClasses = computed(() => {
  const baseClasses = 'absolute z-10 px-3 py-2 text-sm font-medium rounded-lg shadow-sm whitespace-nowrap'

  const variantClasses = {
    dark: 'bg-gray-900 text-white dark:bg-gray-700',
    light: 'bg-white text-gray-900 border border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600'
  }

  const placementClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 me-2'
  }

  return `${baseClasses} ${variantClasses[props.variant]} ${placementClasses[props.placement]}`
})

const arrowClasses = computed(() => {
  const baseClasses = 'absolute w-2 h-2 rotate-45'

  const variantClasses = {
    dark: 'bg-gray-900 dark:bg-gray-700',
    light: 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600'
  }

  const placementClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 -mt-1',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-1',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-1'
  }

  const borderClasses = {
    top: props.variant === 'light' ? 'border-b border-r' : '',
    right: props.variant === 'light' ? 'border-b border-l' : '',
    bottom: props.variant === 'light' ? 'border-t border-l' : '',
    left: props.variant === 'light' ? 'border-t border-r' : ''
  }

  return `${baseClasses} ${variantClasses[props.variant]} ${placementClasses[props.placement]} ${borderClasses[props.placement]}`
})
</script>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}
</style>
