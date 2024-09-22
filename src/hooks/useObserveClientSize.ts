import React, { RefObject } from 'react'

import { Size } from '../types'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

// See: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry
const useObserveClientSize = (
  ref: RefObject<HTMLElement>,
  callback: (size: Size) => void,
  modify = { width: 0, height: 0 }
) => {
  // We don't wan to trigger state change
  const size = React.useRef({ width: 0, height: 0 })

  React.useEffect(() => {
    const element = ref.current

    const resizeObserver = new ResizeObserver((event) => {
      const width = event[0].contentBoxSize[0].inlineSize + modify.width
      const height = event[0].contentBoxSize[0].blockSize + modify.height
      if (width !== size.current.width || height !== size.current.height) {
        size.current = { width, height }
        callback({ width, height })
      }
    })

    if (element) {
      resizeObserver.observe(element)
    }

    // Clean up
    return () => {
      if (element) {
        resizeObserver.unobserve(element)
      }
    }
  }, [callback, modify, ref])
}

export default useObserveClientSize
