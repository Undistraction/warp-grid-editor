// eslint-disable-next-line import/named
import { vi } from 'vitest'

import { copyObjToClipboard } from '../../src/utils/clipboard'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe(`success`, () => {
  it(`jSON.stringifies object and copies to the clipboard`, () => {
    const input = { one: `one` }
    const expected = JSON.stringify(input)

    // 'clipboard' is not provided by JSDOM so we need mock
    const writeText = vi.fn()
    navigator.clipboard = {
      writeText,
    }

    copyObjToClipboard(input)

    expect(writeText).toHaveBeenCalledWith(expected)
  })
})
