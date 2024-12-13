# ADev Monads 🚀

**ADev Monads** es una librería ligera de utilidades funcionales basada en monadas. Proporciona tipos y funciones para trabajar con estructuras como `Option`, `Maybe`, `Either`, entre otras, facilitando flujos de datos seguros y componibles.

---

## ✨ Características

- ⚡ **Ligera y Modular**: Diseñada para una fácil extensión con nuevos tipos.
- 🛠️ **Compatibilidad con TypeScript**: Totalmente tipada para mayor seguridad en el desarrollo.
- 🌟 **Eficiente**: Implementaciones optimizadas sin dependencias externas.
- 🔦 **Enfoque en Simplicidad**: Utilidades fáciles de usar.

---

## 📦 Instalación

Usa npm o yarn para instalar el paquete:

```bash
npm install adev-monads
```

O con yarn:

```bash
yarn add adev-monads
```

---

## 🚀 Rápido Comienzo

### 🧹 Trabajando con `Option`

El tipo `Option` te permite manejar valores que pueden estar presentes (`some`) o ausentes (`none`).

```typescript
import { Option } from 'adev-monads';

const value = Option.some(42);

// Verificar si un valor está presente
if (value.isSome()) {
  console.log('Valor presente:', value);
} else {
  console.log('Sin valor');
}

// Transformar el valor si está presente
const transformed = value.map((x) => x * 2);
console.log('Transformado:', transformed.getOrElse(0));
```

---

## 📚 API Completo

### `Option`

#### 🛠️ Constructor

- `Option.some<T>(value: T): Option<T>`: Crea una instancia de `Option` con un valor presente.
- `Option.none<T>(): Option<T>`: Crea una instancia de `Option` sin valor (ausente).

#### 🚨 Métodos Principales

- `isNone(): boolean`: Retorna `true` si el valor es `none`.
- `isSome(): boolean`: Retorna `true` si el valor es `some`.
- `map<U>(fn: (value: T) => U): Option<U>`: Aplica una función al valor si está presente.
- `flatMap<U>(fn: (value: T) => Option<U>): Option<U>`: Similar a `map`, pero evita valores anidados.
- `getOrElse(defaultValue: T): T`: Obtiene el valor o retorna un valor por defecto.
- `filter(predicate: (value: T) => boolean): Option<T>`: Filtra el valor basado en un predicado.
- `fold<U, V>(ifNone: () => U, fn: (value: T) => V): U | V`: Maneja ambos casos (`some` y `none`).

#### Ejemplo Completo

```typescript
const option = Option.some(10);
const result = option
  .filter((x) => x > 5)
  .map((x) => x * 2)
  .getOrElse(0);

console.log(result); // 20
```

---

## 🤝 Contribuir

Si deseas contribuir a este proyecto:

1. 🍷 Haz un fork del repositorio.
2. 🌱 Crea una rama para tu función: `git checkout -b feature/nueva-funcion`.
3. ✨ Realiza los cambios necesarios y asegúrate de que las pruebas pasen.
4. 🔄 Envía un pull request.

---

## 🗒 Licencia

Este proyecto está licenciado bajo la licencia [MIT](LICENSE).

---

## 👨‍💻 Autor

Desarrollado por [Armando Dev](https://armandodev.vercel.app).

