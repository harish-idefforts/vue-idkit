<template>
  <div>
    <!-- Tab Headers -->
    <div :class="tabsContainerClasses">
      <ul :class="tabsListClasses">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          class="me-2"
          @click="selectTab(index)"
        >
          <button
            type="button"
            :class="getTabClasses(index)"
          >
            <component v-if="tab.icon" :is="tab.icon" class="w-4 h-4 me-2" />
            {{ tab.label }}
            <span v-if="tab.badge" :class="badgeClasses">
              {{ tab.badge }}
            </span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Tab Content -->
    <div class="mt-4">
      <slot :name="`tab-${activeTab}`">
        <slot></slot>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true
    // Array of { label: string, icon?: Component, badge?: string, disabled?: boolean }
  },
  modelValue: {
    type: Number,
    default: 0
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'pills', 'underline'].includes(value)
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const activeTab = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const tabsContainerClasses = computed(() => {
  const baseClasses = 'border-b border-gray-200 dark:border-gray-700'
  return props.variant === 'default' || props.variant === 'underline' ? baseClasses : ''
})

const tabsListClasses = computed(() => {
  const baseClasses = 'flex flex-wrap -mb-px text-sm font-medium text-center'
  const fullWidthClass = props.fullWidth ? 'grid' : ''
  const gridCols = props.fullWidth ? `grid-cols-${props.tabs.length}` : ''

  return `${baseClasses} ${fullWidthClass} ${gridCols}`
})

const getTabClasses = (index) => {
  const isActive = activeTab.value === index
  const isDisabled = props.tabs[index]?.disabled

  const baseClasses = 'inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg transition-colors duration-200'

  if (isDisabled) {
    return `${baseClasses} cursor-not-allowed opacity-50 border-transparent text-gray-400 dark:text-gray-500`
  }

  if (props.variant === 'default') {
    if (isActive) {
      return `${baseClasses} text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500`
    }
    return `${baseClasses} border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 text-gray-500 dark:text-gray-400`
  }

  if (props.variant === 'underline') {
    if (isActive) {
      return `${baseClasses} text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500`
    }
    return `${baseClasses} border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 text-gray-500 dark:text-gray-400`
  }

  if (props.variant === 'pills') {
    const pillBase = 'inline-flex items-center justify-center p-4 rounded-lg transition-colors duration-200'
    if (isActive) {
      return `${pillBase} text-white bg-blue-600 dark:bg-blue-500`
    }
    return `${pillBase} hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white text-gray-500 dark:text-gray-400`
  }

  return baseClasses
}

const badgeClasses = computed(() => {
  return 'inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full'
})

const selectTab = (index) => {
  if (props.tabs[index]?.disabled) return

  activeTab.value = index
  emit('change', index)
}
</script>
