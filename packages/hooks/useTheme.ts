import type { Theme, ThemeMode } from '../types/theme'

export default function useTheme(mode: ThemeMode, theme: Theme) {
  if (mode === 'light') {
    return theme.light
  } else if (mode === 'dark') {
    return theme.dark
  }
}
