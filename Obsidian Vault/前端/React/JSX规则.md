## 单一根元素
每个JSX组件必须只有一个根元素.也就是说不能直接返回多个并列的元素

**原因：** 该规则可以保证组件结构的一致性，并简化渲染流程。React 需要一个单一的入口点，才能高效地对界面变化进行协调（reconciliation）。


### 错误示例
```jsx
const InvalidComponent = () => {
	return (
		<h1>Hello</h1>
		<p>JSX Rules</p>
	);
}
```

解决方法是使用一个父元素将它们包裹起来：
```jsx
const InvalidComponent = () => {
	return (
		<div>
			<h1>Hello</h1>
			<p>JSX Rules</p>
		</div>
	);
}
```
也可以使用 `<>` 和 `</>`

## className规则
在JSX中使用className,而不是class

**原因：** `class` 是 JavaScript 的保留关键字，为避免冲突，JSX 使用 `className`。遵循这一规则可以保证代码符合 React 的语法规范，并防止潜在错误。

### 使用className而不是class
```jsx
// 使用 className 而不是 class

const StyledDiv = () => {
  return <div className="styled-container">Styled Content</div>;
};
```

## 所有标签必须关闭
所有 JSX 标签都必须关闭，包括自闭合标签。`</>`

**原因：** 统一的标签关闭方式可以保证组件结构清晰、可预测，也能避免在使用某些 React 特性或分析 JSX 的工具时出现问题。

### 正确关闭自闭合标签的 JSX

```jsx
const SelfClosingComponent = () => {
  return (
    <div>
      <img src="example.jpg" alt="Example" />
      <input type="text" />
    </div>
  );
};
```

### 驼峰命名
JSX中属性名、事件处理函数和变量名应该使用camelCase(驼峰命名)

**原因:** 驼峰命名是 JavaScript 和 React 的通用约定，有助于保持代码风格统一，提高可读性。


### 使用驼峰命名的 JSX 属性和事件处理函数
```jsx

const CamelCaseComponent = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <button onClick={handleClick} disabled={false}>
      Click Me
    </button>
  );
};
```


## 表达式插值

使用`{}`可以在JSX中嵌入JavaScript表达式

**原因：** 表达式插值可以让 JSX 渲染动态内容，方便在界面中插入变量或函数返回值。

### JSX 中使用表达式插值
```jsx

const user = { name: 'John', age: 25 };

const UserInfo = () => {
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
};

```