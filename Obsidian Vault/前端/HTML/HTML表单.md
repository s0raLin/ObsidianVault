表单的作用是接收信息并传输到服务器

## 创建表单
将输入信息的元素放到`<form>`标签内部,`<form>`有两个重要属性
* action：指定处理表单数据的程序或文档的地址
* method：告知服务器使用哪种请求方式

```html
<!DOCTYPE html>
<html>
  <head>
    <title>HTML Forms</title>
  </head>
  <body>
    <form action="[value]" method="post">
       Input elements
    </form>
  </body>
</html>
```

### 文本框(Text Fields)
使用`<input type="text">`创建文本输入框。文本输入框的默认宽度是 **20 个字符**。

<form action="[value]" method="[value]">
  <p>First Name:</p> 
  <input type="text" name="firstName">
  <p>Last Name:</p>
  <input type="text" name="lastName">
</form>

```html
<form action="[value]" method="[value]">
  <p>First Name:</p> 
  <input type="text" name="firstName">
  <p>Last Name:</p>
  <input type="text" name="lastName">
</form>
```

### 密码框(Password Field)
`<input type="password">`用于安全输入密码。在密码框中输入的字符会被**隐藏**，显示为黑点。

<form action="[value]" method="[value]">
  <p>Password:</p> 
  <input type="password" name="password">
</form>

```html
<form action="[value]" method="[value]">
  <p>Password:</p> 
  <input type="password" name="password">
</form>
```

### 单选按钮(Radio Buttons)
使用`<input type="radio">`创建单选按钮。

<form action="[value]" method="[value]">
  <input type="radio" name="language" value="english"> English
  <input type="radio" name="language" value="spanish"> Spanish
</form> 

```html
<form action="[value]" method="[value]">
  <input type="radio" name="language" value="english"> English
  <input type="radio" name="language" value="spanish"> Spanish
</form>  
```
### 复选框(Checkboxes)
一个选项不够，这时就可以使用复选框

<form action="[value]" method="[value]">
  <input type="checkbox" name="technique" value="computer">I have a computer
  <br>
  <input type="checkbox" name="technique" value="phone">I have a phone 
</form>

```html
<form action="[value]" method="[value]">
  <input type="checkbox" name="technique" value="computer">I have a computer
  <br>
  <input type="checkbox" name="technique" value="phone">I have a phone 
</form>
```

### 标签(Label)
`<label>`用于将文本和表单元素关联起来，这个标签不会直接显示

<form action="[value]" method="[value]">
  <label><input type="radio" name="language" value="english">English</label>
  <label><input type="radio" name="language" value="spanish">Spanish</label>
</form>

```html
<form action="[value]" method="[value]">
  <label><input type="radio" name="language" value="english">English</label>
  <label><input type="radio" name="language" value="spanish">Spanish</label>
</form>
```

- 使用 `<label>` 后，**点击文字或按钮本身都可以选中选项**
- 不使用 `<label>` 时，只能点击按钮本身
### 使用`for`属性的`<label>`
`<label>`有一个`for`属性，可以在不相邻的情况下关联表单元素

<form action="[value]" method="[value]">
    <input id="english" type="radio" name="language" value="english">
    <label for="english">English</label>
    <input id="spanish" type="radio" name="language" value="spanish">
    <label for="spanish">Spanish</label>
</form>

```html
<form action="[value]" method="[value]">
    <input id="english" type="radio" name="language" value="english">
    <label for="english">English</label>
    <input id="spanish" type="radio" name="language" value="spanish">
    <label for="spanish">Spanish</label>
</form>
```
- 给 `<input>` 添加 `id`
- 在 `<label>` 中使用 `for` 指向对应的 `id`

### 按钮(Buttons)
使用`<button type="submit">`定义提交按钮。信息收集完毕，通过按钮将数据发送给服务器，数据会被提交到`form`的`action`属性指定的地址

<form action="[value]" method="[value]">
  <button type="submit">Submit</button>
</form>

```html
<form action="[value]" method="[value]">
  <button type="submit">Submit</button>
</form>
```
