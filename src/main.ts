import { createApp } from 'vue'
import { App } from './components'
import { router } from './router'

createApp(App).use(router).mount('#app')
