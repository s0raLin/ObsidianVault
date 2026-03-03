/**
 * 按照要求搭建HTTP服务
 * GET /login 显示表单网页
 * POST /login 获取表单中的用户名和密码
 */

import express from 'express';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

// 解析JSON格式的请求体的中间件
const jsonParser = express.json;
// 解析querystring格式请求体的中间件
const urlencodedParser = express.urlencoded({extended: false});



// 解析 JSON 和 URL-encoded 请求体
app.get('/login', (req, res) => {
    // res.send('表单页面');
    res.sendFile(__dirname+'/public/index.html');
});

app.post("/login", urlencodedParser, (req, res) => {
    // 获取请求体中的数据
    console.log(req.body);
});

app.listen(3000);