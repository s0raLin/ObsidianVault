import fs from 'node:fs';

// 调用appendFile
fs.appendFile('./text', '追加写入', (err) => {
    if (err) {
        console.log("写入失败");
        return;
    }

    console.log("写入成功");    
});


// writeFile追加写入
fs.writeFile('./text', 'love ', {flag: 'a'}, (err) => {
    if (err) {
        console.log("写入失败");
        return;
    }

    console.log("写入成功");    
});