## SSE 的基本概念

**Server-Sent Events（SSE）** 是一种 Web 技术，使服务器能够通过单个持久 HTTP 连接向客户端发送更新。它非常适合构建需要服务器主动推送数据的实时应用。

### 主要特点

✅ **单向数据流**  
数据只从服务器发送到客户端，适合实时通知类应用。

✅ **自动重连**  
连接断开后客户端会自动重新连接。

✅ **事件标识**  
可以给事件命名，让客户端监听不同类型消息。

✅ **浏览器原生支持**  
现代浏览器通过 `EventSource` 原生支持，无需第三方库。

✅ **高效率、低延迟**  
无需频繁轮询，服务器数据一产生就发送。

✅ **基于 HTTP**  
兼容现有 Web 基础设施（代理、负载均衡等）。


## SSE 的工作原理

1️⃣ 客户端向服务器发送普通 HTTP 请求，请求事件流。  
2️⃣ 服务器响应并设置：

```js
Content-Type: text/event-stream
```

表示建立 SSE 连接。

3️⃣ 服务器持续发送文本格式事件，每个事件块之间用 **两个换行符** 分隔。

---

## SSE 事件字段

一个事件块可以包含：

- `data` → 消息内容
- `id` → 事件唯一 ID（用于断线恢复）
- `event` → 自定义事件类型
- `retry` → 建议客户端重连间隔（毫秒）

---

## SSE 消息示例

```js
id: 1
event: message
data: {"sender": "john_doe", "text": "Hello, world!"}

retry: 5000
data: {"info": "This is a heartbeat message to keep the connection alive."}
```

说明：

- 第一个事件是聊天消息
- ID 为 1
- 第二部分设置重连时间为 5 秒
- 并发送心跳消息维持连接

---

## SSE 与轮询的区别

SSE 是 **持续连接**：

- 建立一次连接
- 持续接收数据

而轮询：

- 客户端反复发请求
- 服务器被动响应

---

## 连接断开时

客户端会自动重连：

- 使用 `retry` 指定时间
- 没指定则用默认时间

---

# 使用 Node.js 搭建 SSE 服务器

示例：服务器每 5 秒发送当前时间。

### server.js

```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/events') {

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    const intervalId = setInterval(() => {
      const date = new Date();
      const timeString = date.toLocaleTimeString('en-US', { hour12: true });
      res.write(`retry: 5000\ndata: ${timeString}\n\n`);
    }, 5000);

    req.on('close', () => {
      clearInterval(intervalId);
    });

  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log('SSE server started on port 3000');
});
```

### 代码说明

- 创建 HTTP 服务器
- `/events` 路径建立 SSE
- 设置必要头信息
- 每 5 秒发送时间
- 客户端断开 → 停止发送
- 其他路径返回 404

---

# 构建 SSE 客户端

客户端使用浏览器 `EventSource` API。

### index.html

```html
<script>
const eventSource = new EventSource("http://localhost:3000/events");

eventSource.onmessage = function(event) {
  console.log(event.data);
};

eventSource.onerror = function(error) {
  console.error("EventSource failed:", error);
};
</script>
```

---

### 客户端工作流程

1️⃣ 页面加载  
2️⃣ 创建 EventSource  
3️⃣ 监听服务器消息  
4️⃣ 更新页面  
5️⃣ 自动重连

---

# 运行应用

启动服务器：

```bash
node server.js
```

浏览器打开页面即可看到：

- 每 5 秒更新时间
- 持续实时更新

---

# SSE 实现挑战

⚠ 浏览器连接数限制  
⚠ 持久连接带来的扩展性问题  
⚠ 代理 / 防火墙断开连接  
⚠ 重连逻辑处理  
⚠ 安全（HTTPS + 权限控制）

---

# SSE 应用场景

✔ 实时通知  
✔ 新闻 / 股票 / 比分  
✔ 实时监控仪表盘  
✔ 在线游戏状态更新  
✔ 位置追踪  
✔ IoT 设备状态