<template>
  <div :class="wrapperClass">
    <label
      v-if="label"
      :for="inputId"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <!-- Prefix Icon -->
      <div v-if="prefixIcon" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <component :is="prefixIcon" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>

      <!-- Input Field -->
      <input
        :id="inputId"
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="inputClasses"
        v-bind="$attrs"
      />

      <!-- Suffix Icon -->
      <div v-if="suffixIcon" class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <component :is="suffixIcon" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
    </div>

    <!-- Helper Text -->
    <p v-if="helperText" :class="helperTextClasses">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  state: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'error', 'warning'].includes(value)
  },
  helperText: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  prefixIcon: {
    type: Object,
    default: null
  },
  suffixIcon: {
    type: Object,
    default: null
  },
  inputId: {
    type: String,
    default: () => `input-${Math.random().toString(36).substring(2, 11)}`
  },
  wrapperClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const labelClasses = computed(() => {
  return 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
})

const inputClasses = computed(() => {
  const baseClasses = 'block w-full border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200'

  // Size classes
  const sizeClasses = {
    sm: 'p-2 text-xs',
    md: 'p-2.5 text-sm',
    lg: 'p-4 text-base'
  }

  // Icon padding
  const iconPaddingClasses = props.prefixIcon && props.suffixIcon
    ? 'pl-10 pr-10'
    : props.prefixIcon
    ? 'pl-10'
    : props.suffixIcon
    ? 'pr-10'
    : ''

  // State classes
  const stateClasses = {
    default: 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    success: 'bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-green-400 dark:placeholder-green-500 dark:border-green-500',
    error: 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-900 placeholder-yellow-700 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-yellow-400 dark:placeholder-yellow-500 dark:border-yellow-500'
  }

  // Disabled class
  const disabledClass = props.disabled ? 'cursor-not-allowed opacity-50' : ''

  return `${baseClasses} ${sizeClasses[props.size]} ${iconPaddingClasses} ${stateClasses[props.state]} ${disabledClass}`
})

const helperTextClasses = computed(() => {
  const baseClasses = 'mt-2 text-sm'

  const stateClasses = {
    default: 'text-gray-500 dark:text-gray-400',
    success: 'text-green-600 dark:text-green-500',
    error: 'text-red-600 dark:text-red-500',
    warning: 'text-yellow-600 dark:text-yellow-500'
  }

  return `${baseClasses} ${stateClasses[props.state]}`
})
</script>
