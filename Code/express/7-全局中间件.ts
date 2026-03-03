import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 1. 在 ESM 中手动获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();


function recordMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    let url = req.url;
    let ip = req.ip || 'unknown';
    fs.appendFileSync(path.resolve(__dirname, './access.log'), `${url} ${ip}\n`);
    next();
}

app.use(recordMiddleware);

app.get('/home', (req, res) => {
    res.send('前台首页');
});

app.get('/admin', (req, res) => {
    res.send('后台首页');
});

app.listen(3000);
