import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'; //Optional default CSS
import './assets/tailwind.css'

import SimpleTypeahead from 'vue3-simple-typeahead';

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(SimpleTypeahead);

app.mount('#app')
