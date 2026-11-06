import { StyleSheet, View } from 'react-native'
import { useTheme } from '../../context/ThemeContext.jsx'
import PixelBox from '../PixelBox/PixelBox.jsx'

// Ícones desenhados em uma grade 9×9 de "pixels" (1 = pintado)
const MOON = [
  '...####..',
  '..###....',
  '.###.....',
  '.###.....',
  '.###.....',
  '.###.....',
  '..###...#',
  '...######',
  '....####.',
]

const SUN = [
  '....#....',
  '.#.....#.',
  '...###...',
  '..#####..',
  '#.#####.#',
  '..#####..',
  '...###...',
  '.#.....#.',
  '....#....',
]

const MOON_COLOR = '#2B3A8C'
const SUN_COLOR = '#FFC83D'

// Botão que alterna entre modo claro e escuro. O ícone mostra o modo para o qual vai trocar.
export default function ThemeToggle({ size = 44, style }) {
  const { mode, toggleTheme } = useTheme()
  const isDark = mode === 'dark'
  const grid = isDark ? SUN : MOON
  const pixelSize = Math.max(2, Math.floor((size * 0.55) / grid.length))

  return (
    <PixelBox
      style={[{ width: size, height: size }, style]}
      onPress={toggleTheme}
      accessibilityLabel={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      <View>
        {grid.map((row, y) => (
          <View key={y} style={styles.row}>
            {row.split('').map((cell, x) => (
              <View
                key={x}
                style={{
                  width: pixelSize,
                  height: pixelSize,
                  backgroundColor: cell === '#' ? (isDark ? SUN_COLOR : MOON_COLOR) : 'transparent',
                }}
              />
            ))}
          </View>
        ))}
      </View>
    </PixelBox>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
})
