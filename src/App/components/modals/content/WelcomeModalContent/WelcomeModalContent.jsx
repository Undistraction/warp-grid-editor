import React from 'react'

import screenshot from '../../../../../images/screenshot.png'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const LoadProjectModalContent = () => {
  return (
    <div
      className="p-5"
      data-tid="welcome-modal-content"
    >
      <div className="flex flex-row justify-between space-x-5">
        <div className="prose">
          <h2 className="text-lg font-bold">Welcome</h2>
          <p>
            This app allows you to create, edit and export complex grids, either
            as code or as SVG images. You can save grids to your browser’s local
            storage and come back to them later.
          </p>
          <p>
            The app provides control over a large number of parameters in
            configuring the grid. Most of the controls’ labels have tooltips to
            help you understand what they do.
          </p>
          <p>
            It uses an NPM module called{` `}
            <a href="https://www.npmjs.com/package/warp-grid">warp-grid</a>
            {` `}
            which provides a flexible API for generating and manipulating grids.
            For even lower-level control, another NPM module is available called
            {` `}
            <a href="https://www.npmjs.com/package/coons-patch">coons-patch</a>
            {` `}
            which models a coons-patch and is at the heart of warp-grid.
          </p>
        </div>
        <div className="lg:max-w-[350px] xl:max-w-[400px]">
          <img
            className="hidden aspect-[1650/1416] lg:block"
            alt="Screenshot of grid"
            src={screenshot}
          />
        </div>
      </div>
    </div>
  )
}

export default LoadProjectModalContent
