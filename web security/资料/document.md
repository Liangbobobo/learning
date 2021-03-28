# W3C 的 Dom Level 1 核心是一个用于修改文档内容树的强大的对象模型。它被所有主流浏览器支持着，包括火狐浏览器和微软 IE 浏览器。它是网页脚本编程的强大基础。

# Document

Document 接口表示任何在浏览器中载入的网页，并作为网页内容的入口，也就是 DOM 树。它向网页文档本身提供了全局操作功能，能解决如何获取页面的 URL ，如何在文档中创建一个新的元素这样的问题。   

Document.open()方法打开一个要写入的文档，无参数，返回一个document对象实例。  
这将会有一些连带的影响。例如：此时已注册到文档、文档中的节点或文档的window的所有事件监听器会被清除。文档中的所有节点会被清除。   
> document.open();
document.write("<p>Hello world!</p>");
document.write("<p>I am a fish</p>");
document.write("<p>The number is 42</p>");
document.close();  
代码，会打开一个文档，并将原有内容替换为一些不同的HTML片段，然后关闭文档。  

当 document.write() 在页面加载后调用，会发生自动的 document.open()调用。  

很多年以来，Firefox和IE浏览器会在清除所有节点的同时，将所有Javascript变量等一并清除，但现在已经不采用这一做法。

不要和 window.open() 方法混淆。document.open 可用于重写当前的文档内容或者追加内容, 而 window.open 是提供了打开一个新的窗口的方法，当前的网页文档内容会被保留。由于 window 是一个全局对象，直接调用 open(...)  和 window.open(...) 的效果是一样的。你可以使用 document.close（）关闭打开的文档。 

如果不想在当前文本追加内容， 使用 open("text/html", "replace") 替换 open() .
https://developer.mozilla.org/zh-CN/docs/Web/API/Document/open
针对Gecko的注意事项:


https://developer.mozilla.org/zh-CN/docs/Web/API/Document/write

document.write

# 什么是内容树？
任何HTML文档 （或者说任何SGML文档或者 XML 文档) 是一个树状结构。  


# whitespace in the DOM （DOM中的空白符）  
DOM 中的空白符会让处理节点结构时增加不少麻烦。在Mozilla 的软件中，原始文件里所有空白符都会在 DOM 中出现（不包括标签内含的空白符）。这样的处理方式有其必要之处，一方面编辑器中可迳行排列文字、二方面 CSS 里的 white-space: pre 也才能发挥作用。 如此一来就表示：   
* 有些空白符会自成一个文本节点。  
* 有些空白符会与其他文本节点合成为一个文本节点。  

这么一来要使用 DOM 游走于节点结构间又不想要无用的空白符时，会有点困难。  

解决方案 https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Whitespace  

