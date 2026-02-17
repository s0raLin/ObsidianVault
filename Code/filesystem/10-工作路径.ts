import path from "node:path";

// 所在文件所在目录的绝对路径，这在windows上可能有问题
console.log(__dirname+'/index.html');

// resolve 
console.log(path.resolve(__dirname, './index.html'));
console.log(path.resolve(__dirname, 'index.html'));
console.log(path.resolve(__dirname, '/index.html'));



// path.resolve() -> 拼接规范的绝对路径
// path.sep() -> 获取操作系统的路径分隔符
// path.parse() -> 解析路径并返回对象
// path.basename() -> 获取路径的基础名称
// path.dirname() -> 获取路径的目录名
// path.extname() -> 获取路径的扩展名
