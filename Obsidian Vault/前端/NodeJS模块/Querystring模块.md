由于 URL 通常是很长的字符串，需要一种方式来提取其中需要的数据，为此我们可以使用`querystring`模块

## 什么是查询字符串(Query String)?
查询字符串是URL中以`?`开头的部分,例如:
```js
const url = "https://awesome-node/learn?topic=querystring&student=mandela";
```

这里：
- 查询字符串是：  
    `?topic=querystring&student=mandela`
- `https://awesome-node/learn` 被称为 **基础 URL（base URL）**
查询字符串由多个 **键值对（key-value pairs）** 组成：
- 键和值之间用 `=` 连接
- 多个键值对之间用 `&` 连接
在上面的例子中有两个键值对：
- `topic=querystring`
- `student=mandela`

## 解析和解码（parse 和 decode）

在使用之前，我们需要先引入模块：
```js
const querystring = require('node:querystring');
```

`querystring` 模块中有两个作用相同的方法：
- `querystring.parse()`
- `querystring.decode()`

它们功能完全一样，可以任选一个使用

### parse() 方法语法

```js
querystring.parse(str[, sep[, eq[, options]]])
```
参数说明：
- `str`：必需，要解析的字符串
- `sep`：键值对之间的分隔符（默认是 `&`）
- `eq`：键和值之间的分隔符（默认是 `=`）
- `options`：
    - 控制是否处理百分号编码
    - 设置键值对的数量限制（默认最多 1000 个）
    - 默认保留 `%` 字符

虽然语法看起来有点复杂，但通常只需要传入第一个参数即可

### 示例：把查询字符串转换为对象
```js
const querystring = require('node:querystring');

const query = 'topic=querystring&student=mandela';

const queryObj = querystring.parse(query);

console.log(queryObj);
```

输出结果是一个类似 JSON 的对象：
```js
{
  topic: 'querystring',
  student: 'mandela'
}
```

注意：返回的并不是真正的普通 JavaScript 对象（它没有继承 Object 原型），所以像 `toString()` 或 `hasOwnProperty()` 这样的对象方法不能直接使用

通常我们会将 `querystring` 模块与 `url` 模块一起使用。`url` 模块可以把整个 URL 拆分成：
- protocol
- hostname
- query
- 等等
然后通过 `.query` 获取查询字符串，再用 `querystring.parse()` 解析

## 转换为字符串（stringify 和 encode）

和前面的 `parse` / `decode` 一样：
- `stringify` 
- `encode`
也是完全相同的功能。

它们的作用是：  
将 JSON 对象转换为查询字符串。

示例：
```js
const querystring = require('node:querystring');

const obj = {
    topic: 'querystring',
    student: 'mandela'
};

const query = querystring.encode(obj);

console.log(query);
```
输出结果：
```js
topic=querystring&student=mandela
```
### 自定义分隔符

还记得前面说的参数吗？我们可以修改默认的 `&` 和 `=`。

例如使用 `$` 和 `+`：
```js
const query = querystring.encode(obj, '$', '+');
```
结果会变成：
```js
topic+querystring$student+mandela
```
## escape 和 unescape

这两个方法是互为相反的操作：
- `escape()` → 进行百分号编码
- `unescape()` → 去除百分号编码

例如：
```js
https://some-dummy-link/have%2Ba%2Bgreat%2Bday
```
这种 `%2B` 的形式叫做 **百分号编码（Percent Encoding）**。

例如：

- `:` → `%3A`
- `/` → `%2F`

### 示例代码：
```js
const querystring = require('node:querystring');

const link1 = 'https://some-dummy-link/have%2Ba%2Bgreat%2Bday';
const link2 = 'https://some-dummy-link/have-a-great-day';

const unescapedLink = querystring.unescape(link1);
const escapedLink = querystring.escape(link2);

console.log(`Link1 去除编码后: ${unescapedLink}`);
console.log(`Link2 编码后: ${escapedLink}`);
```
输出结果：
- 第一个链接变得更易读
- 第二个链接被转换为百分号编码形式

不过在实际开发中，这两个方法用得并不多