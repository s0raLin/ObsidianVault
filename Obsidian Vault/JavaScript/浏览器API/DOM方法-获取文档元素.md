**文档对象模型（DOM）** 是用于 Web 文档的编程接口。它以一种方式表示页面，使程序能够更改文档的结构、样式和内容。DOM 是一种树状结构，由节点组成，每个节点都表示文档的一部分。

---

## getElementById()

`getElementById()` 方法是最常用的 DOM 方法之一。它允许你根据元素唯一的 `id` 属性选择一个 HTML 元素。该方法返回该元素的引用，你可以使用 JavaScript 对其进行操作。

请看下面的示例：
```html
<div id="header">Welcome to My Website</div>

<script>
    const headerElement = document.getElementById('header');
    headerElement.style.color = 'blue'; // Changes the text color to blue
</script>
```


**代码解释：**  
在这个示例中，`getElementById()` 方法选中了 `id` 为 `"header"` 的 `<div>` 元素，并将其文本颜色更改为蓝色。

---

## getElementsByClassName()

`getElementsByClassName()` 方法允许你选择具有指定类名的所有元素。它返回一个**实时的 HTMLCollection**，这是一个类似数组的对象，包含所有匹配的元素。

示例如下：

```html
<p class="note">Note 1</p>
<p class="note">Note 2</p>

<script>
    const notes = document.getElementsByClassName('note');
    for (let i = 0; i < notes.length; i++) {
        notes[i].style.fontWeight = 'bold'; // Makes the text bold
    }
</script>
```

**代码解释：**  
该示例中，`getElementsByClassName()` 选中了所有类名为 `"note"` 的 `<p>` 元素，并通过循环将每个段落的字体设置为加粗。

---

## getElementsByTagName()

`getElementsByTagName()` 方法用于选择具有指定标签名的所有元素。该方法返回一个**实时的 HTMLCollection**，你可以对这些元素进行整体或单独操作。

示例如下：

```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<script>
    const listItems = document.getElementsByTagName('li');
    for (let item of listItems) {
        item.style.listStyleType = 'square'; // Changes bullet points to squares
    }
</script>
```


**代码解释：**  
在这个示例中，选中了所有 `<li>` 元素，并将它们的列表项目符号样式改为方形。

---

## querySelector()

`querySelector()` 方法返回**第一个**与指定选择器匹配的元素。

```html
<div class="container">
    <p>First paragraph</p>
    <p>Second paragraph</p>
</div>

<script>
    const firstParagraph = document.querySelector('.container p');
    firstParagraph.style.color = 'green'; // Changes the text color to green
</script>
```

**代码解释：**  
在该示例中，`querySelector()` 选中了 `.container` 元素中的第一个 `<p>` 元素，并将其文本颜色设置为绿色。

---

## querySelectorAll()

`querySelectorAll()` 方法与 `querySelector()` 类似，但它会返回一个**静态的 NodeList**，包含所有与指定 CSS 选择器匹配的元素。  
与 HTMLCollection 不同，NodeList 可以直接使用 `forEach()` 方法进行遍历。我们将在后续主题中学习 `forEach` 方法和 NodeList。  
你可以在 `querySelectorAll()` 中使用类选择器和 ID 选择器。

示例如下：
```html
<div class="container">
    <p>First paragraph</p>
    <p>Second paragraph</p>
</div>

<script>
    const paragraphs = document.querySelectorAll('.container p');
    paragraphs.forEach(paragraph => {
        paragraph.style.fontSize = '18px'; // Sets the font size to 18px
    });
</script>
```

**代码解释：**  
在该示例中，`querySelectorAll()` 选中了 `"container"` 类中的所有 `<p>` 元素，并将每个段落的字体大小设置为 `18px`。

---

## 总结

JavaScript 为操作 Web 界面提供了丰富的能力。今天我们又向掌握这门编程语言迈进了一步，学习了如何使用 DOM 方法获取元素。  
每种方法都提供了不同的方式来获取页面元素，适用于不同的使用场景。