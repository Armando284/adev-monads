import { Option, isNone, isSome, map, flatMap, getOrElse, filter, fold } from '../index'

describe('Option Monad Tests', () => {
  describe('isNone', () => {
    it('should return true for null', () => {
      expect(isNone(null)).toBe(true)
    })

    it('should return true for undefined', () => {
      expect(isNone(undefined)).toBe(true)
    })

    it('should return false for a value', () => {
      expect(isNone(42)).toBe(false)
    })
  })

  describe('isSome', () => {
    it('should return false for null', () => {
      expect(isSome(null)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(isSome(undefined)).toBe(false)
    })

    it('should return true for a value', () => {
      expect(isSome(42)).toBe(true)
    })
  })

  describe('map', () => {
    it('should apply the function to the value if some', () => {
      const result = map(10, (x) => x * 2)
      expect(result).toBe(20)
    })

    it('should return none if the option is none', () => {
      const result = map(null as Option<number>, (x) => x * 2)
      expect(result).toBe(null)
    })
  })

  describe('flatMap', () => {
    it('should apply the function and flatten the result if some', () => {
      const result = flatMap(10, (x) => x * 2)
      expect(result).toBe(20)
    })

    it('should return none if the option is none', () => {
      const result = flatMap(null as Option<number>, (x) => x * 2)
      expect(result).toBe(null)
    })
  })

  describe('getOrElse', () => {
    it('should return the value if some', () => {
      expect(getOrElse(10, 0)).toBe(10)
    })

    it('should return the default value if none', () => {
      expect(getOrElse(null, 0)).toBe(0)
    })
  })

  describe('filter', () => {
    it('should return the value if it passes the predicate', () => {
      const result = filter(10, (x) => x > 5)
      expect(result).toBe(10)
    })

    it('should return none if it does not pass the predicate', () => {
      const result = filter(10, (x) => x < 5)
      expect(result).toBe(null)
    })

    it('should return none if the option is none', () => {
      const result = filter(null as Option<number>, (x) => x > 5)
      expect(result).toBe(null)
    })
  })

  describe('fold', () => {
    it('should apply the `ifNone` function if none', () => {
      const result = fold(null as Option<number>, () => 'default', (x) => x.toString())
      expect(result).toBe('default')
    })

    it('should apply the function to the value if some', () => {
      const result = fold(10, () => 'default', (x) => x * 2)
      expect(result).toBe(20)
    })
  })
})
