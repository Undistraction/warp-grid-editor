import React from 'react'

import useAppStore from '../../../../../../state/useAppStore'
import Tab from '../../../../Tab'
import ExportCode from './ExportCode'
import ExportSVG from './ExportSvg'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ProjectExporter = () => {
  const project = useAppStore.use.project()
  const [selectedIdx, setSelectedIdx] = React.useState(0)
  return (
    <div className="flex flex-col">
      <header className="z-10 flex flex-row">
        <Tab
          label="Export code"
          isSelected={selectedIdx === 0}
          onClick={() => setSelectedIdx(0)}
          testId="export-code-tab"
        />
        <Tab
          label="Export SVG"
          isSelected={selectedIdx === 1}
          onClick={() => setSelectedIdx(1)}
          testId="export-svg-tab"
        />
      </header>
      <div className="z-0 border pt-5">
        {selectedIdx === 0 && <ExportCode project={project} />}
        {selectedIdx === 1 && <ExportSVG project={project} />}
      </div>
    </div>
  )
}

export default ProjectExporter
