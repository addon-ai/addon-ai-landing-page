import { create } from 'zustand'

type ThemeMode = 'dark' | 'light'

interface ThemeState {
  mode: ThemeMode
  toggle: () => void
  setMode: (mode: ThemeMode) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'dark',
  toggle: () =>
    set((state) => {
      const next = state.mode === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      localStorage.setItem('theme', next)
      return { mode: next }
    }),
  setMode: (mode) => {
    document.documentElement.setAttribute('data-theme', mode)
    localStorage.setItem('theme', mode)
    set({ mode })
  },
}))
