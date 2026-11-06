import { StyleSheet, View } from 'react-native'
import PixelBox from '../PixelBox/PixelBox.jsx'
import { useThemedStyles } from '../../context/ThemeContext.jsx'

// Botão único que alterna entre "grid" (modo blocos) e "list" (modo lista).
// O ícone mostra o modo para o qual vai trocar ao tocar.
export default function ViewToggle({ value = 'grid', onChange, style }) {
  const styles = useThemedStyles(createStyles)
  const isGrid = value === 'grid'
  const nextMode = isGrid ? 'list' : 'grid'

  return (
    <PixelBox
      style={[styles.button, style]}
      onPress={() => onChange?.(nextMode)}
      accessibilityRole="button"
      accessibilityLabel={isGrid ? 'Mudar para modo lista' : 'Mudar para modo blocos'}
    >
      {nextMode === 'grid' ? (
        <View style={styles.grid}>
          {[0, 1, 2, 3].map((index) => (
            <View key={index} style={styles.square} />
          ))}
        </View>
      ) : (
        <View style={styles.list}>
          {[0, 1, 2].map((index) => (
            <View key={index} style={styles.bar} />
          ))}
        </View>
      )}
    </PixelBox>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    button: {
      width: 44,
      height: 44,
    },
    grid: {
      width: 26,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 2,
    },
    square: {
      width: 12,
      height: 12,
      backgroundColor: colors.border,
    },
    list: {
      gap: 3,
    },
    bar: {
      width: 26,
      height: 6,
      backgroundColor: colors.border,
    },
  })
