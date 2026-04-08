import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
// vamos usar SCSS depois

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')