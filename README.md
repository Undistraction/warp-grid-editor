# README

Build coons patch (Very WIP)

## Install

```
pnpm install
```

## Run

```
pnpm run dev
```

## TODO

- Mobile styles
- Dynamic canvas (takes as much screen as possible)
- Move control points with corner points
- Add settings for corner points (startPoint, endPoint, controlPoint values and allow control points to be toggled on/off per point and for all points)
- Switch rendering to SVG using https://svgjs.dev/docs/3.0/
- Publish as package
- Performance optimisation

## Notes

### When building the curves we are

- locking the ends of the curves to evenly interpolated points on the adjacent cures as [ratio]
- Using linear interpolation to find the position of the control points betwen start and end points at [ratio]
- Storing the curves

### When building the intersections we are

- Taking the stored curves and checking them for intersections with each-other
- Storing those intersections as points + [ratio] along the curve at which they occur.

### When building grid square we are

- Taking the stored curves and using [ratio] based on grid-division to find evenly interpolated points on that curve
- Splitting the curves at those points

### Problem

- Intersections between curves do NOT correlate with [ratio] along curves.
- Bad assumption that curves intersect at [ratio]
- This must be something to do with how the control points are interpolated
- Each set of curves needs to be generated without knowledge of the other set of curves.

- We are already interpolating
