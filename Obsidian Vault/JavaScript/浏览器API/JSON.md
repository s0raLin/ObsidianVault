## 使用 JavaScript 进行 JSON HTTP 请求

JavaScript 提供了非常强大的模块和方法来进行 HTTP 请求。这些模块可以用来向服务器端资源发送数据或从中接收数据。  
JSON 通常用于从 Web 服务器读取数据并将其显示在网页上。  


---

## JSON 简介


* JSON（JavaScript Object Notation，JavaScript 对象表示法）是一种轻量级的数据交换格式。  
* * JSON 的语法格式与 JavaScript 对象非常相似，JavaScript 程序可以轻易地将 JSON 数据转换为 JavaScript 对象。  
* JSON 是一种使用 JavaScript 对象表示法编写的纯文本格式，用于在计算机之间传输数据，并且与编程语言无关。

### JSON 的基本语法示例：

```js
{
   "book": [
      {
         "id": "01",
         "language": "Java",
         "edition": "third",
         "author": "Herbert Schildt"
      },
      {
         "id": "07",
         "language": "C++",
         "edition": "second",
         "author": "E.Balagurusamy"
      }
   ]
}
```
---

## JSON 的使用方式

使用 JavaScript 存储 JSON 数据，并将其输出到网页上。

### 示例 JSON 数据：

```js
{
  "teacher" : [
    { 
      "teachersname" : "John",
      "born" : "1979"
    },
    { 
      "teachersname" : "Joe",
      "born" : "1983" 
    },
    { 
      "teachersname" : "Jenny",
      "born" : "1991"
    }
  ]
}
```

---

## 第一步：在 `displayTeachers()` 函数中定义 JSON 数据

```js
function displayTeachers() {
        
    let data = {
        "teachers" : [
            { 
                "teachersname" : "John",
                "born" : "1979"
            },
            { 
                "teachersname" : "Joe",
                "born" : "1983" 
            },
            { 
                "teachersname" : "Jenny",
                "born" : "1991"
            }
        ]
    }
}
```

### 代码说明
- 定义了一个 `displayTeachers` 函数
- 在函数内部声明了一个 `data` 变量，用来存储 JSON 数据
- `teachers` 是一个数组，数组中包含多个教师对象

---

## 第二步：创建用于显示的 HTML 字符串

```js
let output = "<h1>Teachers</h1>";
output += "<ul>";
```

### 代码说明

- 使用字符串的方式动态生成 HTML 内容
- `<h1>` 用于标题
- `<ul>` 用于无序列表的开始标签

---

## 第三步：遍历 JSON 数据

```js
for (let i in data.teachers) {
    output += "<li>" + data.teachers[i].teachersname +
              " (Born: " + data.teachers[i].born + ")</li>";
}

output += "</ul>";
```

### 代码说明

- 使用 `for...in` 循环遍历 `teachers` 数组
- 每个教师生成一个 `<li>` 列表项
- 显示教师姓名和出生年份

---

## 第四步：将结果输出到指定 HTML 元素

```js
document.getElementById("teachersList").innerHTML = output;
```
### 代码说明

- 通过 `getElementById` 获取 `id="teachersList"` 的元素
- 使用 `innerHTML` 将生成的 HTML 内容插入页面

---

## 第五步：页面加载完成后执行函数

```js
window.onload = displayTeachers;
```

### 代码说明
- 当页面加载完成后自动执行 `displayTeachers()` 函数

---

## 完整示例代码
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON</title>
</head>
<body>
    <script>
        function displayTeachers() {
            let data = {
                "teachers" : [
                    { "teachersname" : "John", "born" : "1979" },
                    { "teachersname" : "Joe", "born" : "1983" },
                    { "teachersname" : "Jenny", "born" : "1991" }
                ]
            };

            let output = "<h1>Teachers</h1>";
            output += "<ul>";

            for (let i in data.teachers) {
                output += "<li>" + data.teachers[i].teachersname +
                          " (Born: " + data.teachers[i].born + ")</li>";
            }

            output += "</ul>";

            document.getElementById("teachersList").innerHTML = output;
        }

        window.onload = displayTeachers;
    </script>

    <div id="teachersList"></div>
</body>
</html>
```
### 代码输出结果
![[teachers.png]]

---

## JSON HTTP 请求

如前所述，JSON 通常用于从 Web 服务器读取数据并显示在网页上。  
在本节中，你将学习如何使用 `XMLHttpRequest` 读取 JSON 数据。

### 示例代码：

```js
function requestListener () {
  console.log(this.responseText);
}

const request = new XMLHttpRequest();
request.addEventListener("load", requestListener);
request.open("GET", "https://randomuser.me/api/");
request.send();
```
### 代码说明

- 创建一个 `XMLHttpRequest` 对象
- 使用 `GET` 方法从 API 获取 JSON 数据
- `requestListener` 用于监听请求完成事件
- `responseText` 包含服务器返回的 JSON 数据

---

### 获取到的 JSON 数据

浏览器开发者工具中可以看到返回的 JSON 数据结构。

> **可以用Firefox查看JSON数据**，  
> Firefox 会自动将 JSON 数据格式化为可读的结构。
![[Firefox_JSON.png]]