CSS(层叠样式表)是一种负责控制HTML文档样式的语言。
示例:
```html
<style>

body, html {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    height: 100%;
}

.hero {
    background-image: url('cave-path.jpg');
    background-size: cover;
    background-position: center;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
```

## 为什么要使用CSS？

- 它让 HTML 页面变得更加美观；
- 它可以为开发者节省时间。你只需编写一次 CSS 文件，就可以将其连接到多个 HTML 页面；
- 页面加载速度更快。与其为多个 HTML 元素重复编写相同的样式属性，不如写一条 CSS 规则并同时应用到多个元素上。代码越少，加载速度越快；
- 它兼容多种设备。样式表允许你针对不同设备优化内容。使用同一个 HTML 文档，就可以为台式电脑、笔记本和智能手机呈现不同版本的网站；
- 最重要的是，所有主流现代浏览器都支持 CSS。