export type ThemePreference = 'auto' | 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

const ORDER: ThemePreference[] = ['auto', 'light', 'dark']

function applyToDocument(preference: ThemePreference) {
  const root = document.documentElement
  if (preference === 'auto') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', preference)
}

/**
 * Theme preference shared across components.
 * 'auto' follows the OS; 'light' / 'dark' override it and are stored in localStorage.
 * The initial value on the server is always 'auto'; the stored value is picked up after mount
 * (an inline script in app.vue applies it to <html> before first paint so there is no flash).
 */
export function useTheme() {
  const preference = useState<ThemePreference>('theme-preference', () => 'auto')

  function set(next: ThemePreference) {
    preference.value = next
    try {
      if (next === 'auto') localStorage.removeItem(THEME_STORAGE_KEY)
      else localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage may be unavailable (private mode, blocked). The choice still applies for this page.
    }
    applyToDocument(next)
  }

  function cycle() {
    const index = ORDER.indexOf(preference.value)
    set(ORDER[(index + 1) % ORDER.length]!)
  }

  onMounted(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY)
      if (stored === 'light' || stored === 'dark') preference.value = stored
    } catch {
      // ignore
    }
  })

  return { preference, set, cycle }
}
