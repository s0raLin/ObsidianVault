import http from 'node:http';

http.createServer((req, res) => {
    // 设置响应头
    res.setHeader('content-type', 'text/html;charset=utf-8');
    res.setHeader('Server', 'Node.js');
    res.setHeader('test', ['a', 'b', 'c']);

    // 设置响应体
    res.write('love');
    res.write('love');
    res.write('love');

    res.end(); 
})