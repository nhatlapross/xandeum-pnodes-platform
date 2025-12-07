'use client'

import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

export function EmotionProvider({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => {
    const cache = createCache({ key: 'css' })
    cache.compat = true
    return cache
  })

  useServerInsertedHTML(() => {
    const entries = Object.entries(cache.inserted)
    if (entries.length === 0) return null

    const names = entries
      .filter(([, value]) => typeof value === 'string')
      .map(([name]) => name)
      .join(' ')

    const styles = entries
      .filter(([, value]) => typeof value === 'string')
      .map(([, value]) => value)
      .join('')

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
}
