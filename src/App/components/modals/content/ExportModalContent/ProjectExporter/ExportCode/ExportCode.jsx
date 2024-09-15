import React from 'react'

import { typeProject } from '../../../../../../../prop-types'
import { moveBoundingCurvesToOrigin } from '../../../../../../../utils/boundingCurves'
import CodeBlock from '../../../../../CodeBlock'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const IMPORT = `import warpGrid from 'warp-grid'`

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getCode = (project) => {
  const boundingCurvesZeroed = moveBoundingCurvesToOrigin(
    project.boundingCurves
  )
  const boundingCurves = JSON.stringify(boundingCurvesZeroed, null, 2)
  const gridDefinition = JSON.stringify(project.gridDefinition, null, 2)

  return `${IMPORT}\n\nconst grid = warpGrid(${boundingCurves}, ${gridDefinition})`
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ExportCode = ({ project }) => {
  const codeString = getCode(project)
  return (
    <div className="flex flex-col space-y-3">
      <p className="px-3">
        To generate the grid in JavasScript or Typescript, copy the code below.
        You’ll need to install the warp-grid package using your package manager
        too.
      </p>
      <CodeBlock
        codeString={codeString}
        language="javascript"
      />
    </div>
  )
}

ExportCode.propTypes = {
  project: typeProject.isRequired,
}

export default ExportCode
