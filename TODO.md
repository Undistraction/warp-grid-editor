## TODO (MSCW)

### Must do

5.  Fix weird edge alignment issue
6.  Separate demo to own repo
7.  Basic mobile styles

### Should do

3.  Improve saving mechanism. Better structure of saved data. Save and check version.

### Could do

1.  Shortcuts

- double-click to reset corner controls

2.  Hide / show control points
3.  Add back easing
4.  Don't render grid during drag (setting/toggle)

#### Add back easing

(See https://gre.github.io/bezier-easing-editor/example/), basically pass each ratio to an easing function before using it.

```
// const easeX = BezierEasing(0, 0, 1, 1)
// const easeY = BezierEasing(0, 0, 1, 1)
const easedRatioX = easeX(ratioX)
```
