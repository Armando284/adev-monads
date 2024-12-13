// writer.test.ts
import { Writer } from '../index'

describe('Writer class', () => {
  test('should initialize with value and log', () => {
    const writer = Writer.of(42, ['initial log'])
    expect(writer.getValue()).toBe(42)
    expect(writer.getLog()).toEqual(['initial log'])
  })

  test('should create a writer with log only using tell', () => {
    const writer = Writer.tell('log message')
    expect(writer.getValue()).toBeNull()
    expect(writer.getLog()).toEqual(['log message'])
  })

  test('should apply map and transform value', () => {
    const writer = Writer.of(2, ['start'])
    const newWriter = writer.map(x => x * 2)

    expect(newWriter.getValue()).toBe(4)
    expect(newWriter.getLog()).toEqual(['start'])
  })

  test('should apply flatMap and combine logs', () => {
    const writer1 = Writer.of(2, ['log 1'])
    const writer2 = writer1.flatMap(x => Writer.of(x * 2, ['log 2']))

    expect(writer2.getValue()).toBe(4)
    expect(writer2.getLog()).toEqual(['log 1', 'log 2'])
  })

  test('should fold value and log separately', () => {
    const writer = Writer.of(10, ['step 1', 'step 2'])
    const value = writer.fold(
      value => value + 5,
      log => console.log('Log:', log)
    )

    expect(value).toBe(15) // value + 5
  })

  test('should handle Writer of null value', () => {
    const writer = Writer.tell('log message')
    expect(writer.getValue()).toBeNull()
    expect(writer.getLog()).toEqual(['log message'])
  })

  test('should concatenate logs properly using flatMap', () => {
    const writer1 = Writer.of(5, ['log 1'])
    const writer2 = writer1.flatMap(value =>
      Writer.of(value + 3, ['log 2'])
    )
    const writer3 = writer2.flatMap(value =>
      Writer.of(value * 2, ['log 3'])
    )

    expect(writer3.getValue()).toBe(16) // (5 + 3) * 2
    expect(writer3.getLog()).toEqual(['log 1', 'log 2', 'log 3'])
  })
})
