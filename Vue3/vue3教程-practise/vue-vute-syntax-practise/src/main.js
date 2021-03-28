import { createApp } from 'vue'
import App from './App.vue'



const app1 =createApp(App)
// 在浏览器开发工具的 performance/timeline 面板中启用对组件初始化、编译、渲染和更新的性能追踪
app1.config.performance =true 
app1.mount('#app')

console.log(app1)