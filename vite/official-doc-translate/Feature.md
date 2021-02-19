# Features  
 在最基础的层面中，使用vite和静态文件服务器（static file server）没有很大的区别。但是，vite基于ESM的import加强了更多通常在bundler-based setups的特性。  

 vite是如何解决npm依赖和预编译（Pre-Bundling）  
原生 ES imports不支持裸引用（ bare module imports ） ：  
```javascript 
import { someMethod } from 'my-dep'
//不支持
```
上面的import会在浏览器中throw一个错误。vite会在所有已提供的源文件中探测这样的裸引用，并执行：  
1.预编译（Pre-bundle）并提升页面的加载速度以及转换CommonJS / UMD 为ESM。esbuild会执行pre-bundling步骤，并使得vite的冷启动比任何JavaScript-based bundler显著提升速度。  
2.重写import到valid（有效）的URLs，以便浏览器能合适（properly）的import。
> vite caches 依赖需要通过HTTP headers，若要手动locally edit/debug，详见https://vitejs.dev/guide/dep-pre-bundling.html#browser-cache  

# Hot Module Replacement  
Vite提供基于原生ESM的HMR API。具有HMR的框架可以利用这些API提供即时，准确的更新而不需要重新加载界面或破坏应用程序状态。
> 注意并不需要手动配置上述内容，当通过@vitejs/create-app 创建一个app时，选中的template会自动配置这些Pre-configured。

# Typescript  
> 待补充

