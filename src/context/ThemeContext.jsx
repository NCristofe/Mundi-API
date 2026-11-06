import { createContext, useContext, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'
import { darkColors, lightColors } from '../components/theme.js'

const ThemeContext = createContext({
  mode: 'light',
  colors: lightColors,
  toggleTheme: () => {},
})

// Segue o tema do sistema até o usuário escolher um modo pelo botão
export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme()
  const [chosenMode, setChosenMode] = useState(null)
  const mode = chosenMode ?? (systemScheme === 'dark' ? 'dark' : 'light')

  const value = useMemo(
    () => ({
      mode,
      colors: mode === 'dark' ? darkColors : lightColors,
      toggleTheme: () => setChosenMode(mode === 'dark' ? 'light' : 'dark'),
    }),
    [mode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

// Recebe uma função (colors) => StyleSheet declarada fora do componente
export function useThemedStyles(createStyles) {
  const { colors } = useTheme()
  return useMemo(() => createStyles(colors), [createStyles, colors])
}
