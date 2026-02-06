**Fetch API** 是一个接口，客户端可以通过它与服务器进行交互：向服务器发送 HTTP 请求并接收服务器返回的响应。  
Fetch API 的一个重要特点是它**支持异步请求**，这意味着：在等待服务器返回数据的同时，其余的 JavaScript 代码仍然可以继续执行。

---

## fetch 方法

大约十年前，Web 开发者主要使用 **XMLHttpRequest** 来实现客户端与服务器之间的数据交换，但它并不完美。后来，它被功能相似但更现代的 **Fetch API** 所取代。

Fetch API 的代码更加简洁、清晰，因为它基于 **Promise 对象**。因此，我们可以使用 Promise 提供的便捷异步处理语法。

在所有现代浏览器中，都内置了一个 `fetch()` 方法。通过它，你既可以**发送请求**，也可以**接收服务器返回的数据**。

---

## 使用 fetch() 的基本流程

以发送一个 **GET 请求**（默认请求方式）为例，使用 fetch() 的基本步骤如下：

1. **调用 `fetch()`**，并传入要获取内容的 URL。
2. **处理响应对象**，通常调用 `.json()` 方法（因为服务器通常返回 JSON 数据）。  
    注意：`.json()` 方法本身也会返回一个 Promise。
3. **使用 Promise 的 `.then/.catch` 或 `async/await` 语法** 来处理最终数据或错误。
    

下面两段代码功能完全相同，只是使用了不同的语法。

### 示例一：then / catch 写法

```js
const test = fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.log(error));
```
### 示例二：async / await 写法

```js
async function fetchFunction() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
```

### 代码说明

最终，我们会在控制台中打印出服务器返回的数据；如果请求失败，则会在控制台中打印错误信息。

---

## 发送请求

使用 `fetch()` 方法可以发送多种 HTTP 请求，例如：**GET、POST、PUT、PATCH** 等。  
这里我们先关注最基本的 **GET 请求**。
- `fetch()` 的**第一个参数**是请求的 URL
- **第二个参数**是一个配置对象（options）

常用的配置项包括：
- `method`：请求方法
- `headers`：HTTP 请求头
- `body`：请求体（通常用于 POST、PUT 请求）
- 以及其他配置项

---

## 查询参数（Query Params）

有时我们需要对数据进行**过滤、排序**，或只获取一部分数据。这时可以通过 **URL 查询参数** 来实现。

写法是在 URL 后加上 `?`，然后使用 `name=value` 形式，多个参数用 `&` 连接：

```js
fetch("https://jsonplaceholder.typicode.com/users?_limit=10&page=3");
```

### 使用 URL 对象添加参数

也可以使用内置的 `URL` 对象来构建带参数的地址：

```js
const url = new URL("https://jsonplaceholder.typicode.com/users");
url.searchParams.set("_limit", "10");
url.searchParams.set("page", "3");

fetch(url);
```

⚠️ 注意：查询参数的名称以及它们的具体作用，**完全由服务器端决定**，不同接口可能不同。

---

## 请求头（Request Headers）

在某些情况下，我们需要在请求中携带请求头，例如进行身份认证时，通常会使用 **Authorization token**。

可以使用内置的 `Headers` 对象来设置请求头：

```js
const authHeaders = new Headers();
authHeaders.set("Authorization", "ea135929105c4f29a0f5117d2960926f");

fetch("https://jsonplaceholder.typicode.com/users", {
  headers: authHeaders
});
```

也可以直接在 options 中使用普通对象：

```js
fetch("https://jsonplaceholder.typicode.com/users", {
  headers: {
    "Authorization": "ea135929105c4f29a0f5117d2960926f"
  }
});
```

---

## 请求方法与请求体

如果要使用默认 GET 以外的请求方法，需要在 options 中指定 `method`：

```js
method: "POST"
```

像 **POST、PUT** 这样的请求通常需要携带请求体，用来向服务器发送数据（例如新增数据、修改数据、用户登录等）。

通常，服务器接收的是字符串形式的数据，因此需要使用 `JSON.stringify()` 将对象转换为字符串。

```js
const requestBody = {
  name: "John",
  age: "16"
};

fetch("https://jsonplaceholder.typicode.com/users", {
  method: "POST",
  body: JSON.stringify(requestBody)
});
```

---

## 处理响应（Response）

`fetch()` 返回的是一个 Promise，其解析后得到的 **Response 对象**包含以下常见属性：

1. `status` —— HTTP 状态码
2. `statusText` —— 状态码说明
3. `ok` —— 是否成功（布尔值）
4. `headers` —— 响应头
5. `url` —— 请求的 URL
6. `body` —— 响应体（ReadableStream 格式，不能直接使用）
7. `bodyUsed` —— 是否已读取响应体

以及一些不常用的属性。

---

## 解析响应数据

服务器返回的 `body` 是 **ReadableStream**，不能直接使用。  
必须先调用 `text()`、`json()` 等方法将其转换成可用的数据格式。

最常用的是：

```js
response.json()
```

---

## 错误处理

### 使用 then / catch

```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((e) => console.log(e.message));
```

### 使用 async / await + try / catch

```js
async function fetchFunction() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.log(e.message);
  }
}
```

---

## 手动处理 HTTP 状态错误

需要注意的是：  
**fetch 只有在网络错误或请求未发送成功时才会抛出异常**。  
如果服务器返回了 404、500 这样的状态码，fetch 并不会自动报错。

如果我们只接受 **200–209** 的成功状态，可以手动抛出错误：

### then / catch 示例

```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    if (response.status >= 200 && response.status <= 209) {
      return response.json();
    } else {
      throw new Error("Incorrect server response");
    }
  })
  .then((json) => console.log(json))
  .catch((error) => console.log(error.message));
```

### async / await 示例

```js
async function fetchFunction() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (response.status >= 200 && response.status <= 209) {
      const data = await response.json();
      console.log(data);
    } else {
      throw new Error("Incorrect server response");
    }
  } catch (error) {
    console.log(error);
  }
}
```
