import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.end('hello express');
});

app.listen(3000, () => {
    console.log('服务已启动, 端口3000正在监听中...');
});

