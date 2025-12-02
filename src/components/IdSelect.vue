<template>
  <div :class="wrapperClass">
    <label
      v-if="label"
      :for="selectId"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      :id="selectId"
      v-model="model"
      :disabled="disabled"
      :class="selectClasses"
      v-bind="$attrs"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="getOptionValue(option)"
        :value="getOptionValue(option)"
      >
        {{ getOptionLabel(option) }}
      </option>
    </select>

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
    type: [String, Number, Boolean],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  optionLabel: {
    type: String,
    default: 'label'
  },
  optionValue: {
    type: String,
    default: 'value'
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
  required: {
    type: Boolean,
    default: false
  },
  selectId: {
    type: String,
    default: () => `select-${Math.random().toString(36).substring(2, 11)}`
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

const getOptionLabel = (option) => {
  if (typeof option === 'object') {
    return option[props.optionLabel]
  }
  return option
}

const getOptionValue = (option) => {
  if (typeof option === 'object') {
    return option[props.optionValue]
  }
  return option
}

const labelClasses = computed(() => {
  return 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
})

const selectClasses = computed(() => {
  const baseClasses = 'block w-full border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200'

  // Size classes
  const sizeClasses = {
    sm: 'p-2 text-xs',
    md: 'p-2.5 text-sm',
    lg: 'p-4 text-base'
  }

  // State classes
  const stateClasses = {
    default: 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    success: 'bg-green-50 border-green-500 text-green-900 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-green-400 dark:border-green-500',
    error: 'bg-red-50 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:border-red-500',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-900 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-yellow-400 dark:border-yellow-500'
  }

  // Disabled class
  const disabledClass = props.disabled ? 'cursor-not-allowed opacity-50' : ''

  return `${baseClasses} ${sizeClasses[props.size]} ${stateClasses[props.state]} ${disabledClass}`
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
