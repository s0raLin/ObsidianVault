* Express.js是一个轻量、快速、且不强制规范的Node.js Web框架。
* Express.js是MEAN技术栈(MongoDB， Express.js、 Angular.js、Node.js)的一部分
* Express.js 在 Node.js 之上提供了一层抽象，简化了复杂的服务器端开发任务


## 中间件（Middleware）

中间件函数可以访问：
- 请求对象 `req`
- 响应对象 `res`
- 下一个中间件 `next` 
它可以：
- 执行代码
- 修改请求或响应
- 结束请求
- 传递控制权

### 示例
```js
const express = require('express');
const app = express();

// 中间件函数
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000);
```
代码解释：

- 导入 Express
- 创建应用实例
- 定义日志中间件（记录请求时间和路径）
- 使用 `app.use()` 注册中间件
- 访问 `/` 返回文本
- 启动服务器

## 路由（Routing）

路由就是服务器响应的 URL 路径

示例:
```js
app.get('/')
app.post('/users')
app.put('/users/:id')
app.delete('/users/:id')
```
说明：
- GET `/` 获取资源
- POST `/users` 创建用户
- PUT `/users/:id` 更新用户
- DELETE `/users/:id` 删除用户


## 模板引擎（Template Engine）

模板引擎可以：
- 使用 HTML 模板
- 插入变量
- 动态生成页面

常见模板：
- EJS
- Pug
- Handlebars    

示例：
```js
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const data = { name: 'John' };
  res.render('index', { data });
});
```

解释：

- 设置模板引擎为 EJS
- 渲染模板文件
- 传递数据到页面


## 易配置
可以轻松设置：
- 模板引擎
- 静态文件目录
- 端口号

## 错误处理
```js
app.use((req, res) => {
  res.status(404).send("404: Page not found");
});
```

作用：

处理未匹配的路由（404）


## Express 的“不强制规范”特点

Express 不规定：

- 使用哪个数据库
    
- 使用哪个 ORM
    
- 项目目录结构
    

你可以自由选择：

- MySQL
    
- PostgreSQL
    
- MongoDB
    

架构也自由：

- MVC
    
- MVVM
    
- 自定义结构
    

优点：

✔ 灵活  
缺点：

✔ 需要自己做更多决策

---

## Express 的优势

✔ 简单  
✔ 高性能  
✔ 灵活  
✔ 易集成数据库  
✔ 社区庞大


## 简单 Express 程序
安装
```bash
pnpm install express
```
示例服务器：
```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port);
```
代码说明：

- 导入 Express
    
- 创建应用
    
- 设置端口
    
- 定义路由
    
- 启动服务器