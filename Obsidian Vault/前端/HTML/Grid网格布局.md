在一个grid中，存在水平和垂直线将布局划分为行和列
* 平行网格线之间的空间被称为**grid track(网格轨道)**
* 多条网格线组成的区域被称为**grid area(网格区域)**
- 一个 grid 由 **行（rows）** 和 **列（columns）** 组成
    - 行：一组水平方向的元素
    - 列：一组垂直方向的元素

## 网格线
这是将grid分割的水平或垂直方向延伸的线条，包括grid的边界

## 网格轨道
**轨道（track）** 是任意两条平行网格线之间的空间。
- **行轨道（row track）**：两条水平行线之间的空间
- **列轨道（column track）**：两条垂直列线之间的空间

## 网格单元
**网格单元** 是 grid 中最小的空间，由一行和一列的交叉点定义。  
你可以把它想象成 **Excel 表格中的一个单元格**。


## 网格区域
**网格区域** 是由任意数量的网格线围成的整体空间，也就是说，它是由**多个 grid cell 组合而成的区域**。


## 基本示例

下面我们使用 **CSS Grid** 创建一个包含以下区域的网站布局：
- Navbar（导航栏）
- Ads（广告）
- Main（主内容）
- Aside（侧边栏）
- Footer（页脚）

### HTML 结构

创建一个父元素作为 **grid 容器**，它的所有子元素都会自动成为 **grid 项目（grid items）**：


```html
<main>
    <div class="navbar">
        Navbar
    </div>

    <div class="ads">
        Ads
    </div>

    <div class="main_content">
        Main
    </div>

    <div class="aside">
        Aside
    </div>

    <div class="footer">Footer</div>
</main>
```

### CSS：设置 Grid 容器

将容器的 `display` 属性设置为 `grid`：

```css
/* Grid 容器 */
main {
    display: grid;
}

/* Grid 项目 */
.navbar {}
.ads {}
.main_content {}
.aside  {}
.footer {}
```

### 使用 grid-template-areas 定义布局结构

```css
"Navbar Navbar Navbar"   ← 顶部导航栏
"Ads    Main   Aside"    ← 左广告 / 中间主内容 / 右侧边栏
"Footer Footer Footer"   ← 底部页脚
```

### CSS：定义 Grid 区域

`grid-template-areas` 用于建立 grid 的结构并为每个区域命名。  
然后通过 `grid-area`，将子元素“绑定”到对应的区域名称上。

```css
/* Grid 容器 */
main {
    display: grid;
    grid-template-areas:
        "Navbar  Navbar  Navbar"
        "Ads     Main    Aside"
        "Footer  Footer  Footer";
}

/* Grid 项目 */
.navbar       { grid-area: Navbar }
.ads          { grid-area: Ads }
.main_content { grid-area: Main }
.aside        { grid-area: Aside }
.footer       { grid-area: Footer }
```

### 最终效果

页面会按照我们定义的 grid 区域自动排布，结构清晰、可读性强，并且非常适合响应式设计。