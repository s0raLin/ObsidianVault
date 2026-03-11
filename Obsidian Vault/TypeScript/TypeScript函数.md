TypeScript 中函数的重要性

在 TypeScript 中，**函数** 是提升代码**可读性**、**可维护性**和**可复用性**的关键要素。函数允许开发者将程序拆分成逻辑清晰、职责单一的代码块，从而大大简化代码的理解和维护工作。

### 提升代码可读性

通过使用描述性强的函数名并配合良好的注释，开发者可以将一系列相关操作组织在一起，使代码意图一目了然。命名良好的函数能让其他开发者（或未来的自己）快速理解某段代码的具体作用，而无需深入阅读实现细节。

### 减少重复代码（DRY 原则）

将可复用的逻辑封装成函数，可以避免在多个地方编写相同的代码。这样不仅节省开发时间，还能保证整个程序行为的一致性。一旦发现 bug 或需要优化，只需修改函数定义一处，所有调用该函数的地方都会自动更新，极大降低了维护成本。

### 函数声明与基本语法

函数声明是编程中最基础的概念之一，它允许我们定义可多次执行的代码块。

#### 命名函数声明

命名函数拥有明确的名称，且在代码中可以**先调用后声明**（得益于函数声明提升）。

```ts
function add(x: number, y: number): number {
    return x + y;
}
```

#### 匿名函数声明（函数表达式）

匿名函数没有名称，通常需要先定义再使用，常赋值给变量。

```ts
const multiply = function(x: number, y: number): number {
    return x * y;
};
```

### this 关键字

在 TypeScript 中，`this` 的类型会根据函数**调用方式**进行推断。为了更严格地控制 this 的类型，可以在函数参数列表的**第一个位置**显式声明 this 参数（这是一个假参数，仅用于类型检查）。

```ts
interface Person {
    name: string;
}

function greet(this: Person, message: string): string {
    return `${this.name} 说：${message}`;
}
```

### 函数签名

函数签名描述了一个函数的**参数类型**和**返回值类型**，理解函数签名有助于确保函数被正确调用。

```ts
function addNumbers(num1: number, num2: number): number {
    return num1 + num2;
}
```

### 返回类型

显式指定返回类型可以帮助在开发阶段尽早发现错误，同时提升代码的可读性。

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

### 参数类型

通过为参数添加类型注解，可以在编译期捕获类型错误，使代码更加健壮。

```ts
function addNumbers(num1: number, num2: number): number {
    return num1 + num2;
}
```

### 可选参数

使用 `?` 标记的参数可以省略不传。

```ts
function greet(name?: string) {
    console.log("Hello, " + (name || "Anonymous") + "!");
}
```

### 默认参数

可以为参数设置默认值，未传参时使用默认值。

```ts
function greet(name: string = "Anonymous") {
    console.log("Hello, " + name + "!");
}
```

### 类型注解

类型注解是 TypeScript 函数类型安全的核心。

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

### 类型别名（Type Alias）

对于复杂的函数类型，使用类型别名可以显著提高代码的可读性。

```ts
type AddFunction = (a: number, b: number) => number;

const add: AddFunction = (a, b) => a + b;
```

### 匿名函数与函数表达式

匿名函数通常不带名字，函数表达式可以是匿名的，也可以赋值给变量。

```ts
// 匿名函数表达式
const myFunction = function () {
    console.log("这是一个匿名函数");
};

// 箭头函数（推荐在大多数场景使用）
const myArrowFunction = () => {
    console.log("这是一个箭头函数");
};
```

总结：TypeScript 中的函数不仅仅是执行代码的工具，更是实现**类型安全**、**模块化**和**高质量代码**的重要手段。合理使用命名函数、箭头函数、可选/默认参数、类型别名以及显式 this 类型声明，能让你的代码更加健壮、可维护且易于团队协作。