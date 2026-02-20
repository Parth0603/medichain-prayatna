export function simulateTemperatureBreach() {
  return {
    location: 'Simulated Location',
    temperature: 15 // Outside safe range (2-8°C)
  }
}

export function generateRandomTemperature(inRange = true) {
  if (inRange) {
    return Math.floor(Math.random() * 7) + 2 // 2-8°C
  } else {
    return Math.random() > 0.5 ? -5 : 15 // Outside range
  }
}
