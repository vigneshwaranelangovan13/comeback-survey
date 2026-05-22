'use client'

import { v4 as uuidv4 } from 'uuid'

export interface SessionData {
  sessionId: string
  startTime: number
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  referrer: string
  deviceType: string
  os: string
  browser: string
  screenWidth: number
  screenHeight: number
  timezone: string
  language: string
}

export interface ScreenTiming {
  screenNumber: number
  enteredAt: number
  leftAt: number | null
  durationMs: number | null
}

export function detectDevice(): string {
  if (typeof window === 'undefined') return 'unknown'
  const ua = navigator.userAgent.toLowerCase()
  if (/mobile|android|iphone|ipod|blackberry|opera mini/.test(ua)) return 'mobile'
  if (/ipad|tablet/.test(ua)) return 'tablet'
  return 'desktop'
}

export function detectOS(): string {
  if (typeof window === 'undefined') return 'unknown'
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS'
  if (/Android/.test(ua)) return 'Android'
  if (/Windows/.test(ua)) return 'Windows'
  if (/Mac OS X/.test(ua)) return 'macOS'
  if (/Linux/.test(ua)) return 'Linux'
  return 'unknown'
}

export function detectBrowser(): string {
  if (typeof window === 'undefined') return 'unknown'
  const ua = navigator.userAgent
  if (/Chrome/.test(ua) && !/Edg/.test(ua)) return 'Chrome'
  if (/Safari/.test(ua) && !/Chrome/.test(ua)) return 'Safari'
  if (/Firefox/.test(ua)) return 'Firefox'
  if (/Edg/.test(ua)) return 'Edge'
  return 'other'
}

export function getUTMParams() {
  if (typeof window === 'undefined') {
    return { source: null, medium: null, campaign: null }
  }
  const params = new URLSearchParams(window.location.search)
  return {
    source: params.get('utm_source') || params.get('source'),
    medium: params.get('utm_medium') || 'reddit',
    campaign: params.get('utm_campaign') || null,
  }
}

export function initSession(): SessionData {
  const utm = getUTMParams()
  let sessionId = ''

  if (typeof window !== 'undefined') {
    sessionId = sessionStorage.getItem('cb_session_id') || uuidv4()
    sessionStorage.setItem('cb_session_id', sessionId)
  } else {
    sessionId = uuidv4()
  }

  return {
    sessionId,
    startTime: Date.now(),
    utmSource: utm.source,
    utmMedium: utm.medium,
    utmCampaign: utm.campaign,
    referrer: typeof window !== 'undefined' ? document.referrer : '',
    deviceType: detectDevice(),
    os: detectOS(),
    browser: detectBrowser(),
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    screenHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    timezone: typeof window !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'unknown',
    language: typeof window !== 'undefined' ? navigator.language : 'unknown',
  }
}
