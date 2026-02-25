//导入 express
import express from "express";

// 创建应用对象
const app = express();

// 路由
app.get('/request', (req, res) => {
    // 获取报文的方式
    // 1. 与原生http方式兼容
    console.log(req.method);
    console.log(req.url);
    console.log(req.httpVersion);
    console.log(req.headers);

    // 2. express独有的方式
    // 获取查询字符串
    console.log(req.query);
    // 获取指定的请求头
    console.log(req.get('host'));

    res.end('request request');
});

app.listen(3000, () => {
    console.log('启动成功');
});