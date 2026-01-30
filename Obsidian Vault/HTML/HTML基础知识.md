**HTML(超文本标记语言)**,用于构建网站
**超文本**指的是通过链接相互连接的文本，**标记语言**是帮助浏览器识别这些内容，以用户友好的方式呈现出来

## HTML元素
浏览器打开一个HTML文档时，会读取其中的标签并展示出来。

### 块级元素
块级元素从新行开始，并且横向撑满其父容器的可用宽度

**示例**
```html
<div>
	<h1>h1标题</h1> <!--h1~h6标题-->
	<p>p文本段落</p> <!--文本段落-->
	<hr> <!--一条水平线-->
</div>
```

#### 列表相关元素
* `<ul>`：无序列表
* `<ol>`：有序列表
* `<li>`：列表项(放在`<ul>`或`<ol>`中)

####  其他常见块级元素
* `<table>`：表格
* `<section>`：内容区块
* `<article>`：独立完整的内容
* `<header>`：介绍性内容或导航区域
* `<footer>`：页脚或某个区块的底部内容
示例
```html
<div> 
	<header> <h1>Main Header</h1> <header/> 
	<section> 
		<article>
			<h2>Article Title</h2> <p>This is the content of the article.</p> 
		<article/> 
	</section> 
	<footer> 
		<p>Footer content goes here.</p> 
	<footer/> 
</div>
```

### 行内元素
行内元素是构成行的一部分的元素。

#### `<a>`标签
创建链接，通常与href一起使用，制定文件/网页的路径
```html
<a href="google.com">Google</a>
```

#### `<span>`标签
将文本或其中一部分包含在`<span>`标签中
```html
<p>这是一个<span>p标签</span></p>
<span>这是一个span标签</span>
```

#### `<button>`标签
创建可点击的按钮
```html
<button>Click</button>
```

#### `<b>`标签
将文本变为粗体
```html
<p>这是<b>p标签</b></p>
```

#### `<sub>`标签
缩小文本，用于创建下标
```html
<p>这是一个<sub>p标签</sub></p>
```

#### `<sup>` 标签
创建一个上标文本
```html
<p>x<sup>2</sup> = 4</p>
```
#### 注意
* 行内标签可以嵌套在其他块级元素或其他行内标签中，但不能包含块级元素
* 行内元素必须被行内标签包围才起作用
* 行内标签的尺寸由其内容和周围上下文决定，而不是width和height属性