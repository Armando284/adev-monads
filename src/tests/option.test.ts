import { Option } from '../index'

describe('Option Monad Tests', () => {
  describe('isNone', () => {
    it('should return true for None', () => {
      const none = Option.none()
      expect(none.isNone()).toBe(true)
    })

    it('should return false for Some', () => {
      const some = Option.some(42)
      expect(some.isNone()).toBe(false)
    })
  })

  describe('isSome', () => {
    it('should return false for None', () => {
      const none = Option.none()
      expect(none.isSome()).toBe(false)
    })

    it('should return true for Some', () => {
      const some = Option.some(42)
      expect(some.isSome()).toBe(true)
    })
  })

  describe('map', () => {
    it('should apply the function to the value if Some', () => {
      const some = Option.some(10)
      const result = some.map((x) => x * 2)
      expect(result.getOrElse(0)).toBe(20)
    })

    it('should return None if the Option is None', () => {
      const none = Option.none<number>()
      const result = none.map((x) => x * 2)
      expect(result.isNone()).toBe(true)
    })
  })

  describe('flatMap', () => {
    it('should apply the function and flatten the result if Some', () => {
      const some = Option.some(10)
      const result = some.flatMap((x) => Option.some(x * 2))
      expect(result.getOrElse(0)).toBe(20)
    })

    it('should return None if the Option is None', () => {
      const none = Option.none<number>()
      const result = none.flatMap((x) => Option.some(x * 2))
      expect(result.isNone()).toBe(true)
    })
  })

  describe('getOrElse', () => {
    it('should return the value if Some', () => {
      const some = Option.some(10)
      expect(some.getOrElse(0)).toBe(10)
    })

    it('should return the default value if None', () => {
      const none = Option.none<number>()
      expect(none.getOrElse(0)).toBe(0)
    })
  })

  describe('filter', () => {
    it('should return the value if it passes the predicate', () => {
      const some = Option.some(10)
      const result = some.filter((x) => x > 5)
      expect(result.getOrElse(0)).toBe(10)
    })

    it('should return None if it does not pass the predicate', () => {
      const some = Option.some(10)
      const result = some.filter((x) => x < 5)
      expect(result.isNone()).toBe(true)
    })

    it('should return None if the Option is None', () => {
      const none = Option.none<number>()
      const result = none.filter((x) => x > 5)
      expect(result.isNone()).toBe(true)
    })
  })

  describe('fold', () => {
    it('should apply the `ifNone` function if None', () => {
      const none = Option.none<number>()
      const result = none.fold(() => 'default', (x) => x.toString())
      expect(result).toBe('default')
    })

    it('should apply the function to the value if Some', () => {
      const some = Option.some(10)
      const result = some.fold(() => 'default', (x) => x * 2)
      expect(result).toBe(20)
    })
  })
})
