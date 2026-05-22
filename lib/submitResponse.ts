import { supabase } from './supabase'

export interface ResponsePayload {
  session_id: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  referrer?: string
  device_type?: string
  os?: string
  browser?: string
  screen_width?: number
  screen_height?: number
  timezone?: string
  language?: string
  q1_years?: string
  q2_promises?: string
  q3_cost?: string
  q4_pay?: string
  time_on_screen_1_ms?: number
  time_on_screen_2_ms?: number
  time_on_screen_3_ms?: number
  time_on_screen_4_ms?: number
  time_on_screen_5_ms?: number
  total_session_time_ms?: number
  completed?: boolean
  last_screen_reached?: number
  joined_waitlist?: boolean
}

interface SubmitResult {
  success: boolean
  error?: string
}

export async function upsertResponse(payload: ResponsePayload): Promise<SubmitResult> {
  try {
    const { error } = await supabase
      .from('responses')
      .upsert(payload, { onConflict: 'session_id' })

    if (error) {
      console.error('[Come Back] Supabase response upsert failed:', {
        message: error?.message,
        code: error?.code,
        details: error?.details,
        hint: error?.hint,
        full: JSON.stringify(error)
      })
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Supabase response error'
    console.error('[Come Back] Supabase response upsert failed:', error)
    return { success: false, error: message }
  }
}

export async function joinWaitlist(email: string, sessionId: string): Promise<SubmitResult> {
  try {
    const { error } = await supabase
      .from('waitlist')
      .insert({ email, session_id: sessionId })

    if (error) {
      if (error.code === '23505') {
        return { success: true }
      }

      console.error('[Come Back] Supabase waitlist insert failed:', {
        message: error?.message,
        code: error?.code,
        details: error?.details,
        hint: error?.hint,
        full: JSON.stringify(error)
      })
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Supabase waitlist error'
    console.error('[Come Back] Supabase waitlist insert failed:', error)
    return { success: false, error: message }
  }
}
