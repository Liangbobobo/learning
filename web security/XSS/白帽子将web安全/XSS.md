JavaScript调试工具
firebug
fiddler
httpwatch

？storage？
？get post？

# XSS 
XSS攻击成功后，攻击者能对用户当前浏览的页面植入恶意脚本，通过恶意脚本，控制用户的浏览器。这些用以完成各种具体功能的恶意脚本，称为XSS payload    
XSS payload 实际上就是JavaScript脚本，或者Flash或其他富客户端的脚本，任何JavaScript可以实现的功能，XSS payload都能做到。  
1. cookie 劫持  
？？cookie是什么？？  
废弃的 escape() 方法生成新的由十六进制转义序列替换的字符串.   

## 构造get和post请求 
仅通过JavaScript就能能使浏览器发起GET post请求
例子：  
如果知道某博客正常删除文章链接，攻击者可以通过插入一张图片发起一个get请求：  
P64    
```
var img = decument.createElement("img");  
img.src= "删除文章链接和另一篇文章id"
document.body.appendChild(img);
```

如果网站接受POST请求，  
```
var dd=document.createElement("div");
document.body.appendChild(dd);
dd.innerHTML='<form action="" method="post" id="xssform" namne="mbform">' +
```



