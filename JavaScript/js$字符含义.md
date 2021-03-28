在ES6 字符串的扩展一章中：
https://es6.ruanyifeng.com/?search=type&x=0&y=0#docs/string
JavaScript 中的$ 使用场景：
传统的模板输出中不能嵌入变量如：
“  There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
”

ES6中引入了模板字符串：
```
`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`
```
模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
```
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串,所有的空格和缩进都会被保留在输出之中。
`In JavaScript this is
 not legal.`
// 比如<ul>标签前面会有一个换行。如果你不想要这个换行，可以使用trim方法消除它。

`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim()


console.log(`string text line 1
string text line 2`);
```


> 字符串中嵌入变量,大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性,还能调用函数。
如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的toString方法
如果模板字符串中的变量没有声明，将报错。
由于模板字符串的大括号内部，就是执行 JavaScript 代码，因此如果大括号内部是一个字符串，将会原样输出。


```
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```
如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
```
let greeting = `\`Yo\` World!`;
```

模板字符串甚至还能嵌套,另一个模板字符串。
```

```

如果需要引用模板字符串本身，在需要时执行，可以写成函数。
```
let func = (name) => `Hello ${name}!`;
func('Jack') // "Hello Jack!"
```
