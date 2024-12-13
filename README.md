# ADev Monads 🚀

**ADev Monads** is a lightweight functional utility library based on monads. It provides types and functions to work with structures such as `Option`, `Maybe`, `Either`, and others, making data flows safer and composable.

---

## ✨ Features

- ⚡ **Lightweight and Modular**: Designed for easy extension with new types.
- 🛠️ **TypeScript Support**: Fully typed for greater development safety.
- 🌟 **Efficient**: Optimized implementations with no external dependencies.
- 🔦 **Focus on Simplicity**: Easy-to-use utilities.

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

### 🧹 Working with `Option`

The `Option` type allows you to handle values that may be present (`some`) or absent (`none`).

```typescript
import { Option } from 'adev-monads';

const value = Option.some(42);

// Check if a value is present
if (value.isSome()) {
  console.log('Value present:', value);
} else {
  console.log('No value');
}

// Transform the value if present
const transformed = value.map((x) => x * 2);
console.log('Transformed:', transformed.getOrElse(0));
```

---

## 📚 Full API

### `Option`

#### 🛠️ Constructor

- `Option.some<T>(value: T): Option<T>`: Creates an `Option` instance with a present value.
- `Option.none<T>(): Option<T>`: Creates an `Option` instance without a value (absent).

#### 🚨 Main Methods

- `isNone(): boolean`: Returns `true` if the value is `none`.
- `isSome(): boolean`: Returns `true` if the value is `some`.
- `map<U>(fn: (value: T) => U): Option<U>`: Applies a function to the value if present.
- `flatMap<U>(fn: (value: T) => Option<U>): Option<U>`: Similar to `map`, but avoids nested values.
- `getOrElse(defaultValue: T): T`: Gets the value or returns a default value.
- `filter(predicate: (value: T) => boolean): Option<T>`: Filters the value based on a predicate.
- `fold<U, V>(ifNone: () => U, fn: (value: T) => V): U | V`: Handles both cases (`some` and `none`).

#### Full Example

```typescript
const option = Option.some(10);
const result = option
  .filter((x) => x > 5)
  .map((x) => x * 2)
  .getOrElse(0);

console.log(result); // 20
```

---

### 📝 `Writer` Monad

The `Writer` monad represents a computation that produces a value along with a log. It's useful in scenarios where you need to track a sequence of messages or actions (e.g., logging, debugging) alongside the result of the computation.

#### Constructor

- `Writer.of<T, W>(value: T, log: W[] = []): Writer<T, W>`: Creates an instance of `Writer` with a value and an optional log.
- `Writer.tell<W>(message: W): Writer<null, W>`: Creates a `Writer` instance with a log message and no value.

#### Main Methods

- `map<U>(fn: (value: T) => U): Writer<U, W>`: Transforms the value inside the `Writer` using the provided function.
- `flatMap<U>(fn: (value: T) => Writer<U, W>): Writer<U, W>`: Similar to `map`, but the function returns a new `Writer`, combining logs.
- `fold<U>(onValue: (value: T) => U, onLog: (log: W[]) => void): U`: Processes both the value and the log with the provided functions.
- `getValue(): T`: Retrieves the value inside the `Writer`.
- `getLog(): W[]`: Retrieves the log associated with the `Writer`.

#### Example

```typescript
import { Writer } from 'adev-monads';

const writer = Writer.of(42, ['initial log']);
const newWriter = writer.map(x => x * 2);
const finalWriter = newWriter.flatMap(x => Writer.of(x + 5, ['calculation complete']));

console.log(finalWriter.getValue()); // 89
console.log(finalWriter.getLog()); // ['initial log', 'calculation complete']
```

---

## 🤝 Contributing

If you want to contribute to this project:

1. 🍷 Fork the repository.
2. 🌱 Create a branch for your feature: `git checkout -b feature/new-feature`.
3. ✨ Make the necessary changes and ensure tests pass.
4. 🔄 Submit a pull request.

---

## 🗒 License

This project is licensed under the [MIT](LICENSE) license.

---

## 👨‍💻 Author

Developed by [Armando Dev](https://armandodev.vercel.app).