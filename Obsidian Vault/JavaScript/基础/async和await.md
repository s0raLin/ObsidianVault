async/await 是建立在 Promise 之上的一种更简洁的语法，使异步执行更加高效、直观


`async` 和 `await` 关键字可以用来创建**异步函数**，这些函数**始终返回一个 Promise**，而无需显式地编写 Promise 链。使用 async/await，你可以编写看起来和行为都类似于同步代码的异步代码，从而更容易理解。

`await` 关键字会**暂停当前代码行的执行**，直到 async 函数返回的 Promise 被解析（resolve），这使代码结构更加清晰、有序。

## async 函数
使用`async function`。表明该函数是异步的，一定会返回Promise

```js
async function myFunc() {
  return "Hello, Async!";
}

console.log(myFunc()); // Promise { 'Hello, Async!' }
```


```js
async function myFunc() {
  return "Hello, Async!";
}

myFunc()
  .then((response) => console.log(response))
  .catch((error) => console.log(error));

// Hello, Async!
```

## await 运算符
当 `async` 函数与 `await` 运算符结合使用时，其优势才会真正体现出来。与使用 `promise.then()` 处理 Promise 结果不同，我们可以使用 `await` 来简化流程。  
`await` 关键字**必须在 async 函数内部使用**，并且放在返回 Promise 的表达式之前。例如：
```js
async function myFunc() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
}
```
**代码说明**  
在这个示例中，`myFunc()` 是一个 async 函数，它从 API 中获取数据。`await` 关键字确保函数会等待响应返回，并在数据解析完成后再继续执行后续代码。

## 使用 try/catch 进行错误处理

```js
async function findUser(username) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${username}`
    );
    const user = await response.json();
    console.log(user);
  } catch (error) {
    console.log(`Failed to fetch user: ${error.message}`);
  }
}
```
**代码说明**  
在这个示例中，`findUser` 函数包含一个 `try/catch` 代码块。如果在执行过程中发生错误，`catch` 块会捕获该错误并输出错误信息；如果没有错误发生，则 `try` 块中的代码会正常执行并返回期望的结果。