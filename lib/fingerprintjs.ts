// This file helps recognize devices
export async function getDeviceFingerprint() {
  try {
    // Simple device info
    const deviceInfo = {
      userAgent: navigator.userAgent,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
    
    // Create unique ID
    const fingerprint = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    return {
      id: fingerprint,
      deviceInfo: deviceInfo,
      collectedAt: new Date().toISOString()
    }
  } catch (error) {
    console.log('Fingerprint error:', error)
    return null
  }
}