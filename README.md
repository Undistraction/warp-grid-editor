# README

This package allows you to generate a [Coons patch](https://en.wikipedia.org/wiki/Coons_patch) for a four sided shape whose bounds are defined by four cubic Bezier curves. The grid it calculates is very configurable, allowing you to modify a number of its features in some useful and interesting ways. It also provides an API to allow you to drill into the data that makes up the coons patch and the grid.

This package only models the coons patch and calculates the position of the curves that make up the grid, their intersections and the bounds of the grid squares. It doesn't handle the rendering of that data data to the screen, however this is trivial using the HTML Canvas or SVG.

There is an interactive demo included in the package that allows you to explore the coons patches that can be generated.

## Install

```
pnpm install
```

## Run

```
pnpm run dev
```

## TODO (MSCW)

### Must do

1.  Fix random (not adhering to bounds)
2.  Fix width and height for Shape SVG
3.  Basic mobile styles
4.  Add credit

### Should do

2. Global zero/link/mirror

### Could do

1. Shortcuts

- double-click to reset corner controls

2. Hide / show control points
3. Add back easing

#### Add back easing

(See https://gre.github.io/bezier-easing-editor/example/), basically pass each ratio to an easing function before using it.

```
// const easeX = BezierEasing(0, 0, 1, 1)
// const easeY = BezierEasing(0, 0, 1, 1)

const easedRatioX = easeX(ratioX)
```
