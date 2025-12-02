<template>
  <div :class="accordionClasses">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="itemClasses"
    >
      <!-- Header -->
      <button
        type="button"
        :class="headerClasses(index)"
        @click="toggle(index)"
      >
        <span class="flex items-center">
          <component v-if="item.icon" :is="item.icon" class="w-5 h-5 me-2 shrink-0" />
          {{ item.title }}
        </span>
        <svg
          :class="iconClasses(index)"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <!-- Content -->
      <Transition name="accordion">
        <div v-if="isOpen(index)" :class="contentWrapperClasses">
          <div :class="contentClasses">
            <slot :name="`item-${index}`">
              <p class="text-gray-500 dark:text-gray-400">{{ item.content }}</p>
            </slot>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
    // Array of { title: string, content: string, icon?: Component }
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'bordered', 'flush'].includes(value)
  },
  alwaysOpen: {
    type: Boolean,
    default: false
  },
  openFirst: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])

const openItems = ref(props.openFirst ? [0] : [])

const accordionClasses = computed(() => {
  const baseClasses = 'divide-y divide-gray-200 dark:divide-gray-700'

  const variantClasses = {
    default: '',
    bordered: 'border border-gray-200 dark:border-gray-700 rounded-lg',
    flush: ''
  }

  return `${baseClasses} ${variantClasses[props.variant]}`
})

const itemClasses = computed(() => {
  return props.variant === 'flush' ? '' : ''
})

const headerClasses = (index) => {
  const baseClasses = 'flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 transition-colors duration-200'

  const variantClasses = {
    default: 'focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800',
    bordered: 'focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800',
    flush: ''
  }

  const roundedClasses = props.variant === 'bordered' && index === 0 ? 'rounded-t-lg' : ''

  return `${baseClasses} ${variantClasses[props.variant]} ${roundedClasses}`
}

const iconClasses = (index) => {
  const baseClasses = 'w-3 h-3 rotate-180 shrink-0 transition-transform duration-200'
  const rotatedClasses = isOpen(index) ? '' : 'rotate-180'
  return `${baseClasses} ${rotatedClasses}`
}

const contentWrapperClasses = computed(() => {
  const baseClasses = 'overflow-hidden transition-all duration-200'
  return baseClasses
})

const contentClasses = computed(() => {
  return 'p-5 border-b border-gray-200 dark:border-gray-700'
})

const isOpen = (index) => {
  return openItems.value.includes(index)
}

const toggle = (index) => {
  const openIndex = openItems.value.indexOf(index)

  if (props.alwaysOpen) {
    // Multiple items can be open
    if (openIndex > -1) {
      openItems.value.splice(openIndex, 1)
    } else {
      openItems.value.push(index)
    }
  } else {
    // Only one item can be open at a time
    if (openIndex > -1) {
      openItems.value = []
    } else {
      openItems.value = [index]
    }
  }

  emit('toggle', { index, isOpen: isOpen(index) })
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.2s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 1000px;
}
</style>
