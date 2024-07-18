import getCoonsPatch from '../src/getCoonsPatch'

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
        expect(data.columns).toEqual([1, 1, 1])
        expect(data.rows).toEqual([1, 1, 1])
      })

      it(`with curvesXAxis and curvesYAxis arrays which each contains a separate curve for each grid section along that curve`, () => {
        expect(data.curvesXAxis).toEqual([
          [
            {
              startPoint: { x: 0, y: 0 },
              controlPoint1: { x: -7.824637588484697, y: 6.384199342874756 },
              controlPoint2: { x: -5.766302052083299, y: 21.268136548413537 },
              endPoint: { x: -7.141018714886503, y: 32.291076660593674 },
            },
            {
              startPoint: { x: -7.141018714886503, y: 32.291076660593674 },
              controlPoint1: { x: -7.6218370510361995, y: 44.13724406268767 },
              controlPoint2: { x: -7.621837262683577, y: 55.86275054990879 },
              endPoint: { x: -7.1410187148865045, y: 67.70892333940631 },
            },
            {
              startPoint: { x: -7.1410187148865045, y: 67.70892333940631 },
              controlPoint1: { x: -5.766302125809, y: 78.73185746112212 },
              controlPoint2: { x: -7.824638792546034, y: 93.61579640998502 },
              endPoint: { x: 0, y: 100 },
            },
          ],
          [
            {
              startPoint: { x: 32.91186378864505, y: -7.002360439402076 },
              controlPoint1: { x: 30.234674911588904, y: 0.9533254761714016 },
              controlPoint2: { x: 30.851810440534116, y: 17.40874854723996 },
              endPoint: { x: 30.324595174332433, y: 30.00317593928779 },
            },
            {
              startPoint: { x: 30.324595174332433, y: 30.00317593928779 },
              controlPoint1: { x: 30.09534604805457, y: 43.42082991408053 },
              controlPoint2: { x: 30.02636966098357, y: 56.717822266831384 },
              endPoint: { x: 30.117666131648626, y: 70.13548233619662 },
            },
            {
              startPoint: { x: 30.117666131648626, y: 70.13548233619662 },
              controlPoint1: { x: 30.50692864711322, y: 82.72990303061115 },
              controlPoint2: { x: 29.75184010834558, y: 99.18532784500388 },
              endPoint: { x: 32.291076660593674, y: 107.1410187148865 },
            },
          ],
          [
            {
              startPoint: { x: 67.08813621135491, y: -7.002360439402076 },
              controlPoint1: { x: 69.76532508841119, y: 0.95332547617141 },
              controlPoint2: { x: 69.14818955946586, y: 17.40874854723993 },
              endPoint: { x: 69.67540482566753, y: 30.00317593928778 },
            },
            {
              startPoint: { x: 69.67540482566753, y: 30.00317593928778 },
              controlPoint1: { x: 69.90465395194532, y: 43.420829914080606 },
              controlPoint2: { x: 69.97363033901647, y: 56.7178222668313 },
              endPoint: { x: 69.88233386835135, y: 70.1354823361966 },
            },
            {
              startPoint: { x: 69.88233386835135, y: 70.1354823361966 },
              controlPoint1: { x: 69.49307135288674, y: 82.72990303061127 },
              controlPoint2: { x: 70.24815989165435, y: 99.18532784500377 },
              endPoint: { x: 67.70892333940631, y: 107.14101871488648 },
            },
          ],
          [
            {
              startPoint: { x: 100, y: 0 },
              controlPoint1: { x: 107.82463758848469, y: 6.384199342874742 },
              controlPoint2: { x: 105.76630205208332, y: 21.268136548413516 },
              endPoint: { x: 107.1410187148865, y: 32.291076660593674 },
            },
            {
              startPoint: { x: 107.1410187148865, y: 32.291076660593674 },
              controlPoint1: { x: 107.6218370510361, y: 44.13724406268767 },
              controlPoint2: { x: 107.62183726268366, y: 55.86275054990879 },
              endPoint: { x: 107.14101871488651, y: 67.70892333940631 },
            },
            {
              startPoint: { x: 107.14101871488651, y: 67.70892333940631 },
              controlPoint1: { x: 105.76630212580895, y: 78.73185746112208 },
              controlPoint2: { x: 107.82463879254604, y: 93.6157964099851 },
              endPoint: { x: 100, y: 100 },
            },
          ],
        ])
        expect(data.curvesYAxis).toEqual([
          [
            {
              startPoint: { x: 0, y: 0 },
              controlPoint1: { x: 9.473806529375787, y: -5.873614904181687 },
              controlPoint2: { x: 21.921896095046975, y: -5.95330696195947 },
              endPoint: { x: 32.91186378864505, y: -7.002360439402076 },
            },
            {
              startPoint: { x: 32.91186378864505, y: -7.002360439402076 },
              controlPoint1: { x: 44.32317311676205, y: -7.668531960414758 },
              controlPoint2: { x: 55.67682172494242, y: -7.668532252547675 },
              endPoint: { x: 67.08813621135491, y: -7.002360439402076 },
            },
            {
              startPoint: { x: 67.08813621135491, y: -7.002360439402076 },
              controlPoint1: { x: 78.07809906572368, y: -5.953306981663239 },
              controlPoint2: { x: 90.52618836840338, y: -5.873616583700771 },
              endPoint: { x: 100, y: 0 },
            },
          ],
          [
            {
              startPoint: { x: -7.141018714886503, y: 32.291076660593674 },
              controlPoint1: { x: 2.889811800074839, y: 30.983545920634107 },
              controlPoint2: { x: 17.736742912685862, y: 30.244306036648453 },
              endPoint: { x: 30.324595174332433, y: 30.00317593928779 },
            },
            {
              startPoint: { x: 30.324595174332433, y: 30.00317593928779 },
              controlPoint1: { x: 43.46775024152767, y: 29.71933437066255 },
              controlPoint2: { x: 56.5322438097056, y: 29.719334246456448 },
              endPoint: { x: 69.67540482566753, y: 30.00317593928778 },
            },
            {
              startPoint: { x: 69.67540482566753, y: 30.00317593928778 },
              controlPoint1: { x: 82.26325115023793, y: 30.244306048087864 },
              controlPoint2: { x: 97.11018266862934, y: 30.983545202308484 },
              endPoint: { x: 107.1410187148865, y: 32.291076660593674 },
            },
          ],
          [
            {
              startPoint: { x: -7.1410187148865045, y: 67.70892333940631 },
              controlPoint1: { x: 1.8599427379078173, y: 70.967476763669 },
              controlPoint2: { x: 17.518823063808057, y: 69.56868905347528 },
              endPoint: { x: 30.117666131648626, y: 70.13548233619662 },
            },
            {
              startPoint: { x: 30.117666131648626, y: 70.13548233619662 },
              controlPoint1: { x: 43.40577389016958, y: 70.23397071995875 },
              controlPoint2: { x: 56.59422008469434, y: 70.2339707636796 },
              endPoint: { x: 69.88233386835135, y: 70.1354823361966 },
            },
            {
              startPoint: { x: 69.88233386835135, y: 70.1354823361966 },
              controlPoint1: { x: 82.48117061537069, y: 69.56868909605792 },
              controlPoint2: { x: 98.14005201582327, y: 70.9674770065367 },
              endPoint: { x: 107.14101871488651, y: 67.70892333940631 },
            },
          ],
          [
            {
              startPoint: { x: 0, y: 100 },
              controlPoint1: { x: 6.384199342874742, y: 107.82463758848469 },
              controlPoint2: { x: 21.268136548413516, y: 105.76630205208332 },
              endPoint: { x: 32.291076660593674, y: 107.1410187148865 },
            },
            {
              startPoint: { x: 32.291076660593674, y: 107.1410187148865 },
              controlPoint1: { x: 44.13724406268767, y: 107.6218370510361 },
              controlPoint2: { x: 55.86275054990879, y: 107.62183726268367 },
              endPoint: { x: 67.70892333940631, y: 107.14101871488648 },
            },
            {
              startPoint: { x: 67.70892333940631, y: 107.14101871488648 },
              controlPoint1: { x: 78.73185746112208, y: 105.76630212580906 },
              controlPoint2: { x: 93.6157964099851, y: 107.82463879254601 },
              endPoint: { x: 100, y: 100 },
            },
          ],
        ])
      })
    })

    describe(`with an API`, () => {
      const { api } = patch

      describe(`getGridSquareBounds`, () => {
        it(`provides bounds for the grid square at the supplied coordinates`, () => {
          const gridSquareBounds = api.getGridSquareBounds(2, 2)
          expect(gridSquareBounds).toEqual({
            bottom: {
              controlPoint1: {
                x: 78.73185746112208,
                y: 105.76630212580906,
              },
              controlPoint2: {
                x: 93.6157964099851,
                y: 107.82463879254601,
              },
              endPoint: {
                x: 100,
                y: 100,
              },
              startPoint: {
                x: 67.70892333940631,
                y: 107.14101871488648,
              },
            },
            left: {
              controlPoint1: {
                x: 69.49307135288674,
                y: 82.72990303061127,
              },
              controlPoint2: {
                x: 70.24815989165435,
                y: 99.18532784500377,
              },
              endPoint: {
                x: 67.70892333940631,
                y: 107.14101871488648,
              },
              startPoint: {
                x: 69.88233386835135,
                y: 70.1354823361966,
              },
            },
            right: {
              controlPoint1: {
                x: 105.76630212580895,
                y: 78.73185746112208,
              },
              controlPoint2: {
                x: 107.82463879254604,
                y: 93.6157964099851,
              },
              endPoint: {
                x: 100,
                y: 100,
              },
              startPoint: {
                x: 107.14101871488651,
                y: 67.70892333940631,
              },
            },
            top: {
              controlPoint1: {
                x: 82.48117061537069,
                y: 69.56868909605792,
              },
              controlPoint2: {
                x: 98.14005201582327,
                y: 70.9674770065367,
              },
              endPoint: {
                x: 107.14101871488651,
                y: 67.70892333940631,
              },
              startPoint: {
                x: 69.88233386835135,
                y: 70.1354823361966,
              },
            },
          })
        })
      })
      describe(`getIntersections`, () => {
        const intersectons = api.getIntersections()
        expect(intersectons).toEqual([
          { x: 0, y: 0 },
          { x: 32.91186378864505, y: -7.002360439402076 },
          { x: 67.08813621135491, y: -7.002360439402076 },
          { x: 100, y: 0 },
          { x: -7.141018714886503, y: 32.291076660593674 },
          { x: 30.324595174332433, y: 30.00317593928779 },
          { x: 69.67540482566753, y: 30.00317593928778 },
          { x: 107.1410187148865, y: 32.291076660593674 },
          { x: -7.1410187148865045, y: 67.70892333940631 },
          { x: 30.117666131648626, y: 70.13548233619662 },
          { x: 69.88233386835135, y: 70.1354823361966 },
          { x: 107.14101871488651, y: 67.70892333940631 },
          { x: 0, y: 100 },
          { x: 32.291076660593674, y: 107.1410187148865 },
          { x: 67.70892333940631, y: 107.14101871488648 },
          { x: 100, y: 100 },
        ])
      })
    })
  })
})

// Test grid values
// Write validation for ends of curves meeting
// Implement numeric columns
// Implement easing
