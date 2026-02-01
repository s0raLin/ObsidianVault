借助CSS,可以修改元素的颜色、字体、文本样式，以及页面内各个区块的大小和位置

你可以自己编写CSS样式，也可以使用现成的CSS模板如**Bootstrap**

CSS样式通常保存在.css文件中，但要注意文件过大/过多或影响页面渲染速度

## 外部CSS
在HTML中使用`<link>`引入.css文件
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Connecting External CSS to HTML</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
  </body>
</html>
```
- `href` 属性指定样式文件的路径
- `rel="stylesheet"` 告诉浏览器这是一个样式表，而不是其他类型的资源

## 内部CSS
可以在HTML文档中编写CSS样式，不需要单独的CSS文件

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Connecting Internal CSS to HTML</title>
    <style>
      这里应该写 CSS 代码
    </style>
  </head>
  <body>
  </body>
</html>
```
这种方式只适合样式非常少的情况。请记住，**始终将 CSS 放在单独的文件中是更好的实践**，这样可以让 HTML 更简洁，也方便在多个页面中复用样式。

## 行内CSS
可以使用HTML的style属性为某个元素单独设置样式

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Connecting Internal CSS to HTML</title>
  </head>
  <body>
    <p style="css 属性; css 属性;">Inline CSS</p>
  </body>
</html>
```

## CSS优先级
1. 行内CSS
2. 内部CSS
3. 外部CSS
### 多个外部 CSS 文件的优先级
后引入的CSS文件会覆盖先引入的CSS文件
```html
<link href="styles.css" rel="stylesheet" type="text/css">
<link href="theme.css" rel="stylesheet" type="text/css">
<link href="layout.css" rel="stylesheet" type="text/css">
```
- `layout.css` 优先级最高
- `theme.css` 优先级居中
- `styles.css` 优先级最低