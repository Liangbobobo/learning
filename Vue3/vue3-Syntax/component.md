# vue3 应用API

# vue组件与WebComponents 之间 关系  
你可能已经注意到 Vue 组件非常类似于自定义元素——它是 Web 组件规范 的一部分，这是因为 Vue 的组件语法部分参考了该规范。例如 Vue 组件实现了 Slot API

与 is attribute。但是，还是有几个关键差别：

    Web Components 规范已经完成并通过，但未被所有浏览器原生实现。目前 Safari 10.1+、Chrome 54+ 和 Firefox 63+ 原生支持 Web Components。相比之下，Vue 组件不需要任何 polyfill，并且在所有支持的浏览器 (IE11 及更高版本) 之下表现一致。必要时，Vue 组件也可以包裹于原生自定义元素之内。

    Vue 组件提供了纯自定义元素所不具备的一些重要功能，最突出的是跨组件数据流、自定义事件通信以及构建工具集成。  

# 应用 API  
 Vue 3 中，调用 createApp 返回一个应用实例。该实例提供了一个应用上下文。应用实例挂载的整个组件树共享相同的上下文。

 由于 createApp 方法返回应用实例本身，因此可以在其后链式调用其它方法，这些方法可以在以下部分中找到。
## component
参数：
    {string} name   
    {Function | Object} [definition]    

    如果传入 definition 参数，返回应用实例。
    如果不传入 definition 参数，返回组件定义。  

注册或检索全局组件。注册还会使用给定的 name 参数自动设置组件的 name

## config 包含应用配置的对象。
每个 Vue 应用都会暴露一个 config 对象，该对象包含此应用的配置设置：
```
const app = Vue.createApp({})

console.log(app.config)

```

在挂载应用之前，你可以修改其 property  

一、errorHandler  类型：Function ， 默认：undefined  
用法：
```
app.config.errorHandler = (err, vm, info) => {
  // 处理错误
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
}
指定一个处理函数，来处理组件渲染方法执行期间以及侦听器抛出的未捕获错误。这个处理函数被调用时，可获取错误信息和应用实例。
```
错误追踪服务 Sentry 和 Bugsnag使用此选项提供官方集成。

 

## globalProperties  
类型：[key: string]: any   
默认：undefined   
用法：
```
app.config.globalProperties.foo = 'bar'

app.component('child-component', {
  mounted() {
    console.log(this.foo) // 'bar'
  }
})
```

添加可以在应用程序内的任何组件实例中访问的全局 property。属性名冲突时，组件的 property 将具有优先权。

##  performance ,类型boolean ，默认：false
设置为 true 以在浏览器开发工具的 performance/timeline 面板中启用对组件初始化、编译、渲染和更新的性能追踪。只适用于开发模式和支持 performance.mark API 的浏览器。



## optionMergeStrategies ？
## warnHandler  ?  
## isCustomElement ？


