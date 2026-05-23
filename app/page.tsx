'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import QuestionScreen from '@/components/QuestionScreen'
import RevealScreen from '@/components/RevealScreen'
import DemoIntroScreen from '@/components/DemoIntroScreen'
import BlockPanicScreen from '@/components/BlockPanicScreen'
import BreathingScreen from '@/components/BreathingScreen'
import PushUpInstructionsScreen from '@/components/PushUpInstructionsScreen'
import PushUpCameraScreen from '@/components/PushUpCameraScreen'
import DemoOutroScreen from '@/components/DemoOutroScreen'
import TrackerTeaserScreen from '@/components/TrackerTeaserScreen'
import BrainRecoveryScreen from '@/components/BrainRecoveryScreen'
import CommunityMilestoneScreen from '@/components/CommunityMilestoneScreen'
import PayScreen from '@/components/PayScreen'
import WaitlistScreen from '@/components/WaitlistScreen'
import ThankYouScreen from '@/components/ThankYouScreen'
import { initSession, SessionData } from '@/lib/analytics'
import { joinWaitlist, upsertResponse, ResponsePayload } from '@/lib/submitResponse'

interface Answers {
  q1_years: string | null
  q2_promises: string | null
  q3_cost: string | null
  q4_pay: string | null
  waitlist_email: string | null
}

interface ScreenTimings {
  [key: number]: { entered: number; left: number | null }
}

type SurveyAnswers = Omit<Answers, 'waitlist_email'>

export default function Home() {
  const [step, setStep] = useState(1)
  const [session, setSession] = useState<SessionData | null>(null)
  const [demoSite, setDemoSite] = useState('')
  const [answers, setAnswers] = useState<Answers>({
    q1_years: null,
    q2_promises: null,
    q3_cost: null,
    q4_pay: null,
    waitlist_email: null,
  })
  const [joinedWaitlist, setJoinedWaitlist] = useState(false)
  const timingsRef = useRef<ScreenTimings>({})

  useEffect(() => {
    setSession(initSession())
    timingsRef.current[1] = { entered: Date.now(), left: null }
  }, [])

  const buildResponsePayload = (
    currentSession: SessionData,
    currentAnswers: SurveyAnswers,
    lastScreenReached: number,
    completed: boolean,
    joined?: boolean
  ): ResponsePayload => {
    const payload: ResponsePayload = {
      session_id: currentSession.sessionId,
      device_type: currentSession.deviceType,
      os: currentSession.os,
      browser: currentSession.browser,
      screen_width: currentSession.screenWidth,
      screen_height: currentSession.screenHeight,
      timezone: currentSession.timezone,
      language: currentSession.language,
      total_session_time_ms: Date.now() - currentSession.startTime,
      last_screen_reached: lastScreenReached,
    }

    if (currentSession.utmSource) payload.utm_source = currentSession.utmSource
    if (currentSession.utmMedium) payload.utm_medium = currentSession.utmMedium
    if (currentSession.utmCampaign) payload.utm_campaign = currentSession.utmCampaign
    if (currentSession.referrer) payload.referrer = currentSession.referrer

    if (currentAnswers.q1_years) payload.q1_years = currentAnswers.q1_years
    if (currentAnswers.q2_promises) payload.q2_promises = currentAnswers.q2_promises
    if (currentAnswers.q3_cost) payload.q3_cost = currentAnswers.q3_cost
    if (currentAnswers.q4_pay) payload.q4_pay = currentAnswers.q4_pay

    const screen1Timing = timingsRef.current[1]
    const screen2Timing = timingsRef.current[2]
    const screen3Timing = timingsRef.current[3]
    const screen4Timing = timingsRef.current[4]
    const screen5Timing = timingsRef.current[5]

    if (screen1Timing?.left) payload.time_on_screen_1_ms = screen1Timing.left - screen1Timing.entered
    if (screen2Timing?.left) payload.time_on_screen_2_ms = screen2Timing.left - screen2Timing.entered
    if (screen3Timing?.left) payload.time_on_screen_3_ms = screen3Timing.left - screen3Timing.entered
    if (screen4Timing?.left) payload.time_on_screen_4_ms = screen4Timing.left - screen4Timing.entered
    if (screen5Timing?.left) payload.time_on_screen_5_ms = screen5Timing.left - screen5Timing.entered

    if (completed) payload.completed = true
    if (joined) payload.joined_waitlist = true

    return payload
  }

  const recordScreenTransition = (fromStep: number, toStep: number) => {
    const now = Date.now()
    if (timingsRef.current[fromStep]) {
      timingsRef.current[fromStep].left = now
    }
    timingsRef.current[toStep] = { entered: now, left: null }
  }

  const goToStep = (
    newStep: number,
    nextAnswers: SurveyAnswers,
    options: { completed?: boolean; joinedWaitlist?: boolean } = {}
  ) => {
    const fromStep = step
    recordScreenTransition(step, newStep)
    if (session) {
      const payload = buildResponsePayload(
        session,
        nextAnswers,
        fromStep,
        options.completed === true,
        options.joinedWaitlist === true
      )
      void upsertResponse(payload)
    }
    setStep(newStep)
  }

  const handleQ1 = (value: string) => {
    const nextAnswers = { ...answers, q1_years: value }
    setAnswers(nextAnswers)
    goToStep(2, nextAnswers)
  }

  const handleQ2 = (value: string) => {
    const nextAnswers = { ...answers, q2_promises: value }
    setAnswers(nextAnswers)
    goToStep(3, nextAnswers)
  }

  const handleQ3 = (value: string) => {
    const nextAnswers = { ...answers, q3_cost: value }
    setAnswers(nextAnswers)
    goToStep(4, nextAnswers)
  }

  const handleRevealContinue = () => {
    goToStep(5, answers)
  }

  const handleDemoIntroContinue = (siteText: string) => {
    setDemoSite(siteText)
    goToStep(6, answers)
  }

  const handleQ4 = (value: string) => {
    const nextAnswers = { ...answers, q4_pay: value }
    setAnswers(nextAnswers)
    goToStep(15, nextAnswers)
  }

  const handleWaitlistJoin = (email: string) => {
    const nextAnswers = { ...answers, waitlist_email: email }
    setAnswers(nextAnswers)
    setJoinedWaitlist(true)
    goToStep(16, nextAnswers, { completed: true, joinedWaitlist: true })
    if (session) {
      void joinWaitlist(email, session.sessionId)
    }
    console.log('[Come Back] Submission complete with waitlist:', {
      session,
      answers: nextAnswers,
      timings: timingsRef.current,
    })
  }

  const handleWaitlistSkip = () => {
    setJoinedWaitlist(false)
    goToStep(16, answers, { completed: true })
    console.log('[Come Back] Submission complete, skipped waitlist:', {
      session,
      answers,
      timings: timingsRef.current,
    })
  }

  return (
    <main className="min-h-screen w-full">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <QuestionScreen
            key="q1"
            step={1}
            totalSteps={3}
            meta="Anonymous · 30 seconds"
            question="How long has porn been part of your life?"
            subtitle="Be honest. No one will ever see your name."
            options={[
              { value: 'less_than_1', label: 'Less than a year' },
              { value: '1_to_2', label: '1 to 2 years' },
              { value: '3_to_5', label: '3 to 5 years' },
              { value: '6_to_8', label: '6 to 8 years' },
              { value: '9_to_12', label: '9 to 12 years' },
              { value: 'more_than_12', label: 'More than 12 years' },
            ]}
            onSelect={handleQ1}
            glowConfig={{
              color: '#7C3AED',
              position: '{"top":"-100px","right":"-80px"}',
              size: '300px',
            }}
          />
        )}

        {step === 2 && (
          <QuestionScreen
            key="q2"
            step={2}
            totalSteps={3}
            meta="No judgement"
            question={
              <>
                How many times have you said{' '}
                <em
                  className="not-italic"
                  style={{
                    background: 'linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontStyle: 'italic',
                  }}
                >
                  &quot;this is the last time&quot;
                </em>{' '}
                — and then it wasn&apos;t?
              </>
            }
            subtitle="You're not alone. Almost everyone here said this too."
            options={[
              { value: 'few', label: "A few times — I'm just starting to try" },
              { value: 'dozens', label: "Dozens of times. I've lost count." },
              { value: 'hundreds', label: 'Hundreds. Every week I promise.' },
              { value: 'stopped', label: "So many that I've stopped promising" },
            ]}
            onSelect={handleQ2}
            glowConfig={{
              color: '#4F46E5',
              position: '{"bottom":"-100px","left":"-80px"}',
              size: '280px',
            }}
          />
        )}

        {step === 3 && (
          <QuestionScreen
            key="q3"
            step={3}
            totalSteps={3}
            meta="The honest one"
            question="What has porn cost you?"
            subtitle="Pick the one that hurts the most to read."
            options={[
              { value: 'focus', label: "My focus — I can't sit with one thing anymore" },
              { value: 'confidence', label: "My confidence — I don't feel like myself" },
              { value: 'relationships', label: "My relationships — it's affected how I love" },
              { value: 'time', label: "My time — years I'll never get back" },
              { value: 'all', label: 'All of the above' },
            ]}
            onSelect={handleQ3}
            glowConfig={{
              color: '#9333EA',
              position: '{"top":"-120px","left":"30%"}',
              size: '320px',
            }}
          />
        )}

        {step === 4 && (
          <RevealScreen key="reveal" onContinue={handleRevealContinue} />
        )}

        {step === 5 && (
          <DemoIntroScreen key="demo-intro" onContinue={handleDemoIntroContinue} />
        )}

        {step === 6 && (
          <BlockPanicScreen
            key="block-panic"
            site={demoSite}
            onContinue={() => goToStep(7, answers)}
          />
        )}

        {step === 7 && (
          <BreathingScreen key="breathing" onContinue={() => goToStep(8, answers)} />
        )}

        {step === 8 && (
          <PushUpInstructionsScreen key="push-up-instructions" onContinue={() => goToStep(9, answers)} />
        )}

        {step === 9 && (
          <PushUpCameraScreen key="push-up-camera" onContinue={() => goToStep(10, answers)} />
        )}

        {step === 10 && (
          <DemoOutroScreen key="demo-outro" onContinue={() => goToStep(11, answers)} />
        )}

        {step === 11 && (
          <TrackerTeaserScreen key="tracker-teaser" onContinue={() => goToStep(12, answers)} />
        )}

        {step === 12 && (
          <BrainRecoveryScreen key="brain-recovery" onContinue={() => goToStep(13, answers)} />
        )}

        {step === 13 && (
          <CommunityMilestoneScreen key="community-milestone" onContinue={() => goToStep(14, answers)} />
        )}

        {step === 14 && (
          <PayScreen key="pay" onSelect={handleQ4} />
        )}

        {step === 15 && (
          <WaitlistScreen
            key="waitlist"
            onJoin={handleWaitlistJoin}
            onSkip={handleWaitlistSkip}
          />
        )}

        {step === 16 && (
          <ThankYouScreen key="thanks" joinedWaitlist={joinedWaitlist} />
        )}
      </AnimatePresence>
    </main>
  )
}
