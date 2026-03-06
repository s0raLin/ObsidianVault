ECMAScript Modules（ESM）是一种现代化、标准化的 JavaScript 代码组织与复用方式。  
在 Node.js 中使用 ESM 时，需要将文件扩展名指定为 **`.mjs`**。

需要注意的是：**ESM 文件必须使用 `.mjs` 扩展名**。  
`.mjs` 的存在是为了将 ESM 文件与使用 `.js` 扩展名的 CommonJS 模块区分开来。这是因为 ESM 使用的导入（import）和导出（export）语法与 CommonJS 的语法并不兼容

例如，如果你有一个名为 `main.mjs` 的文件，它需要从 `another.mjs` 中导入代码，可以在 `main.mjs` 顶部这样写：
```js
// main.mjs
import { functionFromAnotherModule } from './another.mjs';
```

**代码解释：**  
这行代码从 `another.mjs` 文件中导入名为 `functionFromAnotherModule` 的函数。

在 `another.mjs` 文件中，你可以这样导出该函数：
```js
// another.mjs
export function functionFromAnotherModule() {
  // 函数代码...
}
```
**代码解释：**  
使用 `export` 关键字将函数暴露出去，使其可以被其他模块导入使用。

---

## 导入模块（Importing modules）

导入模块是 ESM 中最常用的功能。几乎在任何项目中，你都会通过导入模块来完成任务。下面来看一个示例：
```js
import { URL } from 'node:url';

const mysiteUrl = new URL('https://mysupersite.com/about#me');

console.log(mysiteUrl.hash);

// #me
```
**代码解释：**

- 使用 `import … from` 语法，从 Node.js 内置的 `node:url` 模块中导入 `URL` 类
- 通过 `URL` 类创建一个新的 URL 对象
- 访问该 URL 的 `hash` 属性
- 最终输出 `#me`，即原始 URL 中的哈希部分

### 导入自定义模块

下面是一个导入自定义模块的示例，其中从 `animals.mjs` 文件中导入了 `animals` 数组：
```js
import animals from "./animals.mjs";

console.log(animals);

// [ 'cat', 'dog', 'bird' ]
```

## 导出模块（Exporting modules）

导出模块和导入模块一样简单，其语法也与 CommonJS 类似。  
你可以使用 `export default` 来导出 `animals` 数组：

```js
// animals.mjs
export default [
  'cat', 'dog', 'bird'
];
```
**代码解释：**

- 使用 `export default` 导出一个默认值
- 默认导出不需要指定名称
- 导入时可以使用任意变量名

⚠️ **注意事项：**

- 一个模块中只能有一个 `default export`
- 模块文件名应具有描述性，便于理解导出的内容

### 导出多个成员

有时你需要从同一个模块中导出多个内容，比如一个对象和一个函数：

```js
// cat.mjs
export const cat = {
  name: 'Bob',
  voice: 'meow',
  colors: ['black', 'orange'],
};

export const getCatVoice = (cat) => {
  return cat.voice;
};
```

**代码解释：**

- 使用 `export const` 导出多个具名成员
- 每个导出项都必须有明确的名称

在 `index.mjs` 中可以这样导入并使用:
```js
// index.mjs
import { getCatVoice, cat } from "./cat.mjs";

console.log(getCatVoice(cat));

// meow
```

**代码解释：**

- 使用解构语法导入指定的导出成员
- 将 `cat` 对象作为参数传入 `getCatVoice` 函数
- 输出 `meow`

---

## import as（整体导入模块）

ESM 还支持将一个模块中的所有导出内容统一导入到一个对象中：
```js
// animals.mjs
export default [
  'cat', 'dog', 'bird'
];

export const cat = {
  name: 'Bob',
  voice: 'meow',
  colors: ['black', 'orange'],
};

export const getCatVoice = (cat) => {
  return cat.voice;
};
```

```js
// index.mjs
import * as animals from './animals.mjs';

console.log(animals.default);
// [ 'cat', 'dog', 'bird' ]

console.log(animals.cat);
// { name: 'Bob', voice: 'meow', colors: [ 'black', 'orange' ] }

console.log(animals.getCatVoice(animals.cat));
// meow
```

**代码解释：**

- 使用 `* as animals` 将模块中所有导出内容整合到 `animals` 对象中
- `default` 导出的内容通过 `animals.default` 访问
- 具名导出通过 `animals.xxx` 访问

---

## 使用 ECMAScript 模块

### 前端中使用 ESM

在前端，你可以通过 `<script>` 标签并将 `type` 设置为 `module` 来使用 ES 模块：
```js
<script type="module" src="index.js"></script>
```

**代码解释：**  
浏览器会将该脚本视为 ES 模块，并启用 `import / export` 语法。

---

### Node.js 中使用 ESM

Node.js 从 **12 版本**开始支持 ES 模块。  
要在 Node.js 中使用 ESM，你需要在 `package.json` 中添加如下配置：
```js
{ "type": "module" }
```
**代码解释：**  
该配置会告诉 Node.js：
- 当前项目中的 `.js` 文件默认使用 ESM 语法
- 无需再强制使用 `.mjs` 扩展名