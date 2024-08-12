import React from 'react'

import { typeProject } from '../../../../../prop-types'
import Tab from '../../../Tab'
import ExportCode from '../ExportCode'
import ExportSVG from '../ExportSvg'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ExportModalContent = ({ project }) => {
  const [selectedIdx, setSelectedIdx] = React.useState(0)
  return (
    <div className="p-5">
      <div className="flex flex-col">
        <header className="z-10 flex flex-row">
          <Tab
            label="Export code"
            isSelected={selectedIdx === 0}
            onClick={() => setSelectedIdx(0)}
          />
          <Tab
            label="Export SVG"
            isSelected={selectedIdx === 1}
            onClick={() => setSelectedIdx(1)}
          />
        </header>
        <div className="z-0 border pt-5">
          {selectedIdx === 0 && <ExportCode project={project} />}
          {selectedIdx === 1 && <ExportSVG project={project} />}
        </div>
      </div>
    </div>
  )
}

ExportModalContent.propTypes = {
  project: typeProject.isRequired,
}

export default ExportModalContent
