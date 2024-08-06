import { copyToClipboard } from './utils/clipboard'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const getAppApi = ({ coonsPatch, project }) => {
  const exportBounds = () => {
    copyToClipboard(project.boundingCurves)
  }

  const exportCellBounds = () => {
    const cellBounds = coonsPatch.getAllCellBounds()
    copyToClipboard(cellBounds)
  }

  const exportGridDefinition = () => {
    copyToClipboard(project.gridDefinition)
  }

  return {
    exportBounds,
    exportCellBounds,
    exportGridDefinition,
  }
}

export default getAppApi
