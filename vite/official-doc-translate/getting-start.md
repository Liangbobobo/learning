# Vite Getting Start
# sfc  
是 single file components 单文件组件  
# jsx  
是 JavaScript and xml，即在Javascript里面写XML，因为JSX的这个特性，所以他即具备了Javascript的灵活性，同时又兼具html的语义化和直观性。  
# vite  
https://vitejs.dev/guide/  
## start  
1.yarn create @vitejs/app my-vue-app --template vue  
2. cd my-vue-app  
3. yarn  install  
4. yarn  
# Guide  
##  index.html and Project Root  
在一个vite 项目中，index.html文件前置中间，而不是在public文件夹下面。这是故意设置的，在开发时vite是一个服务器，而index.html文件是你应用程序的入口。  

vite将index.html视为源代码和模块图表的一部分。他通过使用解决 ``` <script type="module" src="...">```引用你的JavaScript代码。甚至是内联样式的```<script type="module">```,或者使用```<link href> ```引用CSS。另外，index.html中的URLs也会重新设定，所以就不在需要``` %PUBLIC_URL%```。  

类似静态的HTTP服务器，vite也有根目录的概念指出你的文件来自哪里，之后的文档中你将看到根目录将会以```<root>```的形式引用。

vite用多个.html入口来支持 multi-page apps  

你可以通过``` vite serve some/sub/dir```指定一个备用的根（Specifying Alternative Root）。  

>？npx在npm中的意义？  

Command Line Interface 命令行界面  
```javascript  
{
  "scripts": {
    "dev": "vite",          // start dev server
    "build": "vite build",  // build for production
    "serve": "vite preview" // locally preview production build
  }
}
```
