<template>
  <div class="relative overflow-x-auto" :class="wrapperClass">
    <table :class="tableClasses">
      <thead :class="headClasses">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            scope="col"
            :class="headerCellClasses"
            @click="column.sortable ? handleSort(column.key) : null"
            :style="{ cursor: column.sortable ? 'pointer' : 'default' }"
          >
            <div class="flex items-center gap-2">
              {{ column.label }}
              <span v-if="column.sortable && sortKey === column.key">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <slot :sorted-data="sortedData">
          <tr
            v-for="(row, rowIndex) in sortedData"
            :key="rowIndex"
            :class="rowClasses"
          >
            <td
              v-for="(column, colIndex) in columns"
              :key="colIndex"
              :class="cellClasses"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </slot>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
    // Array of { key: string, label: string, sortable?: boolean }
  },
  data: {
    type: Array,
    default: () => []
  },
  striped: {
    type: Boolean,
    default: false
  },
  hoverable: {
    type: Boolean,
    default: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'dark'].includes(value)
  },
  wrapperClass: {
    type: String,
    default: 'shadow-md sm:rounded-lg'
  }
})

const emit = defineEmits(['sort'])

const sortKey = ref(null)
const sortOrder = ref('asc')

const tableClasses = computed(() => {
  const baseClasses = 'w-full text-sm text-left rtl:text-right'

  const variantClasses = {
    default: 'text-gray-500 dark:text-gray-400',
    dark: 'text-gray-400'
  }

  return `${baseClasses} ${variantClasses[props.variant]}`
})

const headClasses = computed(() => {
  const variantClasses = {
    default: 'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400',
    dark: 'text-xs text-gray-400 uppercase bg-gray-700'
  }

  return variantClasses[props.variant]
})

const headerCellClasses = computed(() => {
  return 'px-6 py-3'
})

const rowClasses = computed(() => {
  const baseClasses = 'border-b'

  const variantClasses = {
    default: 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700',
    dark: 'bg-gray-800 border-gray-700'
  }

  const stripedClasses = props.striped
    ? 'odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-800'
    : ''

  const hoverClasses = props.hoverable
    ? 'hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150'
    : ''

  return `${baseClasses} ${variantClasses[props.variant]} ${stripedClasses} ${hoverClasses}`
})

const cellClasses = computed(() => {
  return 'px-6 py-4'
})

const handleSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  emit('sort', { key: sortKey.value, order: sortOrder.value })
}

const sortedData = computed(() => {
  if (!sortKey.value) {
    return props.data
  }

  return [...props.data].sort((a, b) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]

    if (aVal === bVal) return 0

    const comparison = aVal > bVal ? 1 : -1
    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})
</script>
