URL是用于定位网络资源位置的字符串，由多个部分组成:
- 协议（protocol）
- 域名（domain name）
- 资源路径（path）
- 以及其他部分

在Node.js中，可以使用内置的`url`模块来**解析、构造和修改URL**


## 引入URL模块
```js
const url = require('node:url');
```

## 解析URL

### 使用`url.parse()`(已弃用)
```js
const url = require("url");

const parsedUrl = url.parse("https://de.wikipedia.org/wiki/Wikipedia:Hauptseite");

console.log(parsedUrl);
```
#### 输出结果
返回一个对象，包含URL的各个部分
```js
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'de.wikipedia.org',
  port: null,
  hostname: 'de.wikipedia.org',
  hash: null,
  search: null,
  query: null,
  pathname: '/wiki/Wikipedia:Hauptseite',
  path: '/wiki/Wikipedia:Hauptseite',
  href: 'https://de.wikipedia.org/wiki/Wikipedia:Hauptseite'
}
```
### 使用新的 URL 类(推荐方式)
```js
const url = require("node:url");

const newUrl = new URL("https://de.wikipedia.org/wiki/Wikipedia:Hauptseite");

console.log(newUrl);
```
#### 输出
```js
URL {
  href: 'https://de.wikipedia.org/wiki/Wikipedia:Hauptseite',
  origin: 'https://de.wikipedia.org',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'de.wikipedia.org',
  hostname: 'de.wikipedia.org',
  port: '',
  pathname: '/wiki/Wikipedia:Hauptseite',
  search: '',
  searchParams: URLSearchParams {},
  hash: ''
}
```
### 解释

- `new URL()` 是 WHATWG 标准 API
- 返回一个 URL 对象
- 更现代、更统一
- 推荐使用

## 构造URL
### 使用`url.format()`(旧方法)
```js
const url = require("url");

const urlObject = {
  protocol: 'https:',
  hostname: 'www.dummywebsite.com',
  pathname: '/mydocument',
  auth: 'username:password',
  port: '443',
};

const urlString = url.format(urlObject);

console.log(urlString);
```
### 解释
- 传入一个对象
- `url.format()` 将其转换为完整 URL 字符串
> 该方法已弃用

### 使用新的 URL API(推荐)
```js
const url = require("url");

const urlObject = new URL("https://www.dummywebsite.com/mydocument");

urlObject.username = "username";
urlObject.password = "password";

const urlString = urlObject.toString();

console.log(urlString);
```
### 解释
- 使用 `new URL()`
- 直接修改属性
- 使用 `toString()` 生成完整 URL

## 解析相对路径
### 使用 `url.resolve()`(旧方法)
```js
const url = require('url');

const baseUrl = 'https://www.abaseurl.com';
const relativeUrl = '/find?q=javascript';

const resolvedUrl = url.resolve(baseUrl, relativeUrl);

console.log(resolvedUrl);
```
### 解释
- 第一个参数：基础 URL
- 第二个参数：相对路径
- 组合成完整 URL
> 该方法已弃用

### 使用URL构造函数(现代推荐)

```js
const { URL } = require("url");

const firstURL = new URL("https://de.wikipedia.org/wiki/Wikipedia:Hauptseite");

console.log(firstURL);
console.log(typeof firstURL);
```

说明：
- 返回的是一个 URL 对象
- 类型为 object
- 与旧 API 功能相同但更规范