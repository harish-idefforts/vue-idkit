<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :class="cardClasses"
    v-bind="$attrs"
  >
    <!-- Image (if provided) -->
    <img
      v-if="imgSrc && variant === 'image'"
      :src="imgSrc"
      :alt="imgAlt"
      class="rounded-t-lg"
    />

    <!-- Horizontal Layout Image -->
    <img
      v-if="imgSrc && variant === 'horizontal'"
      :src="imgSrc"
      :alt="imgAlt"
      class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
    />

    <!-- Content Container -->
    <div :class="contentClasses">
      <slot />
    </div>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'image', 'horizontal'].includes(value)
  },
  imgSrc: {
    type: String,
    default: ''
  },
  imgAlt: {
    type: String,
    default: 'Card image'
  },
  href: {
    type: String,
    default: ''
  },
  shadow: {
    type: Boolean,
    default: true
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  padding: {
    type: String,
    default: 'p-5',
    validator: (value) => ['p-0', 'p-3', 'p-5', 'p-6', 'p-8'].includes(value)
  }
})

const cardClasses = computed(() => {
  const baseClasses = 'bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700'
  const shadowClass = props.shadow ? 'shadow' : ''
  const hoverClass = props.hoverable ? 'hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200' : ''
  const linkClass = props.href ? 'cursor-pointer' : ''
  const horizontalClass = props.variant === 'horizontal' ? 'flex flex-col md:flex-row' : ''

  return `${baseClasses} ${shadowClass} ${hoverClass} ${linkClass} ${horizontalClass}`
})

const contentClasses = computed(() => {
  // No padding for image cards at the top level - content inside can have padding
  if (props.variant === 'image' || props.variant === 'horizontal') {
    return 'flex flex-col justify-between leading-normal'
  }
  return props.padding
})
</script>
