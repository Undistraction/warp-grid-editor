export const copyToClipboard = (o) => {
  const s = JSON.stringify(o)
  navigator.clipboard.writeText(s)
}
