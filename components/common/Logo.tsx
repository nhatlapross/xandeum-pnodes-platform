'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  /** Height in pixels (width auto-calculated from aspect ratio) */
  height?: number
  className?: string
}

// Full logo with "NODE" text (aspect ratio ~2.55:1)
export function Logo({ height = 32, className }: LogoProps) {
  const [isDark, setIsDark] = useState(false)
  const width = Math.round(height * 2.55) // 958/376 ≈ 2.55

  useEffect(() => {
    // Check initial state
    const checkDark = () => {
      const dark = document.documentElement.classList.contains('dark')
      setIsDark(dark)
    }
    checkDark()

    // Watch for changes with immediate update
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains('dark')
      // Use queueMicrotask for immediate update
      queueMicrotask(() => setIsDark(dark))
    })

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <Image
      src={isDark ? '/full-logo-dark.svg' : '/full-logo-light.svg'}
      alt="Xnode"
      width={width}
      height={height}
      priority
      className={cn('shrink-0 transition-opacity duration-150', className)}
    />
  )
}

// Compact logo for collapsed sidebar
export function LogoIcon({ size = 32, className }: { size?: number; className?: string }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDark = () => {
      const dark = document.documentElement.classList.contains('dark')
      setIsDark(dark)
    }
    checkDark()

    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains('dark')
      queueMicrotask(() => setIsDark(dark))
    })

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <Image
      src={isDark ? '/logo-dark.svg' : '/logo-light.svg'}
      alt="Xnode"
      width={size}
      height={size}
      priority
      className={cn('shrink-0 transition-opacity duration-150', className)}
    />
  )
}
