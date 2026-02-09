`process`对象是Node.js内置模块，用于提供当前Node.js进程的相关信息。

## 进程环境(Process environment)
`process.env`对象用于存储当前Node.js进程可访问的环境变量

`process.env`允许开发者读取和修改这些环境变量
你可以将`process.env`打印到控制台
```js
console.log(process.env);
```

### 代码解释

在不同的机器和环境中，输出结果都会不同

```js
{
  TERM: 'xterm-256color',
  SHELL: '/usr/local/bin/bash',
  USER: 'maciej',
  PATH: '~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin',
  PWD: '/Users/maciej',
  EDITOR: 'vim',
  SHLVL: '1',
  HOME: '/Users/maciej',
  LOGNAME: 'maciej',
  _: '/usr/local/bin/node'
}
```


你可以在项目根目录下创建`.env`文件，并使用环境变量格式定义变量

默认情况下，Node.js **不会自动读取 `.env` 文件**，也不会把其中的变量加入到 `process.env` 中

你需要安装并引入 `dotenv` 包，才能使用 `.env` 文件：
```js
// .env
MY_ENV_VAR=12
```

```js
// index.mjs
import * as dotenv from 'dotenv';
dotenv.config();

console.log(process.env);
```

输出示例
```js
{
  ...
  npm_node_execpath: '/usr/local/bin/node',
  npm_config_prefix: '/usr/local',
  COLORTERM: 'truecolor',
  MY_ENV_VAR: '12'
}
```

你可以在 `.env` 文件中存储诸如 **Token、API 地址** 等敏感信息，但**千万不要**把 `.env` 文件提交到代码仓库中，否则你的“秘密”就不再是秘密了。


## 进程参数(Process arguments)

`process.argv` 返回当前进程的**命令行参数数组**。

- 第一个元素：Node.js 可执行文件的绝对路径
- 第二个元素：当前执行脚本的绝对路径

```js
console.log(process.argv);

// $ node index.mjs
// 输出：
[
  '/usr/local/bin/node',
  '/Users/username/hs/process-object/index.mjs'
]
```

## 标准输入与输出
* `process.stdin`: 标准输入流
* `process.stdout`: 标准输出流

它们允许开发者通过终端与用户进行交互。

- `process.stdin` 是一个输入流，可以监听事件来获取用户输入
- `process.stdout.write()` 用于向终端输出内容，功能与 `console.log()` 类似


示例： 基于参数的终端交互程序

```js
// 检查是否传入 --login 参数
const isLogin = process.argv.some((arg) => arg === '--login');

const loginMessage = `Welcome back! \b\nEnter your name to come in: `;
const registerMessage = `Welocome on the board! \b\nEnter your name to register: `;

// 输出提示信息
process.stdout.write(isLogin ? loginMessage : registerMessage);

// 读取用户输入
process.stdin.on('data', (input) => {
	const enteredName = input.toString().trimEnd();

	const loginMessage = `Welocome back, ${enteredName}!`;
	const registerMessage = 
		`Welcome, ${enteredName}!
		\b\nYou have successfully registered!
		\nUse --login flag to login!`;

	process.stdout.write(isLogin ? loginMessage : registerMessage);
});
```

### 代码解释

1. 使用 `process.argv` 判断是否传入了 `--login` 参数
2. 根据参数决定程序启动时显示的提示信息
3. 使用 `process.stdin.on('data')` 监听用户输入
4. 根据不同的参数输出不同的结果

运行效果：

- `node index.js`
- `node index.js --login`

你会看到一个典型的**终端交互式程序**，类似于初始化 npm 项目时的交互过程。

不过，此时程序不会自动退出，你需要使用 `Ctrl + C` 终止它。

为了解决这个问题，我们可以使用 `process.exit()`。

---

## 进程退出（Process exit）

当你通过终端与用户交互时，通常需要在完成任务后终止程序。

可以使用 `process.exit()` 来结束当前进程。


```js
const isLogin = process.argv.some((arg) => arg === '--login');

const loginMessage = `Welcome back! \b\nEnter your name to come in: `;
const registerMessage = `Welocome on the board! \b\nEnter your name to register: `;

process.stdout.write(isLogin ? loginMessage : registerMessage);

process.stdin.on('data', (input) => {
	const enteredName = input.toString().trimEnd();

	const loginMessage = `Welocome back, ${enteredName}!`;
	const registerMessage = 
		`Welcome, ${enteredName}!
		\b\nYou have successfully registered!
		\nUse --login flag to login!`;

	process.stdout.write(isLogin ? loginMessage : registerMessage);

	// 终止进程
	process.exit();
});
```

### 代码解释

`process.exit()` 可以接收一个参数作为**退出码**：

- `0`：正常结束
- `1`：异常或错误结束

退出码可以被其他程序或工具用来判断 Node.js 程序是否成功执行。

⚠️ 注意：  
使用 `process.exit()` 需要谨慎，因为它会**立即终止进程**，可能导致尚未保存的数据丢失。

一般建议在所有任务完成后，让程序自然结束，而不是强制退出。