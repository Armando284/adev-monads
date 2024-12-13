/**
 * Option type representing a value that can either be 'some' (a value is present)
 * or 'none' (no value, represented as null or undefined).
 *
 * @template T - The type of the value contained in the Option.
 */
export type Option<T> = T | null | undefined

/**
 * Checks if the Option is 'none' (null or undefined).
 *
 * @template T - The type of the value.
 * @param {Option<T>} option - The Option to check.
 * @returns {boolean} - True if the option is none (null or undefined), false otherwise.
 */
export function isNone<T> (option: Option<T>): boolean {
  return option === null || option === undefined
}

/**
 * Checks if the Option is 'some' (a value is present).
 *
 * @template T - The type of the value.
 * @param {Option<T>} option - The Option to check.
 * @returns {boolean} - True if the option contains a value, false otherwise.
 */
export function isSome<T> (option: Option<T>): boolean {
  return !isNone(option)
}

/**
 * Maps the value inside the Option to a new Option using the provided function.
 * If the Option is 'none', it returns 'none'.
 *
 * @template T - The type of the original value.
 * @template U - The type of the transformed value.
 * @param {Option<T>} option - The Option to map over.
 * @param {function(T): U} fn - A function to transform the value if it's 'some'.
 * @returns {Option<U>} - A new Option containing the transformed value or 'none'.
 */
export function map<T, U> (option: Option<T>, fn: (value: T) => U): Option<U> {
  return isNone(option) ? null : fn(option as T)
}

/**
 * Applies a function that returns another Option, avoiding nested Option<Option<T>>.
 * If the original Option is 'none', it returns 'none'.
 *
 * @template T - The type of the original value.
 * @template U - The type of the new Option.
 * @param {Option<T>} option - The Option to flatMap over.
 * @param {function(T): Option<U>} fn - A function that returns another Option.
 * @returns {Option<U>} - A new Option or 'none'.
 */
export function flatMap<T, U> (option: Option<T>, fn: (value: T) => Option<U>): Option<U> {
  return isNone(option) ? null : fn(option as T)
}

/**
 * Returns the value inside the Option or a default value if it's 'none'.
 *
 * @template T - The type of the value.
 * @param {Option<T>} option - The Option to retrieve the value from.
 * @param {T} defaultValue - The default value to return if the Option is 'none'.
 * @returns {T} - The value inside the Option or the default value.
 */
export function getOrElse<T> (option: Option<T>, defaultValue: T): T {
  return isNone(option) ? defaultValue : (option as T)
}

/**
 * Filters the Option based on a predicate function. Returns 'none' if the predicate fails
 * or if the Option is already 'none'.
 *
 * @template T - The type of the value.
 * @param {Option<T>} option - The Option to filter.
 * @param {function(T): boolean} predicate - A function that returns true to keep the value, false to discard it.
 * @returns {Option<T>} - The original Option if the predicate passes, otherwise 'none'.
 */
export function filter<T> (option: Option<T>, predicate: (value: T) => boolean): Option<T> {
  return isNone(option) || !predicate(option as T) ? null : option
}

/**
 * Folds the Option: returns `ifNone` if the Option is 'none', or applies the function
 * to the value if it exists.
 *
 * @template T - The type of the value.
 * @template U - The return type when the Option is 'none'.
 * @template V - The return type when the Option is 'some'.
 * @param {Option<T>} option - The Option to fold.
 * @param {function(): U} ifNone - A function that returns a value if the Option is 'none'.
 * @param {function(T): V} fn - A function to apply to the value if it's 'some'.
 * @returns {U | V} - The result of `ifNone` or the result of `fn`.
 */
export function fold<T, U, V> (option: Option<T>, ifNone: () => U, fn: (value: T) => V): U | V {
  return isNone(option) ? ifNone() : fn(option as T)
}
