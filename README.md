# @idefforts/vue-idkit

Vue 3 component library styled with Tailwind CSS. Includes buttons, inputs, tables, modals, sidebars, toggles, pagination, alerts, and more.

## Installation

```bash
npm install @idefforts/vue-idkit @heroicons/vue
# or
yarn add @idefforts/vue-idkit @heroicons/vue
```

Add your Tailwind stylesheet (required for the utility classes used by the components). Ensure your `tailwind.config.js` scans the library so classes are not purged:

```js
// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@idefforts/vue-idkit/src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  // ...rest of your config
}
```

## Basic usage (plugin)

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { IdKit } from '@idefforts/vue-idkit'

const app = createApp(App)
app.use(IdKit) // registers all components globally
app.mount('#app')
```

Then use any component:

```vue
<template>
  <IdCard class="p-6 space-y-4">
    <IdButton variant="primary">Primary</IdButton>
    <IdToggle v-model="enabled" label="Enable notifications" />
  </IdCard>
</template>

<script setup>
import { ref } from 'vue'
const enabled = ref(true)
</script>
```

## Importing individual components

```vue
<script setup>
import { IdButton, IdInput } from '@idefforts/vue-idkit'
</script>
```

## Run the local demo

This repo includes a small playground to try the components without wiring a host app.

```bash
npm install
npm run demo
```

Then open http://localhost:5173 to see the example page (`demo/App.vue`). The demo uses the Tailwind CDN for quick styling; in production apps you should compile Tailwind normally.

## Build the library

```bash
npm run build
```

Outputs the library bundle to `dist/`.
