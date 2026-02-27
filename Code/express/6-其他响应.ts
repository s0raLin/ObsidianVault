// 导入 express
import express from 'express'; 


// 创建应用对象
const app = express();

// 创建路由
app.get('/response', (req, res) => {
    // 跳转响应
    // res.redirect('http://baidu.com');
    // res.download(__dirname+'/package.json');
    // // JSON响应
    // res.json({
    //     name: '张三',
    //     age: 20,
    // }); 

    // 响应文件内容
    res.sendFile(__dirname+'/package.json');

});

app.listen(3000, () => {
    console.log('服务已经启动');
});
