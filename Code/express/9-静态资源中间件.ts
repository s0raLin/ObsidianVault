import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


// 1. 在 ESM 中手动获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

// 静态资源中间件设置
app.use(express.static(__dirname + '/public'))

// 谁先匹配谁加载
app.get('/', (req, res) => {
    res.send('root');
});

app.get('/home', (req, res) => {
    res.send('home');
});

app.get('/admin', (req, res) => {
    res.send('admin');
});


app.listen(3000);