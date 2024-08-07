import { copyObjToClipboard } from './utils/clipboard'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const getAppApi = ({ coonsPatch, project }) => {
  const exportBounds = () => {
    copyObjToClipboard(project.boundingCurves)
  }

  const exportCellBounds = () => {
    const cellBounds = coonsPatch.getAllCellBounds()
    copyObjToClipboard(cellBounds)
  }

  const exportGridDefinition = () => {
    copyObjToClipboard(project.gridDefinition)
  }

  return {
    exportBounds,
    exportCellBounds,
    exportGridDefinition,
  }
}

export default getAppApi
