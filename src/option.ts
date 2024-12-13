/**
 * Option class representing a value that can either be 'some' (a value is present)
 * or 'none' (no value, represented as null or undefined).
 *
 * @template T - The type of the value contained in the Option.
 */
export class Option<T> {
  private constructor (private readonly value: T | null | undefined) {}

  /**
   * Creates an Option instance with a value.
   * If the value is null or undefined, it returns a None instance.
   *
   * @param value - The value to wrap in an Option.
   */
  static some<T>(value: T): Option<T> {
    return new Option(value)
  }

  /**
   * Creates a None instance of Option.
   */
  static none<T>(): Option<T> {
    return new Option<T>(null)
  }

  /**
   * Checks if the Option is 'none' (null or undefined).
   */
  isNone (): boolean {
    return this.value === null || this.value === undefined
  }

  /**
   * Checks if the Option is 'some' (a value is present).
   */
  isSome (): boolean {
    return !this.isNone()
  }

  /**
   * Maps the value inside the Option to a new Option using the provided function.
   * If the Option is 'none', it returns 'none'.
   *
   * @template U - The type of the transformed value.
   * @param fn - A function to transform the value if it's 'some'.
   */
  map<U>(fn: (value: T) => U): Option<U> {
    return this.isNone() ? Option.none<U>() : Option.some(fn(this.value as T))
  }

  /**
   * Applies a function that returns another Option, avoiding nested Option<Option<T>>.
   * If the original Option is 'none', it returns 'none'.
   *
   * @template U - The type of the new Option.
   * @param fn - A function that returns another Option.
   */
  flatMap<U>(fn: (value: T) => Option<U>): Option<U> {
    return this.isNone() ? Option.none<U>() : fn(this.value as T)
  }

  /**
   * Returns the value inside the Option or a default value if it's 'none'.
   *
   * @param defaultValue - The default value to return if the Option is 'none'.
   */
  getOrElse (defaultValue: T): T {
    return this.isNone() ? defaultValue : (this.value as T)
  }

  /**
   * Filters the Option based on a predicate function. Returns 'none' if the predicate fails
   * or if the Option is already 'none'.
   *
   * @param predicate - A function that returns true to keep the value, false to discard it.
   */
  filter (predicate: (value: T) => boolean): Option<T> {
    return this.isNone() || !predicate(this.value as T) ? Option.none<T>() : this
  }

  /**
   * Folds the Option: returns `ifNone` if the Option is 'none', or applies the function
   * to the value if it exists.
   *
   * @template U - The return type when the Option is 'none'.
   * @template V - The return type when the Option is 'some'.
   * @param ifNone - A function that returns a value if the Option is 'none'.
   * @param fn - A function to apply to the value if it's 'some'.
   */
  fold<U, V>(ifNone: () => U, fn: (value: T) => V): U | V {
    return this.isNone() ? ifNone() : fn(this.value as T)
  }
}
