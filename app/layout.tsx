import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Come Back — Help us build the porn recovery app you actually need',
  description: 'Quitting porn is hard. We\'re building something different. 3 questions, 30 seconds, anonymous.',
  openGraph: {
    title: 'Come Back — Recovery app for those who actually want to quit',
    description: 'A blocker that doesn\'t show a wall. It moves the urge through your body.',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
