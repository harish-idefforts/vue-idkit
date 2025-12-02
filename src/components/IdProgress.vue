<template>
  <div :class="wrapperClasses">
    <!-- Label and percentage -->
    <div v-if="label || showPercentage" class="flex justify-between mb-1">
      <span v-if="label" :class="labelClasses">{{ label }}</span>
      <span v-if="showPercentage" :class="percentageClasses">{{ value }}%</span>
    </div>

    <!-- Progress bar -->
    <div :class="barWrapperClasses">
      <div
        :class="barClasses"
        :style="barStyle"
      >
        <span v-if="showPercentageInside" class="text-xs font-medium text-white text-center p-0.5 leading-none">
          {{ value }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100
  },
  label: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  showPercentage: {
    type: Boolean,
    default: false
  },
  showPercentageInside: {
    type: Boolean,
    default: false
  },
  striped: {
    type: Boolean,
    default: false
  },
  animated: {
    type: Boolean,
    default: false
  }
})

const wrapperClasses = computed(() => {
  return 'w-full'
})

const labelClasses = computed(() => {
  return 'text-base font-medium text-gray-900 dark:text-white'
})

const percentageClasses = computed(() => {
  return 'text-sm font-medium text-gray-900 dark:text-white'
})

const barWrapperClasses = computed(() => {
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
    xl: 'h-6'
  }

  const baseClasses = 'w-full bg-gray-200 rounded-full dark:bg-gray-700'

  return `${baseClasses} ${sizeClasses[props.size]}`
})

const barClasses = computed(() => {
  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-yellow-400',
    info: 'bg-blue-600',
    dark: 'bg-gray-800'
  }

  const baseClasses = 'rounded-full transition-all duration-300 ease-out flex items-center justify-center'
  const stripedClasses = props.striped ? 'bg-striped' : ''
  const animatedClasses = props.animated ? 'animate-striped' : ''

  return `${baseClasses} ${colorClasses[props.color]} ${stripedClasses} ${animatedClasses}`
})

const barStyle = computed(() => {
  return {
    width: `${props.value}%`,
    height: '100%'
  }
})
</script>

<style scoped>
.bg-striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

.animate-striped {
  animation: striped-animation 1s linear infinite;
}

@keyframes striped-animation {
  0% {
    background-position: 1rem 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
