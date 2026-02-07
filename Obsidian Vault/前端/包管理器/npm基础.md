通常，在开发 Node.js 应用程序时，你需要使用一组外部工具和库来加快开发过程。然而，手动管理项目中的所有依赖项是非常麻烦的。幸运的是，有一个叫做 **npm** 的特殊工具，可以帮助你安装和管理所需的包。

在本主题中，我们将学习 npm 的基础知识，了解它由哪些部分组成，以及它可以用于哪些不同的用途。

---

## 什么是 npm

**npm** 是一个免费的工具，供 JavaScript 开发者安装和分享他们的包，与世界各地的开发者协作。它的名字是 **Node Package Manager（Node 包管理器）**，因为它最初是作为 Node.js 的默认包管理器而创建的。如今，这个工具被广泛用于管理**开源项目**和**私有项目**。

（npm 的标志）

使用 npm，你可以：

- 下载新包
- 更新和删除包
- 将你自己的包分享给其他用户（需要在官网注册）
- 以及完成更多操作

---

## npm 的组成

npm 由三个主要部分组成：

1. **命令行客户端（CLI）**：用于下载和发布包
2. **远程注册表（Registry）**：集中存储所有公共和私有包
3. **官方网站**：用于查找和浏览各种包

这三部分都由同一个组织 **npm, Inc.** 管理。

---

## 安装 npm

如果你已经安装了 Node.js，那么你很可能已经安装了 npm。你可以在终端中运行以下命令来检查：
`npm -v`
或：
`npm --version`
> `npm -v` 和 `npm --version` 是**相同的命令**
> 
> - `-v` 是短选项（单横线）
>     
> - `--version` 是长选项（双横线）
>     

如果你还没有安装 npm 或 Node.js，请参考官方指南进行安装。

---

## 常用命令概览

npm 的命令非常多，下面是一些最常用的：

- `npm init`：初始化一个新项目
- `npm install <package>` 或 `npm i <package>`：安装指定包
    - 例如：`npm install express`
- `npm uninstall <package>` 或 `npm un <package>`：卸载包
- `npm update` 或 `npm up`：更新所有包
- `npm ls`：列出已安装的所有包

---

## 初始化新项目

要初始化一个新项目，可以使用 `npm init` 命令。它会启动一个交互式工具，引导你回答关于项目的信息：

```js
/my-npm-package % npm init
```
确认后，npm 会创建 `package.json` 文件并将内容打印到控制台。

---

### 快速初始化

如果你不想回答这些问题，可以使用：
`npm init -y`
该命令会使用默认值直接创建一个最简的 `package.json` 文件。

---

## 安装其他包

要为项目安装依赖，可以使用：
`npm install <package-name>`
或简写：
`npm i <package-name>`
### 开发依赖（devDependencies）

有些包**只在开发阶段有用**，不会影响最终的生产环境，比如调试工具。这类包应作为开发依赖安装：
`npm i --save-dev <package-name>`
或简写为：
`npm i -D <package-name>`
示例：
`npm install -D nodemon`

`nodemon` 用于在文件保存后自动重启 Node 程序，但在生产环境中并不需要。
安装后，`package.json` 中会新增：
`"devDependencies": {   "nodemon": "^2.0.22" }`

---

### npm install 的别名

`npm i` 是 `npm install` 的别名之一。以下命令**效果完全相同**：
`add, i, in, ins, inst, instal, isnt, isnta, isntall`
（不推荐全部使用，只了解即可）

---

## 指定包版本

你可以安装某个**特定版本**的包：

`npm i lodash@4.0.0`

格式为：

`npm i <包名>@<版本号>`

这在某些版本对项目非常关键时非常有用。

---

## 全局安装包

有些工具需要在系统中全局使用，可以使用：

`npm i --global <package-name>`

或：

`npm i -g <package-name>`


⚠️ **注意**：  
全局安装通常需要管理员权限（`sudo`）。