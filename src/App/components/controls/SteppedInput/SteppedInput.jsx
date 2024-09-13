import PropTypes from 'prop-types'
import { isInteger, isPlainObj, isString } from 'ramda-adjunct'
import React from 'react'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getOption = (objectOrString) => {
  if (isString(objectOrString) || isInteger(objectOrString)) {
    const keyRoot = objectOrString === `` ? `unknown` : objectOrString
    return {
      value: objectOrString,
      key: `option-${keyRoot.toString().replace(/\s/g, ``)}`,
      label: objectOrString,
    }
  } else {
    return {
      value: objectOrString.value,
      key: `option-${objectOrString.value.toString().replace(/\s/g, ``)}`,
      label: objectOrString.label,
    }
  }
}

const renderOptions = (options) => {
  return options.map((objectOrString) => {
    const { value, label, key } = getOption(objectOrString)
    return (
      <option
        value={value}
        key={key}
      >
        {label}
      </option>
    )
  })
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SteppedInput = ({
  onChange,
  value = undefined,
  options,
  name,
  testId = undefined,
}) => {
  return (
    <select
      data-tid={testId}
      name={name}
      onChange={(event) => {
        const objectOrString = event.target.value
        const value = isPlainObj(objectOrString)
          ? objectOrString.value
          : objectOrString
        onChange(value)
      }}
      value={value}
      className="p-r-2 min-w-14 border border-black py-1 pl-1 font-mono"
    >
      {renderOptions(options)}
    </select>
  )
}

SteppedInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  testId: PropTypes.string,
}

export default SteppedInput
