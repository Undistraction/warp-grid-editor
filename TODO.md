## TODO (MSCW)

### Must do

1.  Separate demo to own repo
2.  Basic mobile styles
3.  getGridCells - return an array of cell data

### Should do

### Could do

1.  Shortcuts

- double-click to reset corner controls

2.  Add back easing
3.  Don't render grid during drag (setting/toggle)

#### Add back easing

(See https://gre.github.io/bezier-easing-editor/example/), basically pass each ratio to an easing function before using it.

```
// const easeX = BezierEasing(0, 0, 1, 1)
// const easeY = BezierEasing(0, 0, 1, 1)
const easedRatioX = easeX(ratioX)
```
