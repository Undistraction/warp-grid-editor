import { ChevronDoubleRightIcon } from '@heroicons/react/16/solid'

import useAppStore from '../../../state/useAppStore'
import ButtonLink from '../../components/ButtonLink'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SidebarHeader = (): React.ReactNode => {
  const setAppConfigValue = useAppStore.use.setAppConfigValue()
  const project = useAppStore.use.project()

  return (
    <header className="flex flex-row items-start justify-between pt-5">
      <h2
        data-tid="project-name"
        className="Class Properties truncate text-lg font-bold"
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

export default SidebarHeader
