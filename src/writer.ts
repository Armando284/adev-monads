/**
 * Writer class represents a computation that produces a value along with a log.
 * This monad is useful for scenarios where you need to track a sequence of
 * messages or actions (e.g., logging, debugging) alongside the computation's result.
 *
 * @template T - The type of the value contained in the Writer.
 * @template W - The type of the log messages.
 */
export class Writer<T, W> {
  /**
   * Creates an instance of Writer.
   * @private
   * @param value The value to wrap in the Writer monad.
   * @param log The log associated with the computation.
   */
  private constructor (
    private readonly value: T,
    private readonly log: W[]
  ) {}

  /**
   * Initializes a Writer with a value and an optional initial log.
   * @param value The value to wrap in the Writer monad.
   * @param log An optional initial log array.
   * @returns A new Writer instance.
   */
  static of<T, W>(value: T, log: W[] = []): Writer<T, W> {
    return new Writer(value, log)
  }

  /**
   * Creates a Writer instance with a log message and no value.
   * @param message The log message to include.
   * @returns A new Writer instance containing the log message.
   */
  static tell<W>(message: W): Writer<null, W> {
    return new Writer(null, [message])
  }

  /**
   * Transforms the value inside the Writer using the provided function.
   * @param fn The function to apply to the value.
   * @returns A new Writer instance with the transformed value.
   */
  map<U>(fn: (value: T) => U): Writer<U, W> {
    const newValue = fn(this.value)
    return new Writer(newValue, this.log)
  }

  /**
   * Applies a function that returns a Writer, flattening the result.
   * @param fn A function that takes the value and returns a Writer.
   * @returns A new Writer instance combining the logs and the new value.
   */
  flatMap<U>(fn: (value: T) => Writer<U, W>): Writer<U, W> {
    const nextWriter = fn(this.value)
    const combinedLog = this.log.concat(nextWriter.log)
    return new Writer(nextWriter.value, combinedLog)
  }

  /**
   * Processes the value and log with the provided functions.
   * @param onValue A function to handle the value.
   * @param onLog An optional function to handle the log.
   * @returns The result of applying `onValue` to the value.
   */
  fold<U>(
    onValue: (value: T) => U,
    onLog: (log: W[]) => void = () => {}
  ): U {
    onLog(this.log)
    return onValue(this.value)
  }

  /**
   * Retrieves the value inside the Writer.
   * @returns The wrapped value.
   */
  getValue (): T {
    return this.value
  }

  /**
   * Retrieves the log associated with the Writer.
   * @returns The log array.
   */
  getLog (): W[] {
    return this.log
  }
}
