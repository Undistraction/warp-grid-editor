# README

This package allows you to generate a [Coons patch](https://en.wikipedia.org/wiki/Coons_patch) for a four sided shape whose bounds are defined by four cubic Bezier curves. The grid it calculates is very configurable, allowing you to modify a number of its features in some useful and interesting ways. It also provides an API to allow you to drill into the data that makes up the coons patch and the grid.

This package only models the coons patch and calculates the position of the curves that make up the grid, their intersections and the bounds of the grid squares. It doesn't handle the rendering of that data data to the screen, however this is trivial using the HTML Canvas or SVG.

There is an [interactive demo](https://coons-patch.undistraction.com) which allows you to generate and manipulate a patch.

## Install package

```bash
npm add coons-patch
yarn add coons-patch
pnpm add coons-patch
```

## Use package

```javaScript
import getCoonsPatch from 'coons-patch'

const coonsPatch = getCoonsPatch(boundingCurves, grid)
```

### Arguments

#### Bounding curves.

The first argument is `boundingCurves`, an object describing the four sides of the patch and comprising of four keys (`top`, `bottom`, `left` and `right`), each containing an object representing a cubic Bezier curve. Top and bottom curves run left-to-right, along the x-axis, left and and right curves run top-top bottom along the y-axis.

Here is an example:

```javaScript
{
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
```

#### Grid

The grid object describes the grid that will be interpolated onto the patch. It has two main fields, `colums` and `rows` both of which can be either an integer, or an Array of numbers. If an integer, the integer will be used as the value for the number of rows or columns, for example, if columns is `5` and rows is `9`, the grid will have five columns and nine rows, and therefore 45 cells. In this instance, all columns will be of uniform width based on the width of the bounds, divided by the number of columns, similarly, all rows will be of uniform height based on the height of the bounds divided by the number of rows.

Passing an array of numbers as the value of `columns` or `rows`, allows a great deal more control over the widths of the columns or rows, by allowing each value in the array to describe the width of the column (or height of the row) it represents. This is calculated by dividing the value by the total value of all the items in the array, and setting the resolved value to be a ratio of the total width or height. This allows the creation of a grid that supports variable column and row dimensions.

Additionally, the `grid` supports a setting called `interpolationStrategy`. This can be either `even` (the default) or `linear`. This changes the algorythm used to interplate the position of a point along a curve. If `linear` interplation is used, the effect is to exagerate the effect of curvature on the distance between rows and columns. `even` uses a more complex approach and usually results in more pleasing results. However it is significantly more memory intensive.

#### Return value

`getCoonsPatch` returns an object comprising of two fields, `config` and `api`.

#### Validations

- The points where two of the `boundingCurves` sides meet must have the same coordinates or a validation error will be raised.
- If any of the sides are missing from the `boundingCurves` object, a validation error will be raised

The

# Repo

## Install

```

pnpm install

```

## Run demo in development

```

pnpm run dev

```

## Build package

```

pnpm run build-package

```

## Build demo

```

pnpm run build

```

## Preview build

```

pnpm run preview

```

## Run tests

Tests are written using Jest

```

pnpm run test

```

```

```
