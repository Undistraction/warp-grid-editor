## TODO (MSCW)

### Must do

3.  Separate demo to own repo
4.  Fix random (not adhering to bounds)
5.  Fix width and height for Shape SVG
6.  Fix weird edge alignment issue
7.  Basic mobile styles
8.  Add credit

### Should do

1.  Global zero/link/mirror
2.  Don't render grid during drag (setting/toggle)
3.  Improve saving mechanism. Better structure of saved data. Save and check version.

### Could do

1.  Shortcuts

- double-click to reset corner controls

2.  Hide / show control points
3.  Add back easing

#### Add back easing

(See https://gre.github.io/bezier-easing-editor/example/), basically pass each ratio to an easing function before using it.

```
// const easeX = BezierEasing(0, 0, 1, 1)
// const easeY = BezierEasing(0, 0, 1, 1)

const easedRatioX = easeX(ratioX)
```
