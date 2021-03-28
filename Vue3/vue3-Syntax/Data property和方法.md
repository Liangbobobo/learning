# Data Property  
类型：组件的 data 选项是一个函数  
Vue 在创建新组件实例的过程中调用此函数。  
返回：它应该返回一个对象

 Vue 会通过响应性系统将其包裹起来，并以 $data 的形式存储在组件实例中。为方便起见，该对象的任何顶级 property 也直接通过组件实例暴露出来。 
 ```
console.log(vm.$data.count) // => 4
console.log(vm.count)       // => 4
 ``` 

 实例 property 仅在实例首次创建时被添加，所以你需要确保它们都在 data 函数返回的对象中。必要时，要对尚未提供所需值的 property 使用 null、undefined 或其他占位的值

Vue 使用 $ 前缀通过组件实例暴露自己的内置 API。它还为内部 property 保留 _ 前缀。你应该避免使用这两个字符开头的的顶级 data property 名称。

#  方法
methods 选项向组件实例添加方法.  
它应该是一个包含所需方法的对象  
### Vue 自动为 methods 绑定 this，以便于它始终指向组件实例。这将确保方法在用作事件监听或回调时保持正确的 this 指向。在定义 methods 时应避免使用箭头函数，因为这会阻止 Vue 绑定恰当的 this 指向。

可以在模板支持 JavaScript 表达式的任何地方调用方法,并将其作为渲染依赖项进行跟踪，就像直接在模板中使用过一样。  

从模板调用的方法不应该有任何副作用，比如更改数据或触发异步进程。如果你想这么做，应该换做生命周期钩子。

副作用？？？

# Vue 没有内置支持防抖和节流，但可以使用 Lodash 等库来实现。  

```
  如果某个组件仅使用一次，可以在 methods 中直接应用防抖：   

<script src="https://unpkg.com/lodash@4.17.20/lodash.min.js"></script>
<script>
  Vue.createApp({
    methods: {
      // 用 Lodash 的防抖函数
      click: _.debounce(function() {
        // ... 响应点击 ...
      }, 500)
    }
  }).mount('#app')
</script>

```

这种方法对于可复用组件有潜在的问题，因为它们都共享相同的防抖函数。为了使组件实例彼此独立，可以在生命周期钩子的 created 里添加该防抖函数:
```

app.component('save-button', {
  created() {
    // 用 Lodash 的防抖函数
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // 移除组件时，取消定时器
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... 响应点击 ...
    }
  },
  template: `
    <button @click="debouncedClick">
      Save
    </button>
  `
})
```