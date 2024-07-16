// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SidebarGroup = ({ title, children, hint }) => {
  return (
    <div className="flex flex-col space-y-2 pt-3">
      <h2 className="text-sm font-bold">{title}</h2>
      {hint && <div className="text-sm italic">{hint}</div>}
      <div className="flex flex-col space-y-3">{children}</div>
    </div>
  )
}

export default SidebarGroup
