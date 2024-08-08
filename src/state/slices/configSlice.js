// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

import { curry } from 'ramda'

import { updateIfItemExistsOrThrow } from '../../utils/slices'
import { joinWithPeriod } from '../../utils/string'
import { APP_CONFIG_DEFAULT } from '../defaults'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const createConfigSlice = (set) => ({
  config: APP_CONFIG_DEFAULT,

  setAppConfigValue: curry((pathToValue, value) => {
    const fullPathToValue = [`config`, ...pathToValue]

    set(
      updateIfItemExistsOrThrow(
        `App config item '${joinWithPeriod(pathToValue)}' does not exist`,
        fullPathToValue,
        value
      )
    )
  }),
})

export default createConfigSlice
