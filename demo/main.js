import { createApp } from 'vue'
import App from './App.vue'
import { IdKit } from '../src/index.js'

const app = createApp(App)

// Register all components globally for the playground
app.use(IdKit)

app.mount('#app')
