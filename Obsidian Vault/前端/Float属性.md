## `float`是用来干什么的?
* 让文本环绕图片
* 让一个元素紧挨着另一个元素显示
当为元素设置`float`之后，该元素会不推到其父元素的左侧或右侧，允许页面中后续元素围绕它排列

## 使用`float`的前提
* 被浮动的元素必须包含在一个父元素中。
* 被浮动的元素不能设置`position: absolute`
* 它的父元素不能设置`position: absolute`
因为设置了 `absolute` 的元素会被**移出文档流**，而 `float` 是基于文档流工作的。

## `float` 属性可以使用以下值：
- **left**：元素浮动到父元素的左侧
- **right**：元素浮动到父元素的右侧
- **inherit**：继承父元素的 `float` 值

## 普通文档流(default)
```html
<div class="main-container">
    <img src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_1280.png" alt="CSS Logo">
    <p>The float CSS property places an element on the left or right side of its container...</p>      
</div>
```

在默认文档流中，元素是从上到下的顺序排列的,所以图片和文本会垂直排列

## float: left和float: right
如果我们希望**文本环绕图片**，就可以使用 `float`。

```css
img {
  float: left;
}
```
给图片设置 `float` 后：
- 图片的位置本身没有明显改变
- **页面的文档流发生了变化**
- 文本从容器顶部开始，填充了原本图片下方的空白区域
如果我们改用：

```css
img {
  float: right;
}
```
那么：
- 图片会浮动到容器右侧
- 文本会在左侧环绕图片显示

## 其他float效果
### 对两个元素都使用 `float`

```css
img, p {
  float: left;
}
```
你会发现：**父容器塌陷了**。

> 如果一个容器中的所有子元素都被浮动，那么该容器的高度会变成 `0px`，无法自动撑开。

### 只对文本使用float
通常看不到明显变化，因为:
- 容器中只有两个元素
- 文本是最后一个元素
> 当我们给一个元素设置 `float` 时，**真正受到影响的是它后面的元素**。