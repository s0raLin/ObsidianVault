import fs from 'node:fs';

//异步重命名
fs.rename('./观书有感.txt', './观后感.txt', (err) => {
    if (err) {
        console.log("操作失败");
        return;
    }
    console.log("操作成功");
});

// 同步重命名
fs.renameSync('./观书有感.txt', './观后感.txt');
