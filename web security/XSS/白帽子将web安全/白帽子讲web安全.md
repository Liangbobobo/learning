# 名词
exploi：，中文：利用，指黑客们使用的漏洞利用代码  
webshell：web的可执行脚本  
patch：补丁  
Pwn2own：黑客任意攻击操作系统的竞赛  
URL：统一资源定位器，
host：是一种连接到 Internet （或者一个本地网络）的设备。有一些被称作 servers （服务器）的主机可以提供额外的服务，如：提供网页、存储文件以及电子邮件。主机不需要具有一个硬件上的实体，它可以由虚拟机产生。由虚拟机产生的主机也叫作“虚拟主机”。    
域名或ip地址，IP地址看作一个根域名

？document ？：Document 接口表示任何在浏览器中载入的网页，并作为网页内容的入口，也就是DOM 树。DOM 树包含了像 <body> 、<table> 这样的元素，以及大量其他元素。它向网页文档本身提供了全局操作功能，能解决如何获取页面的 URL ，如何在文档中创建一个新的元素这样的问题。

？cookie ？：
？XMLhttpRequest的常规步骤？
？MIME(Multipurpose Internet Mail Extensions)？

网页渲染的步骤？？


# 同源策略（Same origin policy）：  
是浏览器最核心和最基本的安全功能  
定义：两个URL的protocol （），port，host（主机）都相同的话，则这两个 URL 是同源。这个方案也被称为“协议/主机/端口元组”，或者直接是 “元组”。（“元组” 是指一组项目构成的整体，双重/三重/四重/五重/等的通用形式）。    

浏览器的同源策略，限制了来自不同源的“document”或脚本，对当前“document”读取或设置属性。

note：对当前页面来说，页面内存放JavaScript文件的域并不重要，重要的是加载JavaScript页面所在的域是什么。例如：  
```
<script src=heep://b.com/b.js><script>  

a.com加载了b.com上的b.js,但是b.js是运行在a.com页面中的，因此对于当前打开的页面a.com来说，b.js的origin就是a.com而不是b.js 
```

相似的标签还有，```<scipt> ,<img>,<iframe>,<link>  ```等，都可以跨域加载资源，不受同源策略的限制。这些带src属性的标签每次加载时，实质上时由浏览器发起一次get，但不同于XMLHttpRequest，通过src属性加载的资源，浏览器限制了JavaScript的权限，使其不能读、写返回的内容。  

XMLHttpRequest，可以访问来自同源的内容，但其收到同源策略约束，不能跨域。   
 W3C委员会制定了，XMLHttpRequest跨域访问的标准，通过目标域返回的http头来授权是否允许跨域访问。？具体实施？

？ 跨源资源共享（CORS） ？  

对浏览器，除了DOM,Cookie,XMLHttpRequest会受到同源策略限制，一些浏览器加载的第三方插件也有各自的同源策略，如：flash，java，applet，silverlight，google gears等都有自己的控制策略。



# 挂马  
在网页中插入一段恶意代码，利用浏览器漏洞执行任意代码的攻击的方式 称为挂马  
浏览器多进程架构：将浏览器各个功能模块分开，各个浏览器实例分开，当一个进程崩溃时，也不会影响到其他的进程。


# 第三章 跨站脚本攻击（XSS）  
 


























# 进程和线程的区别 

https://www.zhihu.com/question/25532384


# 进程，Process  
是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位，是操作系统结构的基础。

# 线程 thread  
是操作系统能够进行运算调度的最小单位。它被包含在进程之中，是进程中的实际运作单位。一条线程指的是进程中一个单一顺序的控制流，一个进程中可以并发多个线程，每条线程并行执行不同的任务。

# 并发(concurrency)和并行(parallellism)   
并发是指一个处理器同时处理多个任务。 并行是指多个处理器或者是多核的处理器同时处理多个不同的任务