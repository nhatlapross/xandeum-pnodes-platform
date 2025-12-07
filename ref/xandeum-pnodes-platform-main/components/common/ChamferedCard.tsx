'use client'

import styled from '@emotion/styled'
import { cn } from '@/lib/utils'

type ChamferPosition = 'top' | 'top-left' | 'top-right' | 'all'

interface ChamferedCardProps {
  children: React.ReactNode
  className?: string
  /** Which corners to chamfer */
  chamfer?: ChamferPosition
  /** Size of the chamfer in pixels (8=small, 12=medium, 16-20=large) */
  size?: number
}

const chamferPaths = {
  'top': (s: number) => `polygon(
    ${s}px 0, calc(100% - ${s}px) 0, 100% ${s}px,
    100% 100%, 0 100%, 0 ${s}px
  )`,
  'top-left': (s: number) => `polygon(
    ${s}px 0, 100% 0, 100% 100%, 0 100%, 0 ${s}px
  )`,
  'top-right': (s: number) => `polygon(
    0 0, calc(100% - ${s}px) 0, 100% ${s}px,
    100% 100%, 0 100%
  )`,
  'all': (s: number) => `polygon(
    ${s}px 0, calc(100% - ${s}px) 0, 100% ${s}px,
    100% calc(100% - ${s}px), calc(100% - ${s}px) 100%,
    ${s}px 100%, 0 calc(100% - ${s}px), 0 ${s}px
  )`,
}

const ChamferedWrapper = styled.div<{ $chamfer: ChamferPosition; $size: number }>`
  clip-path: ${p => chamferPaths[p.$chamfer](p.$size)};
`

export function ChamferedCard({
  children,
  className,
  chamfer = 'top',
  size = 12,
}: ChamferedCardProps) {
  return (
    <ChamferedWrapper
      $chamfer={chamfer}
      $size={size}
      className={cn('p-6 bg-background', className)}
    >
      {children}
    </ChamferedWrapper>
  )
}

/** Chamfered card with visible accent border on cut edges */
const ChamferedWithBorderWrapper = styled.div<{ $size: number; $accentColor: string }>`
  --chamfer: ${p => p.$size}px;
  position: relative;
  clip-path: polygon(
    var(--chamfer) 0,
    calc(100% - var(--chamfer)) 0,
    100% var(--chamfer),
    100% 100%,
    0 100%,
    0 var(--chamfer)
  );

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(135deg, ${p => p.$accentColor} var(--chamfer), transparent var(--chamfer)),
      linear-gradient(-135deg, ${p => p.$accentColor} var(--chamfer), transparent var(--chamfer));
    background-size: 100% 2px;
    background-repeat: no-repeat;
    background-position: top left, top right;
    pointer-events: none;
  }
`

interface ChamferedCardWithBorderProps {
  children: React.ReactNode
  className?: string
  size?: number
  accentColor?: string
}

export function ChamferedCardWithBorder({
  children,
  className,
  size = 12,
  accentColor = 'var(--primary)',
}: ChamferedCardWithBorderProps) {
  return (
    <ChamferedWithBorderWrapper
      $size={size}
      $accentColor={accentColor}
      className={cn('p-6 bg-background', className)}
    >
      {children}
    </ChamferedWithBorderWrapper>
  )
}
