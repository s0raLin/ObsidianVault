## 什么是JSX
JSX是React的核心组成部分。它可以让你把HTML和JavaScript写在一起。JSX 看起来像 HTML，但它既不是 HTML，也不是字符串。它是 JavaScript 的一种 **类 HTML 语法扩展**，允许你在 JavaScript 中直接编写 HTML。来看下面这个变量声明：
```js
const element = <h1 className="title">Introduction to JSX</h1>;
```

**解释代码**

这个例子展示了如何在 React 中编写 JSX。不过，浏览器本身并不认识这种语法。在底层，JSX 会被编译成 `React.createElement()` 调用，而它会返回 React 元素。所以，上面的例子等价于：

```js
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Introduction to JSX'
);
```

JSX 还可以防止 **跨站脚本攻击（XSS）**。任何插入到 JSX 中的值在渲染之前都会被转换成字符串，这意味着只有你自己应用中编写的代码才会被执行，从而提高了安全性。


## 如何编写JSX
### 在 JSX 中可以使用花括号 `{}` 包裹任意合法的 JavaScript 表达式
```js
const user = {
  firstName: 'John',
  lastName: 'Smith'
};

function getUserName(user) {
  return user.firstName + ' ' + user.lastName;
}

const element = <p>{ getUserName(user) }</p>;
```

### JSX 属性使用驼峰命名法（camelCase）

```js
const buttonElement = (
  <button
    type="button"
    onClick={() => alert('Confirmed')}
  >
    Confirm
  </button>
);
```
> 注意，这里的 `onClick` 对应的是 HTML 中的 `onclick` 属性。

### JSX要求标签必须显式关闭
在 HTML 中，有些标签可以省略闭合标签，比如：

```html
<input type="text">
```

但在 JSX 中，你必须写成：

```js
const element = <input type="text" />;
```

### JSX 必须有且只有一个顶层标签

下面的 JSX 是错误的，因为它包含两个并列的顶层 `h1` 标签：
```js
const element = (
  <h1>Title 1</h1>
  <h1>Title 2</h1>
);
```
可以通过用一个 `div` 把它们包起来来修正：
```js
const element = (
  <div>
    <h1>Title 1</h1>
    <h1>Title 2</h1>
  </div>
);
```

## 文件扩展名

如前所述，使用 JSX 语法编写的代码不能直接在浏览器中运行，因此不能直接写在 `<script>` 标签里。

在 React 中，我们通常使用 `.jsx` 文件来编写组件，以表明文件中包含 JSX 语法。这并不是强制的，你也可以使用 `.js` 文件来写组件，但 `.jsx` 扩展名能让代码结构更加清晰。