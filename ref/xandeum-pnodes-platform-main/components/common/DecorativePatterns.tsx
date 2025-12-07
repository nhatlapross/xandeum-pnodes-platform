'use client'

import styled from '@emotion/styled'
import { cn } from '@/lib/utils'

// =============================================================================
// DOT GRID BACKGROUND
// =============================================================================

type DotGridVariant = 'default' | 'subtle' | 'accent'

interface DotGridProps {
  children: React.ReactNode
  className?: string
  variant?: DotGridVariant
  /** Dot spacing in pixels */
  spacing?: number
}

const dotGridStyles = {
  default: (spacing: number) => `
    background-image: radial-gradient(circle, var(--border) 1px, transparent 1px);
    background-size: ${spacing}px ${spacing}px;
  `,
  subtle: (spacing: number) => `
    background-image: radial-gradient(circle, var(--muted-foreground) 1px, transparent 1px);
    background-size: ${spacing}px ${spacing}px;
    opacity: 0.3;
  `,
  accent: (spacing: number) => `
    background-image: radial-gradient(circle, var(--primary) 1px, transparent 1px);
    background-size: ${spacing}px ${spacing}px;
    opacity: 0.15;
  `,
}

const DotGridWrapper = styled.div<{ $variant: DotGridVariant; $spacing: number }>`
  ${p => dotGridStyles[p.$variant](p.$spacing)}
`

export function DotGrid({
  children,
  className,
  variant = 'default',
  spacing = 16,
}: DotGridProps) {
  return (
    <DotGridWrapper
      $variant={variant}
      $spacing={spacing}
      className={cn(className)}
    >
      {children}
    </DotGridWrapper>
  )
}

// =============================================================================
// DOT DIVIDER (Double line)
// =============================================================================

interface DotDividerProps {
  className?: string
  /** Dot color */
  color?: string
  /** Dot size in pixels */
  dotSize?: number
  /** Horizontal spacing between dots */
  spacing?: number
  /** Number of lines (2 or 3) */
  lines?: 2 | 3
  /** Use muted gray instead of accent */
  muted?: boolean
}

const DotDividerDouble = styled.div<{
  $color: string
  $dotSize: number
  $spacing: number
}>`
  height: ${p => p.$spacing * 2}px;
  width: 100%;
  background-image:
    radial-gradient(circle, ${p => p.$color} ${p => p.$dotSize}px, transparent ${p => p.$dotSize}px),
    radial-gradient(circle, ${p => p.$color} ${p => p.$dotSize}px, transparent ${p => p.$dotSize}px);
  background-size: ${p => p.$spacing}px ${p => p.$spacing}px;
  background-position: 0 0, 0 ${p => p.$spacing}px;
  background-repeat: repeat-x;
`

const DotDividerTriple = styled.div<{
  $color: string
  $dotSize: number
  $spacing: number
}>`
  height: ${p => p.$spacing * 3}px;
  width: 100%;
  background-image:
    radial-gradient(circle, ${p => p.$color} ${p => p.$dotSize}px, transparent ${p => p.$dotSize}px),
    radial-gradient(circle, ${p => p.$color} ${p => p.$dotSize}px, transparent ${p => p.$dotSize}px),
    radial-gradient(circle, ${p => p.$color} ${p => p.$dotSize}px, transparent ${p => p.$dotSize}px);
  background-size: ${p => p.$spacing}px ${p => p.$spacing}px;
  background-position: 0 0, 0 ${p => p.$spacing}px, 0 ${p => p.$spacing * 2}px;
  background-repeat: repeat-x;
`

export function DotDivider({
  className,
  color,
  dotSize = 1.5,
  spacing = 8,
  lines = 2,
  muted = false,
}: DotDividerProps) {
  const resolvedColor = color ?? (muted ? 'var(--muted-foreground)' : 'var(--primary)')

  const Component = lines === 3 ? DotDividerTriple : DotDividerDouble

  return (
    <Component
      $color={resolvedColor}
      $dotSize={dotSize}
      $spacing={spacing}
      className={cn(className)}
    />
  )
}

// =============================================================================
// SINGLE DOT LINE
// =============================================================================

interface DotLineProps {
  className?: string
  color?: string
  dotSize?: number
  spacing?: number
}

const DotLineStyled = styled.div<{
  $color: string
  $dotSize: number
  $spacing: number
}>`
  height: 2px;
  width: 100%;
  background-image: radial-gradient(circle, ${p => p.$color} ${p => p.$dotSize}px, transparent ${p => p.$dotSize}px);
  background-size: ${p => p.$spacing}px 2px;
  background-repeat: repeat-x;
`

export function DotLine({
  className,
  color = 'var(--primary)',
  dotSize = 1,
  spacing = 6,
}: DotLineProps) {
  return (
    <DotLineStyled
      $color={color}
      $dotSize={dotSize}
      $spacing={spacing}
      className={cn(className)}
    />
  )
}

// =============================================================================
// DOT PROGRESS BAR
// =============================================================================

interface DotProgressProps {
  /** Progress percentage (0-100) */
  percent: number
  className?: string
  /** Height in pixels */
  height?: number
  /** Use gradient fill */
  gradient?: boolean
}

const DotProgressTrack = styled.div<{ $height: number }>`
  height: ${p => p.$height}px;
  background-image:
    radial-gradient(circle, var(--border) 1.5px, transparent 1.5px),
    radial-gradient(circle, var(--border) 1.5px, transparent 1.5px);
  background-size: 8px 4px;
  background-position: 0 0, 4px 4px;
  overflow: hidden;
`

const DotProgressFill = styled.div<{ $percent: number; $gradient: boolean }>`
  height: 100%;
  width: ${p => p.$percent}%;
  background: ${p => p.$gradient
    ? 'linear-gradient(90deg, var(--success), var(--primary))'
    : 'var(--primary)'};
  transition: width 0.3s ease;
`

export function DotProgress({
  percent,
  className,
  height = 12,
  gradient = false,
}: DotProgressProps) {
  const clampedPercent = Math.max(0, Math.min(100, percent))

  return (
    <DotProgressTrack $height={height} className={cn(className)}>
      <DotProgressFill $percent={clampedPercent} $gradient={gradient} />
    </DotProgressTrack>
  )
}
