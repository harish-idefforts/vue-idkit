<template>
  <ul class="space-y-2 font-medium" :class="{ 'pt-4 mt-4 border-t border-gray-200 dark:border-gray-700': bordered }">
    <slot />
  </ul>
</template>

<script setup>
defineProps({
  /**
   * Whether to show a top border separator
   */
  bordered: {
    type: Boolean,
    default: false
  }
})
</script>
