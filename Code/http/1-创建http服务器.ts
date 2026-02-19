import http from 'node:http';
const port = 8080;
const server = http.createServer((request, response) => {
    
    response.setHeader('content-type', 'text/html;charset=utf-8'); //解决中文乱码
    response.end('你好'); //设置响应体
});

server.listen(port, () => {
    console.log('服务已经启动...');
});

