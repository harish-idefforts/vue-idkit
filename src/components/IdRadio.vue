<template>
  <div :class="wrapperClasses">
    <label :class="labelWrapperClasses">
      <input
        type="radio"
        :checked="modelValue === value"
        :disabled="disabled"
        :value="value"
        :name="name"
        :class="radioClasses"
        v-bind="$attrs"
        @change="handleChange"
      />
      <span v-if="label || $slots.default" :class="labelTextClasses">
        <slot>{{ label }}</slot>
      </span>
    </label>
    <p v-if="helperText" :class="helperClasses">{{ helperText }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  },
  value: {
    type: [String, Number, Boolean],
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  helperText: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const wrapperClasses = computed(() => {
  return 'flex flex-col'
})

const labelWrapperClasses = computed(() => {
  const baseClasses = 'inline-flex items-center cursor-pointer'
  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : ''
  return `${baseClasses} ${disabledClasses}`
})

const radioClasses = computed(() => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const colorClasses = {
    primary: 'text-primary-600 focus:ring-primary-500',
    secondary: 'text-gray-600 focus:ring-gray-500',
    success: 'text-green-600 focus:ring-green-500',
    danger: 'text-red-600 focus:ring-red-500',
    warning: 'text-yellow-400 focus:ring-yellow-300',
    info: 'text-blue-600 focus:ring-blue-500'
  }

  const baseClasses = 'bg-gray-100 border-gray-300 focus:ring-2 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 transition-colors duration-200'
  const disabledClasses = props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'

  return `${baseClasses} ${sizeClasses[props.size]} ${colorClasses[props.color]} ${disabledClasses}`
})

const labelTextClasses = computed(() => {
  const sizeClasses = {
    sm: 'ml-2 text-sm',
    md: 'ml-2 text-sm',
    lg: 'ml-3 text-base'
  }

  const baseClasses = 'font-medium text-gray-900 dark:text-gray-300'

  return `${baseClasses} ${sizeClasses[props.size]}`
})

const helperClasses = computed(() => {
  return 'mt-1 text-sm text-gray-500 dark:text-gray-400'
})

const handleChange = (event) => {
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>
