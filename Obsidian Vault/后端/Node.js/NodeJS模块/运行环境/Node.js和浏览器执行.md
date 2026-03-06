
## 在浏览器中执行代码
JavaScript最初被设计为一种为网页添加功能的语言，很多事情一开始没有被充分考虑，比如**在浏览器之外运行JavaScript**

接下来看看如何在浏览器中执行代码。

在大多数浏览器中，可以使用快捷键 **Ctrl + Shift + I** 打开开发者工具。

在开发者工具中，打开 **Console（控制台）** 选项卡，然后输入任意你想写的 JavaScript 代码。如果你想编写多行代码，可以使用 **Shift + Enter** 组合键换行。要执行代码，只需按 **Enter** 键即可

如果代码是写在 HTML 页面中的 `<script></script>` 标签里，那么浏览器会对这些代码进行更复杂的处理
## 使用Node.js执行代码
Node.js平台使用的是V8引擎(Chromium内核浏览器同样使用它)。这个引擎使高层的JavaScript代码可以被转换为机器码

只需要输入以下命令：
```bash
node .\source.js
```

添加 `--print-bytecode` 参数可以查看代码的**更底层表示形式**，不过这通常比较难理解。
```bash
node --print-bytecode .\source.js
```
更多参数可以参考 Node.js 官方文档。


## 在终端中直接执行代码

首先，你需要输入一个简单的命令：

```bash
node
```

如果一切正常，你会看到提示类似的信息，邀请你输入代码:
```bash
Welcome to Node.js v16.14.0.
Type ".help" for more information.
>
```
在这种模式下，你只能编写单行代码
如果你想编写多行代码，需要在 Node.js 交互环境中输入 `.editor` 命令
