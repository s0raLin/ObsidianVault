如果一个HTML文档包含`<iframe>`标签：
* 整个HTML文档创建一个独立的window对象
* 每个`<iframe>`再创建一个独立的window对象

## 属性(Properties)
window对象是**全局的(global)**，你可以在程序的任何地方访问它的属性和方法
> 即使显式写出`window`，也能直接访问它的属性
### closed
根据窗口是否关闭返回`true`或`false`
```js
console.log(window.closed)
// 或
console.log(closed)
```

### innerHeight/innerWidth
返回当前窗口的高度/宽度(像素)

```js
console.log(innerHeight);
console.log(innerWidth);
```

window有很多属性，需要时自行查看[列表](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)


## 方法(Methods)
### open()
创建一个新的空白浏览器窗口
```js
open();
```
也可以指定URL
```js
open("https://baidu.com)
```
### close()
关闭由javascript打开的窗口(不能关闭用户手动打开的浏览器窗口)
```js
close();
```
### alert()
弹出一个包含消息和OK按钮的提示框:
```js
alert("Hello World");
```

### confirm()
弹出一个包含OK和Cancel按钮的对话框，点击按钮时返回boolean值
```js
confirm("Hello World");
```
* 点击**OK**返回`true`
* 点击**Cancel**返回`false`


[更多方法](https://developer.mozilla.org/en-US/docs/Web/API/Window)