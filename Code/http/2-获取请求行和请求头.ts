import http from 'node:http';

const server = http.createServer((request, response) => {
    // 获取请求的方法
    console.log(request.method);
    // 获取请求的url
    console.log(request.url);
    // 获取http协议的版本号
    console.log(request.httpVersion);
    // 获取请求头
    console.log(request.headers);
    
    response.setHeader('content-type', 'text/html;charset=utf-8');
    response.end('请求已收到');
});


server.listen(8080, () => {
    console.log('服务端已启动');
})