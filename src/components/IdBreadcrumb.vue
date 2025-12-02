<template>
  <nav :class="wrapperClasses" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="inline-flex items-center"
      >
        <!-- Home Icon for first item (if specified) -->
        <component
          v-if="index === 0 && item.home"
          :is="item.icon"
          :class="getIconClasses(index)"
        />

        <!-- Separator (not for first item) -->
        <svg
          v-if="index > 0"
          class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>

        <!-- Link or Text -->
        <template v-if="index < items.length - 1">
          <a
            v-if="item.href"
            :href="item.href"
            :class="getLinkClasses(index)"
            @click="handleClick(item, $event)"
          >
            <component v-if="item.icon && !item.home" :is="item.icon" class="w-4 h-4 me-2" />
            <span v-if="!item.home || index > 0">{{ item.label }}</span>
          </a>
          <button
            v-else
            type="button"
            :class="getLinkClasses(index)"
            @click="handleClick(item, $event)"
          >
            <component v-if="item.icon && !item.home" :is="item.icon" class="w-4 h-4 me-2" />
            <span v-if="!item.home || index > 0">{{ item.label }}</span>
          </button>
        </template>

        <!-- Current/Last Item -->
        <span v-else :class="getCurrentClasses">
          <component v-if="item.icon && !item.home" :is="item.icon" class="w-4 h-4 me-2" />
          <span v-if="!item.home || index > 0">{{ item.label }}</span>
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
    // Array of { label: string, href?: string, icon?: Component, home?: boolean }
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'solid'].includes(value)
  }
})

const emit = defineEmits(['item-click'])

const wrapperClasses = computed(() => {
  const baseClasses = 'flex'

  if (props.variant === 'solid') {
    return `${baseClasses} px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700`
  }

  return baseClasses
})

const getIconClasses = (index) => {
  if (index === 0) {
    return 'w-3 h-3 me-2.5'
  }
  return 'w-4 h-4 me-2'
}

const getLinkClasses = (index) => {
  const baseClasses = 'inline-flex items-center text-sm font-medium transition-colors duration-200'

  if (index === 0) {
    return `${baseClasses} text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white`
  }

  return `${baseClasses} text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white`
}

const getCurrentClasses = computed(() => {
  return 'inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400'
})

const handleClick = (item, event) => {
  emit('item-click', { item, event })
}
</script>
