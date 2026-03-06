## 为什么需要 worker threads？

需要 worker threads 的主要原因是：**Node.js 默认是单线程的**。

worker threads 可以创建多个线程并行执行任务。你可能会问：那它和异步操作有什么区别？

- **Worker threads**
    
    - 创建真正的操作系统线程
    - 可以真正并行执行任务
    - 占用更多系统资源
    - 适合计算密集型任务
- **异步操作**
    
    - 仍然运行在同一个 Node.js 主线程中
    - 资源开销小
    - 不适合复杂计算
    - 更适合 I/O 操作

需要注意：Node.js 本身采用 **非阻塞 I/O 模型**，所以 I/O 操作默认就是异步的。

---

## 创建一个 worker thread

要使用 worker threads 模块，首先需要导入：

```js
import { Worker } from 'node:worker_threads'
```

Worker 类允许你创建新的线程，并在其中执行 JavaScript 代码。

完整示例：

```js
import { Worker, workerData, parentPort, isMainThread } from 'node:worker_threads'

if (isMainThread) {
  const worker = new Worker(__filename, {
    workerData: { message: "Hello from the main thread!" }
  });

  worker.on('message', (message) => {
    console.log(`Main thread received a message from the worker: ${message}`);
  });

  worker.postMessage("Hello from the main thread!");
} else {
  parentPort.on('message', (message) => {
    console.log(`Worker received a message from the main thread: ${message}`);

    parentPort.postMessage("Hello from the worker thread!");
  });

  console.log(`Worker data: ${workerData.message}`);
}
```
### 关键概念说明

- **workerData**  
    创建 worker 时传入的数据对象。
- **parentPort**  
    用于 worker 与主线程之间通信的对象。
- **isMainThread**  
    判断当前代码是在主线程还是 worker 线程中执行。

### 执行流程

1. 主线程创建 worker，并让它执行同一个脚本文件
2. 主线程通过 `workerData` 传入初始数据
3. 主线程监听 worker 的消息，并发送消息给 worker
4. worker 线程：
    
    - 接收主线程消息
    - 读取传入数据
    - 向主线程发送回复

---

## 什么时候使用 worker threads？

### 1️⃣ 后台计算

耗时较长的计算任务可以放入 worker，避免阻塞主线程。

### 2️⃣ 密集网络处理

大量网络请求可以交给 worker 处理，让主线程保持响应能力。

### 3️⃣ 实时数据处理

例如：

- 音频流
- 视频流
- 传感器数据

---

## 实时数据处理示例（视频流）

```js
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const path = require('path');
const { createServer } = require('http');
const { Readable } = require('stream');

const videoFilePath = path.join(__dirname, 'sample.mp4');

if (isMainThread) {
  const videoStream = fs.createReadStream(videoFilePath);

  const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'video/mp4');
    videoStream.pipe(res);
  });

  server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
} else {
  const videoStream = fs.createReadStream(workerData.videoPath);

  videoStream.on('data', (frameData) => {
    parentPort.postMessage({ frameData });
  });
}
```

### 代码逻辑

- 主线程：
    
    - 创建 HTTP 服务器
    - 向客户端提供视频流
- worker 线程：
    
    - 读取视频帧
    - 处理数据
    - 将结果发送回主线程

这是一个简化示例，重点是理解 worker 的处理流程。

---

## worker threads 的缺点

虽然功能强大，但也存在一些问题：

❗ 每个线程都会消耗系统资源  
❗ 线程过多会占用大量内存  
❗ 不适用于所有任务

尤其是：

- 频繁 DOM 交互
- 复杂事件同步

这些场景不适合 worker threads。