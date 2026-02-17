import fs from 'node:fs';

fs.unlink('./观后感.txt', (err) => {
    if (err) {
        console.log('删除失败');
        return;
    }
    console.log('删除成功');
})

fs.rm('./论语.txt', (err) => {
    if (err) {
        console.log('删除失败');
        return;
    }
    console.log('删除成功');
});