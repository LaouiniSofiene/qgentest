import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Store from './store/store'
import Loading from 'vue3-loading-screen'

const app = createApp(App)

app.use(router).use(ElementPlus).use(Store).use(Loading, {
    bg: '#41b883ad',
    icon: 'refresh',
    size: 3,
    icon_color: 'white',
})
app.mount('#app')
