
**一个函数在等待某个结果，当它收到结果后再执行相应的操作**。它的行为取决于结果是成功还是失败。下面我们来更深入地看看它是如何工作的，并通过具体示例进行说明。

---

## Promise 语法

先来看 Promise 的基本语法结构：

```JS
let promise = new Promise(function(resolve, reject) {  
// code to be executed 
});
```

### 代码说明

在 `new Promise` 中，有一个函数被称为 **executor（执行器）**，它会在 Promise 创建时**立即执行**。你不会立刻知道结果：代码只表明你**稍后**会得到一个值。

Promise 最大的优点在于：**程序可以在等待结果的同时继续运行**。一旦执行的函数完成，你就能看到结果。

举个例子：作为用户，你可以在头像还没加载完成时就看到整个网站并进行交互，而不是在浏览器加载个人头像的 30 秒内盯着一个空白页面。等头像加载完成后，它就会显示在该出现的位置。

---

## resolve 和 reject

执行器函数有两个参数：`resolve` 和 `reject`。它们是预定义的函数，用来表示 Promise 的执行结果：

- `resolve(value)`：表示执行成功，并返回结果值
- `reject(error)`：表示执行失败，并返回一个错误对象

> 注意：执行器**只能调用一次** `resolve` 或 `reject`，不能同时调用二者。

---

## 示例

回到你假想的程序员工作场景，下面是一个对应的 Promise 示例：

```js
const myFriendHasApprovedMyPosition = true;

let promise = new Promise(function(resolve, reject) {
  if (myFriendHasApprovedMyPosition){
    resolve("Hooray! Now I'm a true programmer!");
  } else {
    reject(new Error("Whoops! Have to study more =("));
 }
});
```
### 代码说明

在这个例子中，我们根据常量 `myFriendHasApprovedMyPosition` 的值来决定 Promise 的结果：

- 如果值为 `true`，调用 `resolve`，并传入 `"Hooray! Now I'm a true programmer!"`
- 如果值为 `false`，调用 `reject`，并传入一个包含错误信息的 `Error` 对象
    

由于该值为 `true`，所以最终会执行 `resolve`。

在这个示例中，`resolve` 被立即调用，因为结果是已知的。但在实际开发中，Promise 更多用于**需要一定时间才能完成的操作**。

---

## 使用 setTimeout 的示例

```js
let promise = new Promise(function(resolve, reject) {   
	setTimeout(() => resolve("I have completed"), 5000); 
});
```

### 代码说明

在这种情况下，浏览器会立刻执行 Promise 的执行器函数，但 `resolve` 会在 **5 秒后**才被调用。

这在从远程服务器加载数据等场景中非常有用。

---

## Promise 的状态（states）

Promise 是一个包含状态（state）的对象，在任意时刻，它只能处于以下三种状态之一：

- **pending（进行中）**：初始状态，Promise 已创建但尚未完成
- **fulfilled（已完成）**：Promise 成功完成，调用了 `resolve`
- **rejected（已失败）**：Promise 执行失败，调用了 `reject`

### 状态变化说明

最开始，Promise 处于 **pending** 状态：
- 如果成功，调用 `resolve(value)`，状态变为 **fulfilled**
- 如果失败，调用 `reject(error)`，状态变为 **rejected**

Promise 的状态**只能改变一次**，一旦确定就无法再更改。
