# class 与 style 绑定  
操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是 attribute，所以我们可以用 v-bind 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 v-bind 用于 class 和 style 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。  

# 绑定 HTML Class    
## 把一个对象传递给class：  
``` <div :class="{ active: isActive }"></div> ```  
active 这个 class 存在与否将取决于数据 property isActive 的 truthiness

可以在对象中传入更多字段来动态切换多个 class。此外，:class 指令也可以与普通的 class attribute 共存  
``` 
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

当 isActive 或者 hasError 变化时，class 列表将相应地更新。  

## 绑定的数据对象不必内联定义在模板里  
```
<div :class="classObject"></div>
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
渲染的结果和上面一样。
```
## 也可以在这里绑定一个返回对象的计算属性
```
<div :class="classObject"></div>
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}

```
## 数组语法
可以把一个数组传给 :class，以应用一个 class 列表：
```
<div :class="[activeClass, errorClass]"></div>
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}

```
渲染结果为： ``` <div class="active text-danger"></div> ```

## 三元表达式 
``` <div :class="[isActive ? activeClass : '', errorClass]"></div>```

## 在数组语法中也可以使用对象语法 
``` <div :class="[{ active: isActive }, errorClass]"></div>```

# 在组件上使用 
当你在带有单个根元素的自定义组件上使用 class attribute 时，这些 class 将被添加到该元素中。此元素上的现有 class 将不会被覆盖。  

## 如果你的组件有多个根元素，你需要定义哪些部分将接收这个类。可以使用 $attrs 组件属性执行此操作
```
<div id="app">
  <my-component class="baz"></my-component>
</div>

const app = Vue.createApp({})

app.component('my-component', {
  template: `
    <p :class="$attrs.class">Hi!</p>
    <span>This is a child component</span>
  `
})


```

# 绑定内联样式
## 对象语法
:style 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

## 直接绑定到一个样式对象通常更好，这会让模板更清晰

```
<div :style="styleObject"></div>
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}


```

同样的，对象语法常常结合返回对象的计算属性使用

## 数组语法
:style 的数组语法可以将多个样式对象应用到同一个元素上：```<div :style="[baseStyles, overridingStyles]"></div>
 ```

自动添加前缀,在 :style 中使用需要 (浏览器引擎前缀) vendor prefixes
的 CSS property 时，如 transform，Vue 将自动侦测并添加相应的前缀。

多重值 

可以为 style 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：
```
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>

```

这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。