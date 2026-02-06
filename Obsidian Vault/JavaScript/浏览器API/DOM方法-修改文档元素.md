在开发 Web 应用时，你经常需要根据用户的操作来改变网页元素。  
例如，你可能想创建一个新的 `div` 容器，并在其中放入一些段落文本；或者在待办事项列表中删除一个已完成的项目，再添加一个新的项目。

所有这些操作都可以通过 **DOM 修改方法** 来实现。

---

## innerHTML 和 textContent 属性

首先，假设我们想在一个 class 为 `"container"` 的空 `div` 中添加一段文本。  
可以使用 **`innerHTML` 属性** 来完成这一操作。该属性用于获取或设置元素的 **HTML 内容**。

也就是说，`innerHTML` 返回或设置的是一个 **包含 HTML 标记的字符串**。  
来看下面的示例代码：

```js
let container = document.querySelector(".container");
container.innerHTML = "<p>DOM is cool!</p>"; 

console.log(container); 
// <div class="container"><p>DOM is cool!</p></div>
```

**代码解释：**

- 选中 `.container` 元素
- 使用 `innerHTML` 向其中插入一个 `<p>` 标签

---

你也可以使用该属性来 **清空元素内部的内容**：

```js
container.innerHTML = ""; 

console.log(container); 
// <div class="container"></div>
```

**代码解释：**

- 将 `innerHTML` 设为空字符串
- 元素内部的所有内容都会被删除

---

不过，当你只是想插入 **纯文本** 时，更推荐使用另一个属性：**`textContent`**。

正如它的名字所示，`textContent` 表示的是元素的 **文本内容**。

`textContent` 会安全地把文本插入到元素中，而**不会解析 HTML**。  
因此，如果文本中包含标签，它们会被当作普通文本显示。

例如，如果你插入 `<b>bold text</b>`，页面上看到的会是：

```js
<b>bold text</b>
```

而不是加粗的文字。

现在回到我们的示例，使用 `textContent` 来设置 `div` 的文本内容：
```js
container.textContent = "Hello, World!"; 

console.log(container); 
// <div class="container">Hello, World!</div>
```

**代码解释：**

- 文本被直接插入    
- 不会解析成 HTML

---

## createElement() 和 createTextNode()

当你需要 **创建新的网页元素** 时，应当使用 **`createElement()` 方法**。  
它会根据你提供的标签名创建一个新的 HTML 元素。

⚠️ **注意：必须提供合法的标签名**。

下面的示例展示了 `createElement()` 的正常用法，以及传入非法标签名时的结果：

```js
let myElement = document.createElement("div");
let errorElement = document.createElement("Hello!");

console.log(myElement); 
// <div></div>

console.log(errorElement); 
// DOMException: The tag name provided ('Hello!') is not a valid name.
```

**代码解释：**

- `"div"` 是合法标签，成功创建
- `"Hello!"` 不是合法标签名，抛出 DOM 异常

---

另一种方式是使用 **`createTextNode()`**。  
该方法用于创建一个 **文本节点**，并接收文本内容作为参数。

示例如下：

```js
let myText = document.createTextNode("I am learning DOM methods!");
let justTextNode = document.createTextNode("div");

console.log(myText); 
// I am learning DOM methods!

console.log(justTextNode); 
// div
```

**代码解释：**

- 无论内容是什么，都会被当作纯文本
- 不会创建 HTML 元素

---

## appendChild()

**`appendChild()` 方法** 接收一个节点作为参数，并将其插入为父元素的 **最后一个子节点**。  
该方法会返回被添加的节点。

示例如下：

```js
document.body.innerHTML = "<ul id='list'><li>An item</li></ul>";

let list = document.getElementById("list");
let newItem = document.createElement("li");
newItem.textContent = "A new item";

list.appendChild(newItem);

console.log(list);
// <ul id='list'><li>An item</li><li>A new item</li></ul>
```

**代码解释：**

- 创建一个新的 `<li>` 元素
- 设置文本内容
- 将其添加到列表末尾

---

## remove()

最后介绍的是 **`remove()` 方法**，它用于 **从 DOM 中删除一个元素**。

示例如下：

```js
document.body.innerHTML = "<div id='container'><h1 id='heading'>I like JS!</h1></div>";

let container = document.getElementById("container");
let heading = document.getElementById("heading");

heading.remove();

console.log(container);
// <div id="container"></div>
```

**代码解释：**

- 找到要删除的元素
- 调用 `remove()`
- 元素会从 DOM 中彻底移除

--- 