import {
  degreesToRadians,
  getDistanceBetweenPoints,
  getDistanceBetweenPointsXY,
  getPointAtDistanceAndAngle,
  pointAdd,
  pointsAreEqual,
  pointSubtract,
  radiansToDegrees,
} from '../../../src/utils/trig'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe(`getDistanceBetweenPoints`, () => {
  it(`should calculate the distance between two points`, () => {
    const point1 = { x: 0, y: 0 }
    const point2 = { x: 3, y: 4 }
    expect(getDistanceBetweenPoints(point1, point2)).toBe(5)
  })

  it(`should handle negative values`, () => {
    const point1 = { x: 0, y: 0 }
    const point2 = { x: -3, y: -4 }
    expect(getDistanceBetweenPoints(point1, point2)).toBe(5)
  })

  it(`should return 0 when points are the same`, () => {
    const point1 = { x: 3, y: 5 }
    const point2 = { x: 3, y: 5 }
    expect(getDistanceBetweenPoints(point1, point2)).toBe(0)
  })
})

describe(`getPointAtDistanceAndAngle`, () => {
  it(`should calculate correct point when angle is 0 degrees`, () => {
    const origin = { x: 0, y: 0 }
    const angleRads = 0
    const distance = 5
    expect(getPointAtDistanceAndAngle(origin, angleRads, distance)).toEqual({
      x: 5,
      y: 0,
    })
  })

  it(`should calculate correct point when angle is 180 degrees`, () => {
    const origin = { x: 0, y: 0 }
    const angleRads = degreesToRadians(180)
    const distance = 5
    expect(getPointAtDistanceAndAngle(origin, angleRads, distance)).toEqual({
      x: -5,
      y: 0,
    })
  })

  it(`should calculate correct point when angle is 90 degrees`, () => {
    const origin = { x: 0, y: 0 }
    const angleRads = degreesToRadians(90)
    const distance = 5
    expect(getPointAtDistanceAndAngle(origin, angleRads, distance)).toEqual({
      x: 0,
      y: 5,
    })
  })

  it(`should calculate correct point when angle is -90 degrees`, () => {
    const origin = { x: 0, y: 0 }
    const angleRads = degreesToRadians(-90)
    const distance = 5
    expect(getPointAtDistanceAndAngle(origin, angleRads, distance)).toEqual({
      x: 0,
      y: -5,
    })
  })

  it(`should calculate correct point when angle is not right-angle`, () => {
    const origin = { x: 0, y: 0 }
    const angleRads = degreesToRadians(36.87)
    const distance = 5
    expect(getPointAtDistanceAndAngle(origin, angleRads, distance)).toEqual({
      x: 4,
      y: 3,
    })
  })
})

describe(`degreesToRadians`, () => {
  it(`should convert degrees to radians correctly`, () => {
    expect(degreesToRadians(0)).toBe(0)
    expect(degreesToRadians(45)).toBeCloseTo(0.7853981634)
    expect(degreesToRadians(90)).toBeCloseTo(1.5707963268)
    expect(degreesToRadians(180)).toBeCloseTo(3.1415926536)
    expect(degreesToRadians(270)).toBeCloseTo(4.7123889804)
    expect(degreesToRadians(360)).toBeCloseTo(6.2831853072)
  })

  it(`should return NaN if the input is not a number`, () => {
    expect(degreesToRadians(`hello`)).toBeNaN()
    expect(degreesToRadians(null)).toBeNaN()
    expect(degreesToRadians(undefined)).toBeNaN()
  })
})

describe(`radiansToDegrees`, () => {
  it(`should convert radians to degrees correctly`, () => {
    expect(radiansToDegrees(0)).toBe(0)
    expect(radiansToDegrees(Math.PI / 4)).toBeCloseTo(45)
    expect(radiansToDegrees(Math.PI / 2)).toBeCloseTo(90)
    expect(radiansToDegrees(Math.PI)).toBeCloseTo(180)
    expect(radiansToDegrees((3 * Math.PI) / 2)).toBeCloseTo(270)
    expect(radiansToDegrees(2 * Math.PI)).toBeCloseTo(360)
  })

  it(`should return NaN if the input is not a number`, () => {
    expect(radiansToDegrees(`hello`)).toBeNaN()
    expect(radiansToDegrees(null)).toBeNaN()
    expect(radiansToDegrees(undefined)).toBeNaN()
  })
})

describe(`getDistanceBetweenPointsXY`, () => {
  it(`returns the x and y distances between two points in an array`, () => {
    expect(
      getDistanceBetweenPointsXY({ x: 0, y: 0 }, { x: 10, y: 20 })
    ).toEqual([10, 20])
  })

  it(`handles negative values`, () => {
    expect(
      getDistanceBetweenPointsXY({ x: -10, y: 0 }, { x: -50, y: -20 })
    ).toEqual([-40, -20])
  })

  it(`returns [0.0] if points have the same coordiantes`, () => {
    expect(
      getDistanceBetweenPointsXY({ x: 100, y: 30 }, { x: 100, y: 30 })
    ).toEqual([0, 0])
  })
})

describe(`pointAdd`, () => {
  it(`adds the position of one point to another`, () => {
    expect(pointAdd({ x: 10, y: 20 }, { x: 50, y: 100 })).toEqual({
      x: 60,
      y: 120,
    })
    expect(pointAdd({ x: -10, y: -20 }, { x: 50, y: 100 })).toEqual({
      x: 40,
      y: 80,
    })
  })

  it(`supports array values`, () => {
    expect(pointAdd([10, 20], { x: 50, y: 100 })).toEqual({
      x: 60,
      y: 120,
    })
  })
})

describe(`pointSubtract`, () => {
  it(`adds the position of one point to another`, () => {
    expect(pointSubtract({ x: 10, y: 20 }, { x: 50, y: 100 })).toEqual({
      x: 40,
      y: 80,
    })
    expect(pointSubtract({ x: -40, y: -20 }, { x: 50, y: 100 })).toEqual({
      x: 90,
      y: 120,
    })
  })

  it(`supports array values`, () => {
    expect(pointSubtract([10, 20], { x: 50, y: 100 })).toEqual({
      x: 40,
      y: 80,
    })
  })
})

describe(`pointsAreEqual`, () => {
  it(`returns false if supplied points do not have the same coordinates`, () => {
    expect(pointsAreEqual({ x: 100, y: 100 }, { x: 100, y: 200 })).toBeFalse()
    expect(pointsAreEqual({ x: 100, y: 100 }, { x: 200, y: 100 })).toBeFalse()
    expect(pointsAreEqual({ x: 100, y: 100 }, { x: -100, y: -100 })).toBeFalse()
    expect(
      pointsAreEqual({ x: 100, y: 100 }, { x: 100.01, y: 99.9999 })
    ).toBeFalse()
    expect(pointsAreEqual({ x: 100, y: 100 }, {})).toBeFalse()
  })

  it(`returns true if supplied points have the same coordinates`, () => {
    expect(pointsAreEqual({ x: 0, y: 0 }, { x: 0, y: 0 })).toBeTrue()
    expect(pointsAreEqual({ x: 0, y: 0 }, { x: 0, y: 0 })).toBeTrue()
    expect(
      pointsAreEqual({ x: -100, y: -200 }, { x: -100, y: -200 })
    ).toBeTrue()
  })
})
