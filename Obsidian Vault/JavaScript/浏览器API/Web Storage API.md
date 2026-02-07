借助**Web Storage API**，即使不与后端服务器交互，也能在浏览器或其他程序中以**键值对(key-value)** 的形式保存数据

## localStorage
以键值对的形式将用户数据本地存储在浏览器中，**并且没有过期时间**
可以通过**全局对象(window)** 直接访问 localStorage

```js
window.localStorage
```

## sessionStorage
同样以键值对的形式存储用户数据，**但只在一次会话(session)期间有效**
这意味着：

- 刷新页面时，数据仍然存在
- 一旦关闭浏览器窗口，数据就会被清除
- 在新窗口或新标签页中打开同一个页面时，会创建一个新的会话，之前存储在 sessionStorage 中的数据将无法访问


sessionStorage 中的数据**只在从服务器请求页面时可访问**，因为它与服务器会话相关联。当页面是以本地文件（如 `file://`）方式打开时，sessionStorage 是不可用的。

此外，sessionStorage 与页面的**协议**相关，例如：
- `https://www.example.com`
- `http://www.example.com`

这两个地址的 sessionStorage 是彼此独立的。


可以通过 `window` 对象直接访问 sessionStorage
```js
window.sessionStorage
```

## 存储对象的方法
localStorage和sessionStorage共用一套相同的方法

### clear()
用于清空localStorage中的所有数据
```js
window.localStorage.clear();
```

### setItem(key, value)
向localStorage中存储键值对数据
```js
window.localStorage.setItem("key", "value");
```
注意：**localStorage 只能存储字符串类型的数据**。  
如果你想存储数组或对象，需要先使用 `JSON.stringify()` 将其转换为字符串，再传给 `setItem()`。

### getItem(key)
用于从localStorage中获取数据
```js
window.localStorage.getItem("key")
```

### removeItem(key)
删除localStorage中指定的键
如果该key不存在，则不发生操作
```js
window.localStorage.removeItem(key);
```

### length
获取当前存储对象中存储的键值对数量
```js
console.log(window.localStorage.length);
```

## 补充说明

与 Cookie 不同，**Web Storage 中的数据不会在每一次请求时自动发送到服务器**。  
因此，我们可以存储更多的数据。大多数现代浏览器至少允许存储 **5MB** 的数据，甚至更多。