import fs from 'node:fs';

const rs = fs.createReadStream('./观书有感.txt');
const ws = fs.createWriteStream('./copy/观书有感.txt');

rs.on('data', (chuck) => {
    ws.write(chuck);
})


