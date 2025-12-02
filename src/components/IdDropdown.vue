<template>
  <div class="relative inline-block" ref="dropdownRef">
    <!-- Trigger -->
    <div @click="toggle">
      <slot name="trigger">
        <button
          type="button"
          :class="triggerClasses"
        >
          {{ triggerText }}
          <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>
      </slot>
    </div>

    <!-- Dropdown Menu -->
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        :class="dropdownClasses"
        @click="handleItemClick"
      >
        <slot>
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
            <template v-for="(item, index) in items" :key="index">
              <li v-if="item.divider" class="my-1">
                <hr class="border-gray-200 dark:border-gray-600" />
              </li>
              <li v-else>
                <a
                  href="#"
                  :class="itemClasses"
                  @click.prevent="handleSelect(item)"
                >
                  <component v-if="item.icon" :is="item.icon" class="w-4 h-4 mr-2" />
                  {{ item.label }}
                </a>
              </li>
            </template>
          </ul>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
    // Array of { label: string, value: any, icon?: Component, divider?: boolean }
  },
  triggerText: {
    type: String,
    default: 'Dropdown'
  },
  placement: {
    type: String,
    default: 'bottom',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  },
  align: {
    type: String,
    default: 'start',
    validator: (value) => ['start', 'end'].includes(value)
  },
  closeOnSelect: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['select'])

const isOpen = ref(false)
const dropdownRef = ref(null)

const triggerClasses = computed(() => {
  return 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors duration-200'
})

const dropdownClasses = computed(() => {
  const baseClasses = 'absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'

  const placementClasses = {
    bottom: 'top-full mt-2',
    top: 'bottom-full mb-2',
    left: 'right-full mr-2 top-0',
    right: 'left-full ml-2 top-0'
  }

  const alignClasses = {
    start: props.placement === 'bottom' || props.placement === 'top' ? 'left-0' : '',
    end: props.placement === 'bottom' || props.placement === 'top' ? 'right-0' : ''
  }

  return `${baseClasses} ${placementClasses[props.placement]} ${alignClasses[props.align]}`
})

const itemClasses = computed(() => {
  return 'flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-150'
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const handleSelect = (item) => {
  emit('select', item)
  if (props.closeOnSelect) {
    close()
  }
}

const handleItemClick = (e) => {
  // Prevent dropdown from closing when clicking inside custom content
  if (!props.closeOnSelect && !e.target.closest('a')) {
    e.stopPropagation()
  }
}

// Click outside to close
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
