Setup
    是使用Composition API的入口；
    在声明周期beforeCreate事件之前被调用；
    可以返回一个对象，这个对象的属性被合并到渲染上下文，并可以在模板中直接使用；
    可以返回一个渲染函数，如下：
return () => h('div', [count.value, object.foo])
    接收props对象作为第一个参数，接收来的props对象，可以通过watchEffect监视其变化。
    接受context对象作为第二个参数，这个对象包含attrs，slots，emit三个属性。
