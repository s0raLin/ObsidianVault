一些任务需要服务器持续发送后续请求，以便用户看到最新的界面状态。但客户端不需要提供任何反馈，而且我们只需要传输文本数据。例如：新闻推送、消息提醒或汇率图表等。由于客户端不需要发送反馈，使用 WebSocket 可能就显得多余。在这些情况下，**服务器发送事件（Server-Sent Events，SSE）** 被认为是一种良好的实践。

## 服务器发送连接

**服务器发送事件（SSE）** 是一种允许服务器持续向客户端发送消息的技术。它是**单向的**，也就是说数据只能从服务器发送到客户端。如果需要客户端反馈，或者要发送非文本数据，就不能使用 SSE

SSE 基于 **EventSource API**。这是一个客户端 JavaScript API，允许开发者通过持久的 HTTP 连接接收服务器发送的事件

服务器发送连接由 **EventSource 对象** 控制。一旦创建 EventSource 对象，就会立即发起 SSE 连接
```js
const eventSource = new EventSource("your-url");
```
和 WebSocket 一样，SSE 也需要先建立与服务器的连接。但不同的是，SSE 使用 **HTTP 协议** 建立连接。URL 形式没有特殊要求，只要能连接到服务器即可

## withCredentials 属性

`withCredentials` 参数表示在建立连接时是否携带凭证。这样服务器就可以使用 cookie 或请求头来验证请求，从而允许访问受保护的资源

```js
const eventSource = new EventSource("your-url", {
  withCredentials: true,
});
```

## readyState 属性

和 WebSocket 类似，SSE 也有 `readyState` 属性，表示连接状态：

- 0 —— **CONNECTING**：连接尚未建立
- 1 —— **OPEN**：可以进行数据交换
- 2 —— **CLOSED**：连接已关闭
```js
if (eventSource.readyState === 0) {
  console.log('Connecting...');
}
```

## 使用 SSE 传输数据

SSE 有多个相关事件。

当连接建立成功时，会触发 `onopen` 事件：
```js
eventSource.onopen = (e) => {
  console.log("The connection has been established.");
};
```
当接收到服务器数据时，可以通过 `onmessage` 监听：
```js
eventSource.onmessage = (e) => {
  console.log("Message", message.data);
};
```
服务器发送的消息是 **MessageEvent 对象**，包含连接和消息的各种元数据，以及消息本身。

通常我们只关心 `message.data`，但有时其他信息也很有用：

- **type** —— 事件类型，如 `"message"`、`"error"`、`"open"`
- **retry** —— 建议的重连时间（毫秒），客户端不能设置
- **lastEventId** —— 客户端接收到的最后一个事件 ID

服务器发送数据的格式是 `text/event-stream`，数据格式通常为：
```js
data: 示例文本
```
正因为这种格式，SSE **只能发送简单文本数据**。

---

## 关闭连接

可以手动关闭 SSE 连接：
```js
eventSource.close();
```
接收到的消息是 MessageEvent 对象，但大多数情况下我们只使用 `message.data`。  
这些数据可以进一步处理并显示在页面上。

---

## 错误处理

通用错误处理通过 `onerror` 方法实现：
```js
eventSource.onerror = (error) => {
  console.log("Error", error.data);
};
```
虽然大多数浏览器都支持 SSE，但并非全部支持。如果用户浏览器版本较旧（例如 2015 年前），最好进行额外检测：
```js
if (typeof EventSource !== "undefined") {
  // 建立连接
} else {
  alert("Sorry, your browser does not support server-sent events");
}
```
