// 导入 express
import express from 'express';


// 创建应用对象
const app = express();

// 创建路由
app.get('/:id.html', (req, res) => {
    // 获取URL路由参数
    console.log(req.params.id);
    
    res.setHeader('content-type', 'text/html;charset=utf-8');
    res.end('index');
});

// 监听端口
app.listen(3000, () => {
    console.log('服务已经启动');
});