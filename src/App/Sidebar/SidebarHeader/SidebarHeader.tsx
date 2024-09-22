import { ChevronDoubleRightIcon } from '@heroicons/react/16/solid'
import type { ReactNode } from 'react'

import useAppStore from '../../../state/useAppStore'
import ButtonLink from '../../components/ButtonLink'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function SidebarHeader(): ReactNode {
  const setAppConfigValue = useAppStore.use.setAppConfigValue()
  const project = useAppStore.use.project()

  return (
    <header className="flex flex-row items-start justify-between pt-5">
      <h2
        data-tid="project-name"
        className="truncate text-lg font-bold"
      >
        {project.meta.name}
      </h2>
      <ButtonLink
        icon={<ChevronDoubleRightIcon />}
        className="relative top-2 text-sm"
        onClick={() => setAppConfigValue([`ui`, `sidebar`, `isHidden`], true)}
        testId="sidebar-close-button"
      />
    </header>
  )
}
