<template>
  <label :class="wrapperClasses">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="sr-only peer"
      v-bind="$attrs"
      @change="handleChange"
    />
    <div :class="toggleClasses"></div>
    <span v-if="label || $slots.default" :class="labelClasses">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
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
  const baseClasses = 'inline-flex items-center cursor-pointer'
  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : ''
  return `${baseClasses} ${disabledClasses}`
})

const toggleClasses = computed(() => {
  const sizeClasses = {
    sm: 'w-9 h-5 after:h-4 after:w-4',
    md: 'w-11 h-6 after:h-5 after:w-5',
    lg: 'w-14 h-7 after:h-6 after:w-6'
  }

  const colorClasses = {
    primary: 'peer-checked:bg-primary-600',
    secondary: 'peer-checked:bg-gray-600',
    success: 'peer-checked:bg-green-600',
    danger: 'peer-checked:bg-red-600',
    warning: 'peer-checked:bg-yellow-400',
    info: 'peer-checked:bg-blue-600'
  }

  const afterTransform = {
    sm: 'peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full',
    md: 'peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full',
    lg: 'peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full'
  }

  const baseClasses = 'relative bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800'
  const afterClasses = "after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600"

  return `${baseClasses} ${sizeClasses[props.size]} ${colorClasses[props.color]} ${afterClasses} ${afterTransform[props.size]}`
})

const labelClasses = computed(() => {
  const sizeClasses = {
    sm: 'ml-2 text-sm',
    md: 'ml-3 text-sm',
    lg: 'ml-3 text-base'
  }

  const baseClasses = 'font-medium text-gray-900 dark:text-gray-300'

  return `${baseClasses} ${sizeClasses[props.size]}`
})

const handleChange = (event) => {
  const checked = event.target.checked
  emit('update:modelValue', checked)
  emit('change', checked)
}
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
</style>
