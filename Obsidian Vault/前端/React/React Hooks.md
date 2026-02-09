**类组件** 中状态(state)和生命周期方法
* `state`用来存储动态数据
* 生命周期方法用于控制组件在不同阶段的行为
* 通过`this`关键字访问组件的属性和方法

**函数组件**并不使用`this`
* 状态通过`useState`Hook来管理
* 生命周期相关的逻辑可以通过`useEffect`实现
在类组件中，需要使用
* `componentDidMount`
* `componentDidUpdate`
* `componentWillUnmount`
分别处理组件的挂载、更新和卸载

## 基础Hooks
### useState
允许组件声明和管理状态，用于实现动态渲染和用户交互
* 在声明时通过参数指定初始值
* 状态不能被直接修改，必须通过对应的`setState`函数更新

```js
const [state, setState] = useState(initialState);
```
代码说明:
* `state`: 当前状态值
* `setState`: 用于更新状态的函数
* `initialState`: 初始状态

### useEffect
用于管理组件的生命周期的不同阶段。每次渲染后执行
* 获取数据
* 订阅外部事件
* 在组件卸载时清理资源
这些操作被称为**副作用**

### useRef
提供创建可变引用对象的方式，该对象在组件的多次渲染之间保持不变，并且**不会触发重新渲染**
常见用途:
* 直接访问DOM元素
* 在多次渲染之间保存值
非常适合用于DOM操作或存储不影响UI的数据

### useReducer
用于管理更复杂的状态逻辑，是`useState`的替代方案
* 状态包含多个子状态
* 状态更新逻辑复杂
* 新状态依赖于旧状态

当状态变化逻辑清晰但步骤较多时，`useReducer`或让代码结构更清楚

### useMemo
用于在多次渲染之间缓存计算结果，这个过程称为**记忆化(memoization)**

适合场景
* 计算开销较大的操作
* 计算结果依赖特定输入
它可以避免不必要的重复计算，从而提升性能

### useCallback
用于避免在每次渲染时都重新创建回调函数
常见用途:
* 将回调函数传递给子组件
* 防止子组件因为父组件重新渲染而产生不必要的重新渲染

## 自定义Hooks(Custom Hooks)
是你自己定义的Hooks,用来封装可复用的逻辑
特点:
* 命名使用`use`开头(如`useCustomHook`)
* 可以使用其他的Hooks
* 本质上是普通函数
自定义Hooks
* 可以接收参数
* 可以返回值
* 用于抽离和共享复杂逻辑
可以提升代码的可读性和复用性

## Hooks的规则

### 只能在顶层调用Hooks
Hooks必须在函数组件的最顶层调用，不能写在:
* 条件语句中
* 循环中
* 嵌套函数中

#### 错误示例:
```js
useEffect(() => {
  if (count > 5) {
    useEffect(() => {
      console.log('count > 5');
    }, [count]);
  }
}, [count]);
```
这里在条件中调用了`useEffect`，会导致Hook调用顺序不一致，从而产生不可预测的行为

#### 错误示例:
```js
useEffect(() => {
	const.log(`count: ${count}`);
});
```
`useEffect` 在组件顶层调用，确保每次渲染时 Hooks 的调用顺序一致。


### 只能在函数组件或自定义Hooks中调用Hooks
Hooks 不能在普通 JavaScript 函数中使用

#### 自定义Hook示例
```js
function useFetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      setData(await res.json());
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading };
}
```

说明:
- 自定义 Hooks 内可以使用其他 Hooks
- Hooks 不能随意写在 `.js` 文件的普通函数中

### Hooks 使用规则总结

- 只在组件顶层调用 Hooks
- 只在函数组件中调用 Hooks
- 只在自定义 Hooks 中调用 Hooks

不遵守这些规则，可能会导致 React 应用出现异常或难以排查的问题。

