import fs from 'node:fs';

// 创建写入流对象
const ws = fs.createWriteStream('./观书有感.txt');

// write
ws.write(`哈哈哈\n`);
ws.write(`呵呵呵\n`);
ws.write(`嘿嘿嘿\n`);

//关闭通道
ws.close();