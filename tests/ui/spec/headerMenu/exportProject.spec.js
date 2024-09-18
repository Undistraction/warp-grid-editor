// eslint-disable-next-line import/named
import { expect } from '@playwright/test'

import { test } from '../../fixtures'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

test.beforeEach(async ({ homePage }) => {
  await homePage.goto(`/`)
  // Close the welcome modal
  await homePage.modalCloseButton.click()
})

test.describe(`'Export' button`, () => {
  test(`should allow javaScript code to initialise the grid to be copied to the clipboard`, async ({
    page,
    homePage,
  }) => {
    const EXPECTED = `import warpGrid from 'warp-grid'

const grid = warpGrid({
  "top": {
    "startPoint": {
      "x": 0,
      "y": 0
    },
    "endPoint": {
      "x": 836,
      "y": 0
    },
    "controlPoint1": {
      "x": 30,
      "y": -30
    },
    "controlPoint2": {
      "x": 806,
      "y": -30
    }
  },
  "bottom": {
    "startPoint": {
      "x": 0,
      "y": 533
    },
    "endPoint": {
      "x": 836,
      "y": 533
    },
    "controlPoint1": {
      "x": 30,
      "y": 563
    },
    "controlPoint2": {
      "x": 806,
      "y": 563
    }
  },
  "left": {
    "startPoint": {
      "x": 0,
      "y": 0
    },
    "endPoint": {
      "x": 0,
      "y": 533
    },
    "controlPoint1": {
      "x": -30,
      "y": 30
    },
    "controlPoint2": {
      "x": -30,
      "y": 503
    }
  },
  "right": {
    "startPoint": {
      "x": 836,
      "y": 0
    },
    "endPoint": {
      "x": 836,
      "y": 533
    },
    "controlPoint1": {
      "x": 866,
      "y": 30
    },
    "controlPoint2": {
      "x": 866,
      "y": 503
    }
  }
}, {
  "columns": 25,
  "rows": 25,
  "gutter": [
    0,
    0
  ],
  "lineStrategy": "curves",
  "interpolationStrategy": "even",
  "precision": 20,
  "bezierEasing": {
    "xAxis": [
      0,
      0,
      1,
      1
    ],
    "yAxis": [
      0,
      0,
      1,
      1
    ]
  }
})`

    await homePage.exportProjectButton.click()
    await homePage.exportCodeTab.click()
    await homePage.copyCodeButton.click()

    const clipboardText = await page.evaluate(
      async () => await navigator.clipboard.readText()
    )

    await expect(clipboardText).toEqual(EXPECTED)
  })

  test(`should allow an svg representation of the grid to be copied to the clipboard`, async ({
    page,
    homePage,
  }) => {
    await homePage.exportProjectButton.click()
    await homePage.exportSvgTab.click()
    await homePage.copyCodeButton.click()

    const clipboardText = await page.evaluate(
      async () => await navigator.clipboard.readText()
    )

    expect(clipboardText).toMatchSnapshot(`svg-export.txt`)
  })
})
