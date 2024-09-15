import { mapObjIndexed } from 'ramda'
import React from 'react'
// eslint-disable-next-line import/no-unresolved
import warpGrid from 'warp-grid'

import { typeProject } from '../../../../../../../prop-types'
import { getBounds } from '../../../../../../../utils/bezier'
import {
  moveBoundingCurves,
  moveBoundingCurvesToOrigin,
} from '../../../../../../../utils/boundingCurves'
import { roundToTwoPlaces } from '../../../../../../../utils/math'
import { getSvgForGrid } from '../../../../../../../utils/svg'
import CodeBlock from '../../../../../CodeBlock'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getSVG = (project) => {
  const boundingCurvesZeroed = moveBoundingCurvesToOrigin(
    project.boundingCurves
  )
  const bounds = getBounds(boundingCurvesZeroed)
  // Place the left-most point at an x of 0 and the top-most point at a y of 0
  const boundingCurvesAdjusted = moveBoundingCurves(
    {
      x: 0 - bounds.xMin,
      y: 0 - bounds.yMin,
    },
    boundingCurvesZeroed
  )
  const grid = warpGrid(boundingCurvesAdjusted, project.gridDefinition)

  // Set the document dimensions to the bounding box of the grid
  const documentMetrics = mapObjIndexed(roundToTwoPlaces, {
    x: 0,
    y: 0,
    width: bounds.xMax - bounds.xMin,
    height: bounds.yMax - bounds.yMin,
  })
  return getSvgForGrid(grid, documentMetrics)
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ExportSVG = ({ project }) => {
  const codeString = getSVG(project)
  return (
    <div className="flex flex-col space-y-3">
      <p className="px-3">
        To generate the grid in JavasScript or Typescript, copy the code below.
        You’ll need to install the warp-grid package using your package manager
        too.
      </p>
      <CodeBlock
        codeString={codeString}
        language="xml"
      />
    </div>
  )
}

ExportSVG.propTypes = {
  project: typeProject.isRequired,
}

export default ExportSVG
