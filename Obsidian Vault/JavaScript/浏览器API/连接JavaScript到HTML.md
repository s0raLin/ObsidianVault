## 内联JavaScript(Inline JavaScript)
将JavaScript代码直接嵌入到HTML元素中，用于创建简单的交互效果。
```html
<button onclick="alert('Hello, World!')">Click Me</button>
```
**代码解释：**  
当用户点击按钮时，`onclick` 事件被触发，浏览器会执行 `alert('Hello, World!')`，弹出一个提示对话框。

## 使用`<script>`标签的内部JavaScript
在当前页面中创建脚本,`<script>`通常放在HTML标签的`<head>`中，或者`<body>`的底部

```js
<!DOCTYPE html>
<html>
<head>
    <title>Internal JavaScript Example</title>
</head>
<body>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('The page is fully loaded');
        });
    </script>
</body>
</html>
```

`DOMContentLoaded` 事件会在 HTML 文档解析完成后触发。当页面加载完成时，控制台会输出一条日志信息，说明页面已经准备就绪。

## 外部JavaScript文件
将JavaScript代码写在独立的.js文件中，然后通过`<script src="...">`引入到HTML页面中

```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Connecting JavaScript to HTML</title>
  </head>
  <body>
    <script src="assets/js/main.js"></script>
  </body>
</html>
```
**代码解释：**  
这里通过 `<script>` 标签引入了 `assets/js/main.js` 文件，并且将其放在 `</body>` 结束标签之前，确保 HTML 内容先加载完成。

使用外部 JavaScript 文件的优势包括：

- **可复用性**：同一个脚本可以被多个 HTML 页面引用，减少重复代码
- **可维护性**：JavaScript 与 HTML 分离，代码更清晰，方便调试和更新
- **性能更好**：浏览器可以缓存外部 JavaScript 文件，加快用户再次访问时的加载速度

## 最佳实践

在实际开发中，建议遵循以下最佳实践：

### 1. `<head>` 还是 `<body>`？

通常建议将 `<script>` 标签放在 `<body>` 底部。这样可以先渲染 HTML 内容，再执行 JavaScript，避免脚本阻塞页面渲染，提高页面加载速度和用户体验。

---

### 2. `async` 属性

`async` 属性允许脚本与 HTML 同时下载，并在下载完成后**立即执行**，而不等待 HTML 解析完成。  
适用于**不依赖 DOM 或其他脚本**的独立脚本。

示例：

```html
<script src="independent-script.js" async></script>
```

**代码解释：**  
脚本会异步加载，并在下载完成后立刻执行，执行顺序不确定。

---

### 3. `defer` 属性

`defer` 属性会让脚本在后台下载，但**等 HTML 解析完成后再执行**。  
多个 `defer` 脚本会按照它们在 HTML 中出现的顺序依次执行，非常适合依赖 DOM 结构或相互依赖的脚本。

示例：

```html
<script src="dependent-script.js" defer></script>
```

**代码解释：**  
脚本会在页面解析完成后执行，确保 DOM 已经准备好。
