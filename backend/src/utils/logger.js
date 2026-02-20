export function log(message, data = null) {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] ${message}`)
  if (data) {
    console.log(JSON.stringify(data, null, 2))
  }
}

export function logError(message, error) {
  const timestamp = new Date().toISOString()
  console.error(`[${timestamp}] ERROR: ${message}`)
  console.error(error)
}
