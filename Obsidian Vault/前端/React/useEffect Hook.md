有时你需要和外界打交道，比如:
* API请求
* 定时器和计时器(WebAPI的一部分)
* 事件监听
* 非React库
* 以及其他类似操作
这些操作被称为**副作用(side effects)**

在函数组件中处理副作用时，你需要使用useEffect Hook。它取代了类组件中常用的:
* `componentDidMount()`
* `componentDidUpdate()`
* `componentWillUnmount()`

## 什么是useEffect
首先澄清什么是副作用
想象一位程序员的主要工作是写代码，但是他会：
* 参加每日会议
* 与设计师讨论设计问题
* 接听电话
* 在沟通软件中回答问题

这些额外的操作就是副作用，因为他们并不是直接写代码本身

React的核心目标是把UI渲染到屏幕上，但它同样需要在不干扰渲染流程的前提下处理各种外部任务

useEffect会在组件软件“旁边”执行，但并不直接参与UI的渲染


## useEffect的三大应用场景
### 网络请求
* 从API获取数据
* 向服务器发送数据
* 订阅实时服务

### 定时器和计时器
* `setTimeout`
* `setInterval`
这些都是浏览器提供的WebAPI,不属于React组件


### DOM操作
虽然React会生成DOM,但直接操作DOM仍然会被认为是“外部操作”，因为React更提倡声明式渲染

## 获取数据

在前端开发中**useEffect**通常是用来处理API的

假设我们正在为一个 **猫咪收容所** 开发网站。后台 API 中存储着猫咪的照片，我们需要请求数据并显示出来

```js
import React, { useEffect, useState } from 'react';

function Cats() {
   const [cats, setCats] = useState([]);

   const fetchCats = async () => {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
      const data = await response.json();
      setCats(data);
   };

   useEffect(() => {
      fetchCats();
   }, []);

   return (
      <div>
         {cats &&
            cats.map((cat) => (
               <img src={cat.url} key={cat.id} width="300px" height="300px" />
            ))}
      </div>
   );
}

export default Cats;
```
### 代码讲解

- 使用 `useState` 初始化 `cats`，初始值是一个空数组
- `fetchCats` 调用 API 并把数据存入 state

重点在于 **useEffect**：

```js
useEffect(() => {
	fetchCats();
}, []);
```
* 第一个参数是**副作用回调函数**
* 第二个参数是**依赖数组(dependency array)**
这里依赖数组是空的，表示:
> 只在组件首次渲染完成后执行一次

## 再次请求新数据
如果用户不喜欢当前10张猫图片，我们可以给它添加一个按钮，用于请求新的一组图片
```js
const [isNew, setIsNew] = useState(false);

const getNewCats = () => {
	setIsNew(!isNew);
};

useEffect(() => {
	fetchCats();
}, [isNew]);
```

按钮
```jsx
<button type="button" onClick={getNewCats}>
New cats
</button>
```

### 解释
- 点击按钮会切换 `isNew`
- `isNew` 改变 → useEffect 重新执行
- 再次请求 API

### 如果不写依赖数组会怎样？

```jsx
useEffect(() => {
	fetchCats();
});
```

这意味着：
> **每一次组件渲染后都会执行副作用**

⚠️ 这可能会引发严重的性能问题，甚至死循环。


### 为什么不能直接在组件里调用 API？

如果你在组件体内直接调用 `fetchCats()`：

- 请求 API
- 更新 state
- 触发重新渲染
- 再次调用 API
- ……

最终会导致 **无限循环，页面卡死**

**useEffect 的存在正是为了控制副作用的执行时机**


## 定时器与计时器（Timers & Intervals）

`setTimeout` 和 `setInterval` 属于 BOM（浏览器对象模型），因此也被视为“外部世界”。

---

### setTimeout 示例

3 秒后显示一条订阅提示：

```jsx
import React, { useEffect, useState } from 'react';

function Message() {
   const [message, setMessage] = useState('');

   useEffect(() => {
      const timerId = setTimeout(() => {
         setMessage('Stay tuned and subscribe to the newsletter!');
      }, 3000);

      return () => clearTimeout(timerId);
   }, []);

   return (
     <div>
       {message ? message : 'Message will appear in 3 seconds...'}
     </div>
   );
}

export default Message;
```

### 清理函数（cleanup）

```jsx
return () => clearTimeout(timerId);
```

- 组件卸载时执行
- 防止内存泄漏
- 防止组件卸载后仍然尝试更新 state

---

### setInterval 示例（倒计时）

```jsx
import React, { useEffect, useState } from 'react';

function Message() {
   const [timer, setTimer] = useState(5);

   useEffect(() => {
      if (timer === 0) return;

      const timerId = setInterval(() => {
         setTimer(timer - 1);
      }, 1000);

      return () => clearInterval(timerId);
   }, [timer]);

   return (
     <div>
       <h1>Time left: {timer}</h1>
       <button disabled={timer === 0}>
         Submit answer
       </button>
     </div>
   );
}

export default Message;
```

---

## DOM 操作（DOM Manipulation）

React 更推荐通过 state 和 props 控制 UI，但在某些场景下，直接操作 DOM 是合理的：

- 使用非 React 库
- 控制焦点
- 操作 `document` / `window`
- 添加或移除全局事件监听

---

### 修改页面标题

```jsx
useEffect(() => {
  document.title = 'Love and Peace!';
}, []);
```

---

### 输入框自动聚焦

```jsx
import React, { useEffect } from 'react';

function AutoFocusInput() {
   useEffect(() => {
      const input = document.querySelector('.input');
      input.focus();
   }, []);

   return <input type="text" className="input" />;
}

export default AutoFocusInput;
```

---

### 禁止页面滚动（如模态框）

```jsx
import React, { useEffect } from 'react';

function NoScrollBody() {
   useEffect(() => {
      document.body.classList.add('no-scroll');

      return () => {
         document.body.classList.remove('no-scroll');
      };
   }, []);

   return <div>Modal is open! No scrolling!</div>;
}

export default NoScrollBody;
```