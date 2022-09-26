import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// global components
import pluginComponents from '@/components/pluginComponents'

// global style
import './assets/main.scss'

createApp(App)
  .use(store)
  .use(router)
  .use(pluginComponents)
  .mount('#app')
