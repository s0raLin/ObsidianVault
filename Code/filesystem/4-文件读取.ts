import fs from 'node:fs';

fs.readFile('./text', (err, data) => {
    if (err) {
        console.log("读取失败");
        return;
    }

    console.log(data.toString());
})