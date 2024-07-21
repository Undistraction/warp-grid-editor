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

## TODO

- Fix random (not adhering to bounds)
- Fix width and height for Shape SVG
- Basic mobile styles
- Shortcuts
  - double-click to reset corner controls
- Add credit
- Global zero/link/mirror
- Hide / show control points
- Multi
