import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const body = Instrument_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Kyla Chua — Web Development, BA & QA',
  description: 'Portfolio of Kyla G. Chua, a BS Information Technology student (Web Development) at Sorsogon State University seeking an OJT in Business Analysis / Quality Assurance.',
  openGraph: {
    title: 'Kyla Chua — Portfolio',
    description: 'Figma designs, web projects, and academic work by Kyla G. Chua.',
    images: ['/kyla-chua.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f0f8' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0910' },
  ],
}

// Applies the saved (or system) theme before paint so there's no flash.
const themeScript = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body>
    </html>
  )
}
