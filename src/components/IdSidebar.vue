<template>
  <aside :class="sidebarClasses">
    <div class="h-full px-3 py-4 overflow-y-auto flex flex-col">
      <slot>
        <ul class="space-y-2 font-medium">
          <li v-for="(item, index) in items" :key="index">
            <template v-if="item.children">
              <!-- Collapsible Item -->
              <button
                type="button"
                :class="buttonClasses"
                @click="toggleItem(item.id)"
              >
                <component v-if="item.icon" :is="item.icon" class="w-5 h-5" />
                <span class="flex-1 text-left whitespace-nowrap">{{ item.label }}</span>
                <IdBadge v-if="item.badge" :variant="item.badgeVariant || 'primary'" size="sm">
                  {{ item.badge }}
                </IdBadge>
                <svg
                  class="w-3 h-3 transition-transform duration-200"
                  :class="{ 'rotate-180': expandedItems.includes(item.id) }"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              <!-- Submenu -->
              <Transition name="submenu">
                <ul v-if="expandedItems.includes(item.id)" class="py-2 space-y-2">
                  <li v-for="(child, childIndex) in item.children" :key="childIndex">
                    <component
                      :is="itemTag"
                      :href="itemTag === 'a' ? (child.href || '#') : undefined"
                      :to="itemTag === 'router-link' ? (child.href || '/') : undefined"
                      :class="[linkClasses, 'pl-11']"
                      @click="handleItemClick(child, $event)"
                    >
                      <component v-if="child.icon" :is="child.icon" class="w-4 h-4" />
                      {{ child.label }}
                    </component>
                  </li>
                </ul>
              </Transition>
            </template>
            <template v-else>
              <!-- Single Item -->
              <component
                :is="itemTag"
                :href="itemTag === 'a' ? (item.href || '#') : undefined"
                :to="itemTag === 'router-link' ? (item.href || '/') : undefined"
                :class="linkClasses"
                @click="handleItemClick(item, $event)"
              >
                <component v-if="item.icon" :is="item.icon" class="w-5 h-5" />
                <span class="flex-1">{{ item.label }}</span>
                <IdBadge v-if="item.badge" :variant="item.badgeVariant || 'primary'" size="sm">
                  {{ item.badge }}
                </IdBadge>
              </component>
            </template>
          </li>
        </ul>
      </slot>

      <!-- Collapse Toggle Button -->
      <div v-if="collapsible" class="mt-auto pt-4">
        <button
          type="button"
          :class="collapseButtonClasses"
          @click="handleToggleCollapse"
        >
          <svg
            class="w-5 h-5 transition-transform duration-200"
            :class="{ 'rotate-180': collapsed }"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import IdBadge from './IdBadge.vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
    // Array of { id: string, label: string, href?: string, icon?: Component, badge?: string, badgeVariant?: string, children?: Array }
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'dark'].includes(value)
  },
  width: {
    type: String,
    default: 'w-64'
  },
  /**
   * Collapsed width when sidebar is minimized
   */
  collapsedWidth: {
    type: String,
    default: 'w-16'
  },
  /**
   * Whether the sidebar is collapsed
   */
  collapsed: {
    type: Boolean,
    default: false
  },
  /**
   * Whether the sidebar can be collapsed
   */
  collapsible: {
    type: Boolean,
    default: false
  },
  /**
   * HTML tag or component to use for navigation items (a, router-link, nuxt-link)
   */
  itemTag: {
    type: String,
    default: 'a',
    validator: (value) => ['a', 'router-link', 'nuxt-link'].includes(value)
  }
})

const emit = defineEmits(['item-click', 'toggle-collapse'])

const expandedItems = ref([])

const sidebarClasses = computed(() => {
  const widthClass = props.collapsed ? props.collapsedWidth : props.width
  const baseClasses = `${widthClass} h-full transition-all duration-300`

  const variantClasses = {
    default: 'bg-gray-50 dark:bg-gray-800',
    dark: 'bg-gray-900'
  }

  return `${baseClasses} ${variantClasses[props.variant]}`
})

const buttonClasses = computed(() => {
  return 'flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
})

const linkClasses = computed(() => {
  return 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors duration-150 gap-3'
})

const toggleItem = (id) => {
  const index = expandedItems.value.indexOf(id)
  if (index > -1) {
    expandedItems.value.splice(index, 1)
  } else {
    expandedItems.value.push(id)
  }
}

const handleItemClick = (item, event) => {
  emit('item-click', { item, event })
}

const handleToggleCollapse = () => {
  emit('toggle-collapse')
}

const collapseButtonClasses = computed(() => {
  const baseClasses = 'flex items-center w-full p-2 rounded-lg transition duration-75'

  const variantClasses = {
    default: 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
    dark: 'text-gray-300 hover:bg-gray-700 hover:text-white'
  }

  const justifyClass = props.collapsed ? 'justify-center' : ''

  return `${baseClasses} ${variantClasses[props.variant]} ${justifyClass}`
})
</script>

<style scoped>
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  max-height: 0;
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
