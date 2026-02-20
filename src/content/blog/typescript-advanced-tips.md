---
title: 'TypeScript 高级技巧：提升代码质量'
description: 'TypeScript 不仅仅是类型检查工具。掌握这些高级技巧，让你的代码更安全、更易维护。'
pubDate: 2024-01-28
tags: ['TypeScript', 'JavaScript', '最佳实践']
---

TypeScript 已经成为现代前端开发的标准。但很多人只是使用了它的基础功能。本文分享一些高级技巧，帮助你写出更好的 TypeScript 代码。

## 1. 类型守卫和类型谓词

### 基础类型守卫

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: unknown) {
  if (isString(value)) {
    // TypeScript 知道这里 value 是 string
    console.log(value.toUpperCase());
  }
}
```

### 对象类型守卫

```typescript
interface User {
  name: string;
  email: string;
}

interface Admin {
  name: string;
  permissions: string[];
}

type Account = User | Admin;

function isAdmin(account: Account): account is Admin {
  return 'permissions' in account;
}

function handleAccount(account: Account) {
  if (isAdmin(account)) {
    account.permissions.forEach(p => console.log(p));
  } else {
    console.log(account.email);
  }
}
```

## 2. 泛型约束

### 基础约束

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log(arg.length);
}

logLength("hello");  // ✅
logLength([1, 2, 3]);  // ✅
logLength(123);  // ❌ Error: number 没有 length 属性
```

### 多重约束

```typescript
function getName<T extends { name: string }>(obj: T): string {
  return obj.name;
}

interface Person {
  name: string;
  age: number;
}

interface Animal {
  name: string;
  species: string;
}

getName<Person>({ name: "Alice", age: 30 });  // ✅
getName<Animal>({ name: "Bob", species: "Dog" });  // ✅
```

## 3. 条件类型

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type Result = NonNullable<string | null>;  // string

// 实际应用
type Flatten<T> = T extends Array<infer U> ? U : T;

type Flat1 = Flatten<string[][]>;  // string[]
type Flat2 = Flatten<string>;  // string
```

### 内置条件类型

```typescript
// 提取函数返回类型
type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;

async function fetchData() {
  return { id: 1, name: "Test" };
}

type Data = AsyncReturnType<typeof fetchData>;
// { id: number; name: string; }
```

## 4. 模板字面量类型

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<'click'>;  // 'onClick'
type MouseEvent = EventName<'mouse'>;  // 'onMouse'

// 实际应用：CSS 属性
type CssProperty<T extends string> = T;
type Margin = CssProperty<`margin-${'top' | 'bottom' | 'left' | 'right'}`>;
// 'margin-top' | 'margin-bottom' | 'margin-left' | 'margin-right'
```

## 5. 映射类型

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 自定义映射类型
type Modifiable<T> = {
  -readonly [P in keyof T]: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

### 高级映射类型

```typescript
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// {
//   getName: () => string;
//   getAge: () => number;
// }
```

## 6. 工具类型

### Partial 和 Required

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(id: number, fields: Partial<User>) {
  // fields 中所有属性都是可选的
  // ...
}

updateUser(1, { name: "New Name" });  // ✅
```

### Pick 和 Omit

```typescript
type UserPreview = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }

type CreateUser = Omit<User, 'id'>;
// { name: string; email: string; }
```

### Record

```typescript
type PageInfo = {
  title: string;
};

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {
  home: { title: "Home" },
  about: { title: "About" },
  contact: { title: "Contact" },
};
```

## 7. 装饰器（Decorator）

```typescript
function log<T>(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (this: any, ...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} returned`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(1, 2);
// 输出：
// Calling add with [1, 2]
// add returned 3
```

## 8. 类型推断

### ReturnType

```typescript
function createUser() {
  return {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
  };
}

type User = ReturnType<typeof createUser>;
// { id: number; name: string; email: string; }
```

### Parameters

```typescript
function updateUser(id: number, name: string, email: string): void {
  // ...
}

type UpdateUserParams = Parameters<typeof updateUser>;
// [number, string, string]
```

## 9. 品牌（Branded Types）

```typescript
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<number, 'UserId'>;
type PostId = Brand<number, 'PostId'>;

function getUserId(id: number): UserId {
  return id as UserId;
}

function getUser(id: UserId) {
  // ...
}

const userId = getUserId(123);
getUser(userId);  // ✅

const postId = 456 as PostId;
getUser(postId);  // ❌ Error: Type 'PostId' is not assignable to type 'UserId'
```

## 10. 类型守卫库

创建可复用的类型守卫：

```typescript
// types/guards.ts
export const is = {
  string: (value: unknown): value is string => typeof value === 'string',
  number: (value: unknown): value is number => typeof value === 'number',
  boolean: (value: unknown): value is boolean => typeof value === 'boolean',
  array: <T>(value: unknown, guard: (v: unknown) => v is T): value is T[] =>
    Array.isArray(value) && value.every(guard),
  object: (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null,
};

// 使用
function processValue(value: unknown) {
  if (is.string(value)) {
    value.toUpperCase();
  }
  if (is.array(value, is.number)) {
    value.reduce((a, b) => a + b, 0);
  }
}
```

## 最佳实践

1. **使用 strict 模式**
   ```json
   {
     "compilerOptions": {
       "strict": true
     }
   }
   ```

2. **避免 any**
   ```typescript
   // ❌ 不好
   function processData(data: any) { }

   // ✅ 好
   function processData(data: unknown) {
     if (isValidData(data)) {
       // 使用 data
     }
   }
   ```

3. **使用类型推断**
   ```typescript
   // ❌ 不必要的类型注解
   const name: string = "Alice";

   // ✅ 让 TypeScript 推断
   const name = "Alice";
   ```

4. **优先使用 interface 而不是 type**
   - interface 可以扩展
   - interface 可以合并
   - 更好的错误提示

## 总结

TypeScript 的高级特性可以帮助你：

- ✅ 编写更安全的代码
- ✅ 提高代码可维护性
- ✅ 减少运行时错误
- ✅ 改善开发体验

掌握这些技巧后，你会发现 TypeScript 不仅仅是类型检查工具，更是提升代码质量的强大武器。

推荐资源：
- [TypeScript 手册](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
