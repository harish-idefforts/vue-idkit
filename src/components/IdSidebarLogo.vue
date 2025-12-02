<template>
  <component
    :is="tag"
    :href="tag === 'a' ? href : undefined"
    :to="tag === 'router-link' ? href : undefined"
    class="flex items-center pl-2.5 mb-5"
  >
    <!-- Logo slot or image prop -->
    <slot name="logo">
      <img
        v-if="logo"
        :src="logo"
        class="h-6 me-3 sm:h-7"
        :alt="name"
      />
    </slot>
    <!-- Text slot or name prop -->
    <slot name="text">
      <span v-if="name" class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
        {{ name }}
      </span>
    </slot>
  </component>
</template>

<script setup>
defineProps({
  /**
   * The brand/company name to display
   */
  name: {
    type: String,
    default: ''
  },
  /**
   * URL to the logo image
   */
  logo: {
    type: String,
    default: ''
  },
  /**
   * Link destination (href for 'a' tag, to for 'router-link')
   */
  href: {
    type: String,
    default: '/'
  },
  /**
   * HTML tag or component to render (a, router-link, nuxt-link)
   */
  tag: {
    type: String,
    default: 'a',
    validator: (value) => ['a', 'router-link', 'nuxt-link'].includes(value)
  }
})
</script>
