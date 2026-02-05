## XMLHttpRequest 介绍

**XMLHttpRequest** 是用于与服务器交互的对象。它可以在**不刷新整个网页**的情况下，从指定的 URL 获取数据，使网页只更新其中的一部分，而不会打断用户的操作。

**AJAX 编程高度依赖 XMLHttpRequest**。尽管名字里包含 XML，但 **XMLHttpRequest 不仅能获取 XML 数据，还可以获取任意类型的数据**。

`XMLHttpRequest()` 构造函数用于创建一个新的 XMLHttpRequest 对象。在使用任何方法之前，**必须先调用这个构造函数**。

---

## XMLHttpRequest 属性

下面是常用的 XMLHttpRequest 属性及其说明：

- **XMLHttpRequest.readyState**  
    返回 XMLHttpRequest 客户端当前所处的状态。
- **XMLHttpRequest.response**  
    返回响应体内容，其类型取决于请求的 `responseType` 属性。
- **XMLHttpRequest.responseText**  
    返回服务器响应的文本数据。
- **XMLHttpRequest.responseType**  
    一个字符串，用于指定响应数据的类型。
- **XMLHttpRequest.responseURL**  
    返回响应的 URL，如果 URL 为 null，则返回空字符串。
- **XMLHttpRequest.responseXML**  
    返回一个包含请求得到的 HTML 或 XML 数据的文档对象。
- **XMLHttpRequest.status**  
    返回 HTTP 响应状态码（数值形式）。

---

## XMLHttpRequest 方法

下面是一些常用的 XMLHttpRequest 方法及其作用：

- **XMLHttpRequest.abort()**  
    如果请求已经发送，用于中止该请求。
- **XMLHttpRequest.open()**  
    初始化一个新请求，或重新初始化一个已有请求。
- **XMLHttpRequest.send()**  
    发送请求。对于异步请求，该方法会在请求发送后立即返回。
- **XMLHttpRequest.getAllResponseHeaders()**  
    以字符串形式返回所有响应头；如果还没有响应，则返回 null。
- **XMLHttpRequest.getResponseHeader()**  
    返回指定响应头的值。
- **XMLHttpRequest.setRequestHeader()**  
    设置 HTTP 请求头的值。必须在 `open()` 之后、`send()` 之前调用。
- **XMLHttpRequest.overrideMimeType()**  
    覆盖服务器返回的 MIME 类型。

---

## XMLHttpRequest 事件

在查看示例之前，先来看看 XMLHttpRequest 支持的事件：

- **abort** —— 请求被中止
- **error** —— 请求发生错误
- **load** —— 请求成功完成
- **loadend** —— 请求结束（无论成功还是失败）
- **loadstart** —— 请求开始加载数据
- **progress** —— 请求过程中周期性触发
- **readystatechange** —— `readyState` 属性发生变化
- **timeout** —— 请求超时

---

## XMLHttpRequest 的使用

在这一部分，你将学习如何使用 XMLHttpRequest 在网页和服务器之间进行数据交互。

首先，你需要创建一个 XMLHttpRequest 对象，然后打开一个 URL，最后发送请求。

使用 XMLHttpRequest 对象，你可以：

- 在不刷新网页的情况下从 URL 获取数据；
    
- 在页面加载完成后向服务器请求并接收数据；
    
- 在后台向服务器发送数据。
    

当请求完成后，XMLHttpRequest 对象会包含一些重要信息，例如**响应体**和**HTTP 状态码**。

下面我们逐行分析一个示例。

---

### 第一步：创建回调函数

首先，创建一个 `requestListener` 函数，用于输出服务器返回的文本数据：

```js
function requestListener () {   
	console.log(this.responseText); 
}
```

**解释：**  
当请求成功完成时，该函数会被调用，`this.responseText` 表示服务器返回的文本内容。

---

### 第二步：创建 XMLHttpRequest 对象

`const request = new XMLHttpRequest();`

**解释：**  
使用 `XMLHttpRequest()` 构造函数创建一个新的请求对象，并将其存储在 `request` 变量中。

---

### 第三步：监听请求完成事件

`request.addEventListener("load", requestListener);`

**解释：**  
`addEventListener()` 用于注册事件监听器。  
当请求成功完成并触发 `load` 事件时，`requestListener` 函数会被调用。

---

### 第四步：初始化请求

`request.open("GET", "https://api.github.com/users/alabak48");`

**解释：**  
`open()` 方法初始化请求：

- `"GET"` 表示请求方式
    
- 第二个参数是请求的 URL
    

---

### 第五步：发送请求

`request.send();`

**解释：**  
`send()` 方法将请求发送到服务器。

---

## 完整示例代码

下面是完整的 HTML 示例代码，其中请求是通过点击按钮触发的：


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Using the XMLHttpRequest Object</h2>

<div id="demo">
<button type="button" onclick="requestListener()">Change Content</button>
</div>

<script>
function requestListener () {
  console.log(this.responseText);
}

const request = new XMLHttpRequest();
request.addEventListener("load", requestListener);
request.open("GET", "https://api.github.com/users/alabak48");
request.send();
</script>
</body>
</html>
```

**解释：**  
点击按钮后，请求 GitHub API，并在控制台输出该用户的公开信息。

---

## 示例输出

该示例使用了以下 API 地址：
`https://api.github.com/users/alabak48`
如果你有 GitHub 账号，可以将 `alabak48` 替换成你自己的用户名。

返回的数据是该 GitHub 用户的公开信息，例如：

```json
{
  "login": "alabak48",
  "id": 79693733,
  "avatar_url": "https://avatars.githubusercontent.com/u/79693733?v=4",
  "html_url": "https://github.com/alabak48",
  "public_repos": 8,
  "followers": 4,
  "following": 5,
  "created_at": "2021-02-26T09:35:38Z"
}
```

---


