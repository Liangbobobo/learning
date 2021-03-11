转自：https://stackoverflow.com/questions/6003819/what-is-the-difference-between-properties-and-attributes-in-html#answer-6004028



# HTML 中 attribute （特性） 和 property（属性） 区别

 一、当写 HTML 源码时，你可以在你的HTML元素上定义 attributes，当浏览器解析你的代码时，一个相应的 DOM 节点会被创建，这个节点是一个对象，因此他有 property。  
例如：这样一个 HTML 元素，定义了两个 attribute，type 和 value  
``` <input type="text" value="Name:"> ```  
当浏览器解析这段代码时，一个 HTMLInputeElement 对象会被创建，这个对象会包含一系列 property：attributes, accept, accessKey, align, alt, autofocus, baseURI, checked, childElementCount, childNodes, children, classList, className, clientHeight, etc.

二、对一个给定的 DOM 节点对象：  
properties 是这个对象的 properties。  
attributes 是 这个对象的attributes property 元素。（attributes are the elements of the attributes property of that object.）


三、为给定的 HTML 元素创建 DOM 节点时，他的许多 property 和 attribute 有相同或相似的名字，但他们不是一对一的关系，比如对于这样一个 HTML 元素：```<input id="the-input" type="text" value="Name:">```  
对于相应的 dom 节点，会有 id,type, and value properties：  
1. id property，对id attribute来说他是一个映射的 property ：获取、读取 attribute value。id 是一个纯映射 property，他不修改，不限制 the value
2. type property 是 type attribute 的映射：获取、读取 atttibute value，写入 attribute value。  
但 type 不是单纯的映射，因为他仅限于使用已定义的那些 value值（比如输入的有效类型） If you had ```<input type="foo">```, then theInput.getAttribute("type") gives you "foo" but theInput.type gives you "text".
3. 相比之下，value property 不是the value attribute的映射 ，他是输入的当前值。当用户手动更改输入框的值时，值属性将反映此更改。因此，如果用户在输入框中输入"John"
theInput.value // returns "John"
theInput.getAttribute('value') // returns "Name:"

value property 反映输入框内的当前文本内容；然而value attribute 包含来自 HTML 源代码的 value attribute的初始文本内容，
theInput.value // returns "John"
theInput.getAttribute('value') // returns "Name:"
theInput.defaultValue // returns "Name:"

因此，当你想获得 tex-box内当前的内容是什么，read the property；而，当你想获得the value of the text-box的初始内容，使用attribute，或者使用defaultValue property，这是对value attribute的纯映射。
```
theInput.value                 // returns "John"
theInput.getAttribute('value') // returns "Name:"
theInput.defaultValue          // returns "Name:"
```

一些 properties直接映射他们的attribute (rel, id)，  
有些是名称略有不同的直接映射(htmlFor reflects the for attribute, className reflects the class attribute)  
更多映射（reflect）their attribute but with restrictions/modifications（限制与修改） (src, href, disabled, multiple),等等。


未完待续，该回答下面还有许多优秀的回答，尚未整理。