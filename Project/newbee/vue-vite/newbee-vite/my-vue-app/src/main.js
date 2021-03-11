import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css' // 全局引入样式


createApp(App)
    .use(Vant)
    .mount('#app')
    
