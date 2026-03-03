import express from "express";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const app = express();


// 在 ESM 中手动获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use((req, res, next) => {
    let referer = req.get('referer') ?? 'http://127.0.0.1';
    
    if (referer) {
        let url = new URL(referer);
        let hostname = url.hostname;

        if (hostname !== '127.0.0.1') {
            res.status(404).send('<h1>404NotFound</h1>')
        }
    }

    next();
});

app.use(express.static(__dirname+'/public'));


app.listen(3000);