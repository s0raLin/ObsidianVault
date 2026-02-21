import express from 'express';

const app = express();

app.post('/reg', (req, res) => {
    res.end('reg reg');
});
app.post('/login', (req, res) => {
    res.end('login login');
});

app.listen(8080, () => {
    console.log("端口8080已启动");
});