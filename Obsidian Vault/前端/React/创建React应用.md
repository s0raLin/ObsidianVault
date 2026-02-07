## 准备
确保安装了pnpm
```bash
paru -S pnpm
```

## 创建新项目

```bash
pnpm create vite [应用名]
```


然后使用以下命令运行项目
```bash
pnpm dev
```

## 项目结构
![[React项目结构.png]]
* 项目中的 **所有 JS 和 CSS 文件都必须放在 src 文件夹中**，否则在项目重新构建（rebuild）时不会被处理。  
	这是由于 webpack 的优化机制：为了更快的重新构建，它 **只处理 src 文件夹中的内容**。

## 构建
当一个React应用开发完成后，我们可以通过运行:
```bash
pnpm build
```
来启动打包过程


**package.json** 定义了项目的基本信息，例如：

- 项目名称
- 版本号
- 依赖的最低版本
- 以及其他配置
