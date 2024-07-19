import getCoonsPatch from '../src/getCoonsPatch'
import fixture from './fixtures/patch3x3Grid'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const boundsValid = {
  top: {
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 100, y: 0 },
    controlPoint1: { x: 10, y: -10 },
    controlPoint2: { x: 90, y: -10 },
  },
  bottom: {
    startPoint: { x: 0, y: 100 },
    endPoint: { x: 100, y: 100 },
    controlPoint1: { x: -10, y: 110 },
    controlPoint2: { x: 110, y: 110 },
  },
  left: {
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 0, y: 100 },
    controlPoint1: { x: -10, y: -10 },
    controlPoint2: { x: -10, y: 110 },
  },
  right: {
    startPoint: { x: 100, y: 0 },
    endPoint: { x: 100, y: 100 },
    controlPoint1: { x: 110, y: -10 },
    controlPoint2: { x: 110, y: 110 },
  },
}

const gridWithNumericColumns = {
  columns: 3,
  rows: 3,
}

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const clone = (value) => JSON.parse(JSON.stringify(value))

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe(`getCoonsPatch`, () => {
  describe(`validations`, () => {
    describe(`boundingCurves`, () => {
      it(`throws if no boundingCurves is supplied`, () => {
        expect(() => {
          getCoonsPatch()
        }).toThrow('You must supply boundingCurves(Object)')
      })

      it(`throws if boundingCurves is not an object`, () => {
        expect(() => {
          getCoonsPatch([])
        }).toThrow('boundingCurves must be an object')
      })

      it(`throws if top and left bounding curves don't meet`, () => {
        expect(() => {
          const bounds = clone(boundsValid)
          bounds.top.startPoint.x = -10
          getCoonsPatch(bounds)
        }).toThrow(
          'top curve startPoint and left curve startPoint must have same coordinates'
        )
      })

      it(`throws if top and right bounding curves don't meet`, () => {
        expect(() => {
          const bounds = clone(boundsValid)
          bounds.right.startPoint.x = -10
          getCoonsPatch(bounds)
        }).toThrow(
          'top curve endPoint and right curve startPoint must have the same coordinates'
        )
      })

      it(`throws if bottom and left bounding curves don't meet`, () => {
        expect(() => {
          const bounds = clone(boundsValid)
          bounds.left.endPoint.x = -10
          getCoonsPatch(bounds)
        }).toThrow(
          'bottom curve startPoint and left curve endPoint must have the same coordinates'
        )
      })

      it(`throws if bottom and right bounding curves don't meet`, () => {
        expect(() => {
          const bounds = clone(boundsValid)
          bounds.right.endPoint.x = -10
          getCoonsPatch(bounds)
        }).toThrow(
          'bottom curve endPoint and right curve endPoint must have the same coordinates'
        )
      })
    })

    describe(`grid`, () => {
      it(`throws if no grid is supplied`, () => {
        expect(() => {
          getCoonsPatch(boundsValid)
        }).toThrow('You must supply a grid(Object)')
      })

      it(`throws if no columns are supplied`, () => {
        expect(() => {
          getCoonsPatch(boundsValid, {})
        }).toThrow('You must supply grid.columns(Array or Int)')
      })

      it(`throws if no rows are supplied`, () => {
        expect(() => {
          getCoonsPatch(boundsValid, { columns: [] })
        }).toThrow('You must supply grid.rows(Array or Int)')
      })

      it(`throws if columns are not Array or Int`, () => {
        expect(() => {
          getCoonsPatch(boundsValid, { columns: {} })
        }).toThrow('grid.columns must be an Array of Ints or Int')
      })

      it(`throws if rows are not Array or Int`, () => {
        expect(() => {
          getCoonsPatch(boundsValid, { columns: [], rows: {} })
        }).toThrow('grid.rows must be an Array of Ints or Int')
      })
    })
  })

  describe(`with valid params returns patch`, () => {
    const patch = getCoonsPatch(boundsValid, gridWithNumericColumns)

    describe('data', () => {
      const { data } = patch

      it(`with original boundingCurves`, () => {
        expect(data.boundingCurves).toEqual(boundsValid)
      })

      it(`with arrays of column and row values`, () => {
        expect(data.columns).toEqual(fixture.data.columns)
        expect(data.rows).toEqual(fixture.data.rows)
      })

      it(`with curvesXAxis and curvesYAxis arrays which each contains a separate curve for each grid section along that curve`, () => {
        expect(data.curvesXAxis).toEqual(fixture.data.curvesXAxis)
        expect(data.curvesYAxis).toEqual(fixture.data.curvesYAxis)
      })
    })

    describe(`with an API`, () => {
      const { api } = patch

      describe(`getGridSquareBounds`, () => {
        it(`provides bounds for the grid square at the supplied coordinates`, () => {
          const args = [2, 2]
          const gridSquareBounds = api.getGridSquareBounds(...args)
          expect(gridSquareBounds).toEqual(
            fixture.api.getGridSquareBounds(...args)
          )
        })
      })
      describe(`getIntersections`, () => {
        it(`returns all intersections between curves`, () => {
          const intersectons = api.getIntersections()
          expect(intersectons).toEqual(fixture.api.getIntersections())
        })
      })
      describe(`getPoint`, () => {
        it(`returns point at supplied coordinates`, () => {
          const args = [0.5, 0.25]
          const point = api.getPoint(...args)
          expect(point).toEqual(fixture.api.getPoint(...args))
        })
      })
    })
  })
})
