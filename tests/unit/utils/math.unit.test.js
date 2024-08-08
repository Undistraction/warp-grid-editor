import { clampNumberBetween, roundToTwoPlaces } from '../../../src/utils/math'

describe(`roundToTwoPlaces`, () => {
  it(`should round a number to two decimal places if it is longer than two decimal places`, () => {
    expect(roundToTwoPlaces(3.14159)).toBe(3.14)
    expect(roundToTwoPlaces(2.71828)).toBe(2.72)
    expect(roundToTwoPlaces(1.23456789)).toBe(1.23)
  })

  it(`should leave a number unchanged if it is shorter than two decimal places`, () => {
    expect(roundToTwoPlaces(3.1)).toBe(3.1)
    expect(roundToTwoPlaces(2)).toBe(2)
    expect(roundToTwoPlaces(212323123)).toBe(212323123)
  })

  it(`should return NaN if the input is not a number`, () => {
    expect(roundToTwoPlaces(`hello`)).toBeNaN()
    expect(roundToTwoPlaces(null)).toBeNaN()
    expect(roundToTwoPlaces(undefined)).toBeNaN()
  })
})

describe(`clampNumberBetween`, () => {
  it(`should clamp a number between the given min and max values`, () => {
    expect(clampNumberBetween(0, 10, 5)).toBe(5)
    expect(clampNumberBetween(0, 10, -5)).toBe(0)
    expect(clampNumberBetween(0, 10, 15)).toBe(10)
  })

  it(`should return NaN if any of the inputs are not numbers`, () => {
    expect(clampNumberBetween(`hello`, 0, 5)).toBeNaN()
    expect(clampNumberBetween(10, null, 5)).toBeNaN()
    expect(clampNumberBetween(10, 0, undefined)).toBeNaN()
  })
})
