import fs from 'node:fs';

fs.stat('./text', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});

