## 基本概念
Flexbox是由弹性容器和弹性项目组成
### 弹性容器
用于包裹弹性项目的父元素
### 弹性项目
容器的子元素，可以按行或按列排列

使用 Flexbox，你可以让元素按 **四个方向** 排列：
- 从左到右
- 从右到左
- 从上到下
- 从下到上

你还可以：
- 改变元素的显示顺序
- 自动设置元素大小以适应可用空间
- 控制元素在容器内的位置
- **彻底解决水平和垂直居中这个困扰程序员多年的问题**


## Flex 模型中的轴

为了更好地理解 Flexbox，需要先掌握以下术语：

- **主轴（main axis）**  
    决定元素默认排列方向的轴
- **交叉轴（cross axis）**  
    与主轴垂直的轴
- **主轴起点（main start） / 主轴终点（main end）**  
    定义主轴开始和结束的位置
- **交叉轴起点（cross start） / 交叉轴终点（cross end）**  
    定义交叉轴开始和结束的位置
- **主尺寸（main size）**  
    沿主轴方向的尺寸
- **交叉尺寸（cross size）**  
    沿交叉轴方向的尺寸
### 创建一个 Flexbox
只需要给一个块元素设置：`display: flex;`

#### 示例

```html
<div class="flex-container">
  <div class="flex-item">item 1</div>
  <div class="flex-item">item 2</div>
  <div class="flex-item">item 3</div>
</div>
```

```css
.flex-container {
  border: 2px solid DodgerBlue;
}

.flex-item {
  margin: 10px;
  padding: 10px;
  font-size: 30px;
  border: 2px solid DodgerBlue;
  color: DodgerBlue;
}
```

##### 使用 `display: block` 时的效果：
三个元素**纵向排列在一列中**

##### 使用 `display: flex` 时的效果：
三个元素**横向排列在一行中**



如果一个块中包含**没有被 `<div></div>` 包裹的文本或图片**，它们会变成**匿名弹性项目**  
在这种情况下：
- 文本会贴在容器顶部
- 图片的高度会被拉伸为容器的高度
如果你觉得这样不理想，**记得把内容包裹在 `<div>` 中即可**。


## 使用 Flexbox 时注意事项

- `display`、`float`、`clear`、`vertical-align`  
    **在 Flexbox 中是无效的，即使设置了也会被忽略**
    
- 不需要给每个子元素设置 `display: flex;`  
    **只需要给父容器设置即可**
    
- 如果 `margin` 或 `padding` 使用百分比  
    **它们是基于父元素的内部尺寸计算的**
    
- Flex 项目的默认最小尺寸取决于内容大小  
    等价于 `min-width: auto;`
    
- 当元素的 `overflow` 可见时，默认最小尺寸为 `0`