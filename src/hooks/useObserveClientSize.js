import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

// See: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry
const useObserveClientSize = (ref, callback, modify) => {
  React.useEffect(() => {
    const element = ref.current

    const resizeObserver = new ResizeObserver((event) => {
      const width = event[0].contentBoxSize[0].inlineSize + modify.width
      const height = event[0].contentBoxSize[0].blockSize + modify.height
      callback({ width, height })
    })

    if (ref.current) {
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
