export const copyObjToClipboard = (o) => {
  const s = JSON.stringify(o)
  navigator.clipboard.writeText(s)
}
