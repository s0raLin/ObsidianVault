处理**已定状态（settled）Promise** 的方法：**`.then`、`.catch` 和 `.finally`**。

## `.then`
`.then` 方法用于处理 **Promise 成功（resolve）或失败（reject）** 的结果。

来看一个例子：  
假设我们正在开发一个程序，帮助忙碌的学生记录考试日期。我们创建一个 Promise，根据当前日期判断学生是否错过了考试：

- 如果考试还没开始，Promise 被 **resolve**，返回 `"You should prepare for the exam"`；
    
- 如果考试已经结束，Promise 被 **reject**，返回错误信息 `"Oops! You have missed your exam!"`。

```js
const examDate = new Date(2020, 7, 5);
const promise = new Promise(function(resolve, reject) {
  const currentDate = new Date();
  if (currentDate < examDate) {
    resolve("You should prepare for the exam");
  } else {
    reject("Oops! You have missed your exam!");
  }
});
```
**代码解释**  
这个 Promise 会根据当前时间与考试时间的比较结果，决定是成功还是失败。


现在，我们希望：

- **成功时**：在控制台输出提示信息；
- **失败时**：弹出错误信息。
    

为此，我们使用 `.then`，并传入两个参数：

- 第一个函数：处理成功结果；
- 第二个函数：处理失败结果。

```js
promise.then(
  function successStatus(response) {
    console.log(response);
    return response;
  },
  function failStatus(error) {
    console.log(error);
    return error;
  }
);
```
**代码解释**

- 如果 Promise 被 resolve，则调用 `successStatus`；
- 如果 Promise 被 reject，则调用 `failStatus`；
- `.then` 的两个参数都是**可选的**。

## `.catch`

如果我们**只想处理错误**，可以使用：
- `.then(null, function(error) { ... })`
- 或者更推荐的 `.catch`
    

示例如下：
```js
promise.catch(function failStatus(error) {
  console.log(error);
  return error;
});
```

**代码解释**  
`.catch` 方法用于定义 Promise 失败时的处理逻辑。在这里，我们只是将错误信息输出到控制台。


## `.then` 和 `.catch` 可以组合使用：

```js
promise
  .then(function successStatus(response) {
    console.log(response);
    return response;
  })
  .catch(function failStatus(error) {
    console.log(error);
    return error;
  });
```

**代码解释**
- `.then` 只处理成功； 
- `.catch` 统一处理失败。

## `.finally`

`.finally` 方法用于在 **Promise 状态确定之后** 执行某个函数，**无论成功还是失败**。

语法如下：
```js
promise
  .then(function successStatus(response) {
    console.log(response);
    return response;
  })
  .catch(function failStatus(error) {
    console.log(error);
    return error;
  })
  .finally(function stopLoader() {    
    console.log("The loader has stopped");
  });
```

**代码解释**

- `"The loader has stopped"` 会在 Promise **结束后一定执行**；
- 不管 Promise 是 resolve 还是 reject，`.finally` 都会运行；
- 适合用来做一些**与结果无关的操作**，例如：
    - 关闭加载动画（loader）
    - 显示默认提示信息


## Promise 链式调用（Promise chaining）

假设你有多个脚本，它们之间存在依赖关系，需要**按顺序加载**：

1. 加载用户角色；
2. 加载用户信息；
3. 根据用户偏好加载个性化横幅。

这时，Promise 链式调用就非常有用：
```js
loadData("https://mywebsite.com/loadRoles")
  .then(function() {
    return loadData("https://mywebsite.com/loadUserInfo");
  })
  .then(function(user) {
    return loadData(`https://mywebsite.com/loadBanner_${user.id}`);
  })
  .catch(function(error) {
    console.log("Oops! An error occured!")
  });
```

**代码解释**

- 每一个 `.then` 都在前一个 Promise 成功后执行；
- 任意一步出错，都会直接进入 `.catch`；
- **要实现异步链式调用，必须在每一步 `return` 一个 Promise**。

