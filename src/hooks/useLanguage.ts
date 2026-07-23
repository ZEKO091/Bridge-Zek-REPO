import { useState, useEffect } from 'react'
import { t, onLangChange, getLang, setLang, Lang } from '../lib/i18n'

export function useLanguage() {
  const [, setTick] = useState(0)

  useEffect(() => {
    return onLangChange(() => setTick(t => t + 1))
  }, [])

  return { t: t as (key: string, vars?: Record<string, string | number>) => string, lang: getLang(), setLang }
}
