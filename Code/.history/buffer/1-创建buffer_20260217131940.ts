// 1. alloc
let buf = Buffer.alloc(10);
console.log(buf);

// 2. allocUnsafe(不归零)
let buf2 = Buffer.allocUnsafe(10);
console.log(buf2);

// 3. from
let buf3 = Buffer.from('hello');
let buf4 = Buffer.from([100, 108, 111, 101]);
console.log(buf3);
