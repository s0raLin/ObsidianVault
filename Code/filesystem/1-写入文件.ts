// 1.导入fs模块
import fs from 'node:fs';

// 异步写入
fs.writeFile('./text', '三人行，则必有我师', (err) => {
    if (err) {
        console.log('写入失败');
        return;
    } 
});

// 同步写入
fs.writeFileSync('./text', '三人行，则必有我师焉');
