gRPC是一个框架，允许你在服务器上定义函数，并让位于网络其他位置的客户端远程调用这些函数

其核心思想是：

- **定义一个服务（service）**
- 指定可以远程调用的方法，以及方法的参数和返回类型

在不同端的角色：
- **服务器端**：实现这些方法，并运行 gRPC 服务器来处理客户端调用
- **客户端**：拥有一个 stub（有些语言中直接叫 client），它提供与服务器相同的方法接口

gRPC 使用 **Protocol Buffers（protobuf）** 在 `.proto` 文件中定义服务方法和消息结构。然后根据这些定义自动生成客户端和服务器代码，使不同编程语言之间也能通信

>Protocol Buffers 是一种**与语言和平台无关的数据序列化机制**


## 使用 gRPC 的优势

- **快速高效**：基于 HTTP/2，实现高速通信
- **数据更紧凑**：Protocol Buffers 比 JSON 更小、更高效
- **高性能**：HTTP/2 支持多路复用流，降低延迟，提高吞吐量
- **跨语言互通**：服务定义一次，可在多种语言中实现
- **轻量通信协议**：protobuf 提供高效数据格式

## 什么时候在 Node.js 中使用 gRPC？

- 构建多个服务相互通信的系统（微服务架构）
- 构建需要高速处理大量数据的 API
- 团队中使用多种编程语言开发不同模块


## gRPC vs REST

- **gRPC**：低延迟、高吞吐，适合服务内部通信
- **REST**：更传统，基于 HTTP/1.1，使用 JSON，简单易用

虽然 REST 更普遍，但在微服务内部通信场景中，gRPC 在性能和效率方面通常更优

## 搭建 gRPC 项目

开始前，请确保已安装 Node.js 和 npm。
创建项目文件夹，并运行：
```bash
pnpm init
```

## 使用 Protocol Buffers 定义 gRPC 服务

Protocol Buffers 用于定义数据结构和服务接口。

创建文件 `helloworld.proto`：
```js
syntax = "proto3";

package helloworld;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings.
message HelloReply {
  string message = 1;
}
```

### 代码说明

- `syntax = "proto3"`：使用 protobuf 第 3 版
- `package helloworld`：命名空间，避免冲突
- `service Greeter`：定义服务
- `SayHello`：RPC 方法
- `HelloRequest` 和 `HelloReply`：消息结构
- 每个字段都有编号（如 `1`），用于二进制编码


## 实现 gRPC 服务器

创建 `server.js`：
```js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('helloworld.proto', {});
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

// Implement the SayHello RPC method.
function sayHello(call, callback) {
  callback(null, { message: 'Hello, ' + call.request.name });
}

// Start a gRPC server and listen on port 50051.
function main() {
  const server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, { sayHello: sayHello });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC server running on port 50051');
  });
}

main();
```

### 代码说明

该代码创建一个简单的 gRPC 服务器：

- 使用 proto-loader 加载 `.proto` 定义
- 实现 `sayHello` 方法
- 在 50051 端口监听
- 使用不安全连接（演示用）

服务器接收请求后返回问候语。

---

## 实现 gRPC 客户端

创建 `client.js`

```js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('helloworld.proto', {});
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  const client = new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure());

  const request = { name: 'World' };

  client.sayHello(request, function(err, response) {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Greeting:', response.message);
    }
  });
}

main();
```

### 代码说明

客户端：

- 连接 `localhost:50051`
- 发送请求 `{ name: 'World' }`
- 调用远程方法
- 打印服务器返回结果

## 测试

安装依赖：
```bash
pnpm install @grpc/grpc-js @grpc/proto-loader
```
启动服务器：
```bash
node server.js
```
另一个终端运行客户端：
```bash
node client.js
```
结果：

服务器显示运行状态  
客户端输出：
```js
Greeting: Hello, World
```
