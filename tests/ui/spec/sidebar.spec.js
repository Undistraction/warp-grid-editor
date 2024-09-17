// eslint-disable-next-line import/named
import { expect } from '@playwright/test'

import { test } from '../fixtures'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

test(`Has link to Github`, async ({ homePage }) => {
  await homePage.goto(`/`)
  // Close the welcome modal
  await homePage.modalCloseButton.click()
  await expect(homePage.sidebarRepoLink).toHaveText(`Github`)
  await expect(homePage.sidebarRepoLink).toHaveAttribute(
    `href`,
    `https://github.com/Undistraction/warp-grid`
  )
})

test(`Has Credit`, async ({ homePage }) => {
  await homePage.goto(`/`)
  // Close the welcome modal
  await homePage.modalCloseButton.click()
  await expect(homePage.sidebarCredit).toHaveText(`Built by Undistraction`)
  await expect(homePage.sidebarCreditLink).toHaveAttribute(
    `href`,
    `https://undistraction.com`
  )
})

test.describe(`Opening and closing`, () => {
  test(`Can be closed and opened`, async ({ homePage }) => {
    await homePage.goto(`/`)
    // Close the welcome modal
    await homePage.modalCloseButton.click()
    await expect(homePage.sidebar).toBeVisible()
    await homePage.sidebarCloseButton.click()
    await expect(homePage.sidebar).toBeHidden()
    await homePage.sidebarOpenButton.click()
    await expect(homePage.sidebar).toBeVisible()
  })

  test(`State is saved to local storage when page is closed`, async ({
    homePage,
    page,
  }) => {
    await homePage.goto(`/`)
    // Close the welcome modal
    await homePage.modalCloseButton.click()
    await homePage.sidebarCloseButton.click()
    await page.reload()
    await expect(homePage.sidebar).toBeHidden()
    await homePage.sidebarOpenButton.click()
    await page.reload()
    await expect(homePage.sidebar).toBeVisible()
  })
})

test.describe(`Sidebar sections`, () => {
  const GROUP_IDS = [`bounds`, `visibility`, `grid`, `config`, `grid-square`]

  for (const groupId of GROUP_IDS) {
    test.describe(`Toggling`, () => {
      test(`Can toggle '${groupId}' group open and closed`, async ({
        homePage,
      }) => {
        await homePage.goto(`/`)
        // Close the welcome modal
        await homePage.modalCloseButton.click()
        const group = await homePage.getSidebarGroup(groupId)
        const groupHeader = group.getByTestId(`sidebar-group-header`)
        const groupBody = group.getByTestId(`sidebar-group-body`)
        await expect(groupBody).toBeHidden()
        await groupHeader.click()
        await expect(groupBody).toBeVisible()
        await groupHeader.click()
        await expect(groupBody).toBeHidden()
      })
    })

    test.describe(`State`, () => {
      test(`'${groupId}' group state is saved to local storage when page is closed`, async ({
        page,
        homePage,
      }) => {
        await homePage.goto(`/`)
        // Close the welcome modal
        await homePage.modalCloseButton.click()
        const group = await homePage.getSidebarGroup(groupId)
        const groupHeader = group.getByTestId(`sidebar-group-header`)
        await groupHeader.click()
        page.reload()
        const groupBody = group.getByTestId(`sidebar-group-body`)
        await expect(groupBody).toBeVisible()
        await groupHeader.click()
        page.reload()
        await expect(groupBody).toBeHidden()
      })
    })
  }
})
