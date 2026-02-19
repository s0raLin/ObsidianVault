import http from 'node:http';
const port = 8080;
const server = http.createServer((request, response) => {
    
    // 使用 URL 类替代已弃用的 url.parse()
    // 第一个参数: request.url (请求的URL路径，如 /api/user?name=zhangsan)
    // 第二个参数: 基础URL，用于解析相对路径。HTTP服务器中通常用 http://localhost:端口
    // const url = new URL('/search?a=100&b=200', 'http://127.0.0.1:8080);
    const myUrl = new URL(request.url!, `http://localhost:${port}`);
    
    // 获取请求路径
    const pathname = myUrl.pathname;
    
    // 获取查询字符串
    const query = myUrl.search;
    
    // 获取查询参数对象
    const queryParams = myUrl.searchParams;

    console.log('请求路径:', pathname);
    console.log('查询字符串:', query);
    console.log('参数 name:', queryParams.get('name'));

    response.setHeader('content-type', 'text/html;charset=utf-8'); //解决中文乱码
    response.end('你好'); //设置响应体
});

server.listen(port, () => {
    console.log('服务已经启动...');
});

