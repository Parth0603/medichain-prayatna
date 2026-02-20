export function formatAddress(address) {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatDate(timestamp) {
  const date = new Date(Number(timestamp) * 1000)
  return date.toLocaleString()
}
