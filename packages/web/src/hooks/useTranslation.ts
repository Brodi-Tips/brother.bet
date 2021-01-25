// ..src/hooks/useTranslation.ts
import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'

export default function useTranslation() {
  const { localization } = useContext(LanguageContext)

  function t(key: string) {
    if (!localization.translations[key]) {
      console.warn(`Translation '${key}' for locale '${localization.locale}' not found.`)
    }

    const result = localization.translations[key] || ''

    return result
  }

  return {
    t,
    locale: localization.locale,
  }
}
