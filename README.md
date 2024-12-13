# ADev Monads 🚀

**ADev Monads** is a lightweight functional utility library based on monads. It provides types and functions for working with structures like `Option`, `Maybe`, `Either`, and more, simplifying safe and composable data flows.

---

## ✨ Features

- ⚡ **Lightweight and Modular**: Designed for easy extension with new types.
- 🛠️ **TypeScript Supported**: Fully typed for development safety.
- 🌟 **Efficient**: Optimized implementations with no external dependencies.
- 💡 **Focused on Simplicity**: Easy-to-use utilities.

---

## 📦 Installation

Use npm or yarn to install the package:

```bash
npm install adev-monads
```

Or with yarn:

```bash
yarn add adev-monads
```

---

## 🚀 Quick Start

### 🧩 Working with `Option`

The `Option` type allows you to handle values that may be present (`some`) or absent (`none`).

```typescript
import { Option, isSome, isNone, map, getOrElse } from 'adev-monads';

const value: Option<number> = 42;

// Check if a value is present
if (isSome(value)) {
  console.log('Value is present:', value);
} else {
  console.log('No value');
}

// Transform the value if present
const transformed = map(value, (x) => x * 2);
console.log('Transformed:', getOrElse(transformed, 0));
```

### 🔮 Other Monads

Upcoming features:
- 🔗 **Maybe**: Similar to `Option`, with stricter FP semantics.
- 🔀 **Either**: Handling alternative flows (e.g., errors).
- ⏳ **Task**: Safe asynchronous operations.

---

## 📚 Complete API

### `Option`

#### 🛠️ Types
- `Option<T>`: Represents a `some` (present) or `none` (absent) value.

#### 🚦 Main Functions
- `isNone(option: Option<T>): boolean`: Returns `true` if the value is `none`.
- `isSome(option: Option<T>): boolean`: Returns `true` if the value is `some`.
- `map<T, U>(option: Option<T>, fn: (value: T) => U): Option<U>`: Applies a function to the value if present.
- `flatMap<T, U>(option: Option<T>, fn: (value: T) => Option<U>): Option<U>`: Similar to `map` but avoids nested values.
- `getOrElse<T>(option: Option<T>, defaultValue: T): T`: Gets the value or returns a default value.
- `filter<T>(option: Option<T>, predicate: (value: T) => boolean): Option<T>`: Filters the value based on a predicate.
- `fold<T, U, V>(option: Option<T>, ifNone: () => U, fn: (value: T) => V): U | V`: Handles both `some` and `none` cases.

---

## 🤝 Contributing

If you'd like to contribute to this project:

1. 🍴 Fork the repository.
2. 🌿 Create a branch for your feature: `git checkout -b feature/new-feature`.
3. ✨ Make the necessary changes and ensure tests pass.
4. 🔃 Submit a pull request.

---

## 📝 License

This project is licensed under the [MIT](LICENSE) license.

---

## 👨‍💻 Author

Developed by [Armando Dev](https://armandodev.vercel.app).

