import http from 'node:http';
const port = 8080;
const server = http.createServer((request, response) => {
    
    // 1. 声明一个变量
    let body = '';
    // 2. 绑定data事件
    request.on('data', (chunk) => {
        body += chunk;
    });
    // 3. 绑定end事件
    request.on('end', () => {
        console.log(body);
    });
    
    response.setHeader('content-type', 'text/html;charset=utf-8'); //解决中文乱码
    response.end('你好'); //设置响应体
});

server.listen(port, () => {
    console.log('服务已经启动...');
});

