import http, { IncomingMessage, ServerResponse } from 'node:http';
const port = 8080;
const server = http.createServer((req, res) => {
    let {method} = req;
    let {pathname} = new URL(req.url!, `http://127.0.0.1:${port}`);

    const routes: Record<string, (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void> = {
        "/login": (req, res) => {
            if (req.method !== 'POST') {
                res.statusCode = 405;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Method Not Allowed');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('login');
        },
        "/reg": (req, res) => {
            if (req.method !== 'POST') {
                res.statusCode = 405;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Method Not Allowed');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('reg')
        },
        "default": (req, res) => {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('404 Not Found');
        }
    }

    const routeHandler = routes[pathname!] || routes['default'];
    routeHandler(req, res);
});

server.listen(port);