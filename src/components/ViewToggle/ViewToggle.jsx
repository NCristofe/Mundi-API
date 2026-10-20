import { StyleSheet, View } from 'react-native'
import PixelBox from '../PixelBox/PixelBox.jsx'
import { colors } from '../theme.js'

// Alterna entre "grid" (modo blocos) e "list" (modo lista) na tela de favoritos
export default function ViewToggle({ value = 'grid', onChange, style }) {
  return (
    <View style={[styles.row, style]}>
      <PixelBox
        style={styles.button}
        onPress={() => onChange?.('grid')}
        accessibilityLabel="Modo blocos"
        accessibilityState={{ selected: value === 'grid' }}
      >
        <View style={styles.grid}>
          {[0, 1, 2, 3].map((index) => (
            <View key={index} style={[styles.square, value !== 'grid' && styles.inactive]} />
          ))}
        </View>
      </PixelBox>
      <PixelBox
        style={styles.button}
        onPress={() => onChange?.('list')}
        accessibilityLabel="Modo lista"
        accessibilityState={{ selected: value === 'list' }}
      >
        <View style={styles.list}>
          {[0, 1, 2].map((index) => (
            <View key={index} style={[styles.bar, value !== 'list' && styles.inactive]} />
          ))}
        </View>
      </PixelBox>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 14,
  },
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
  inactive: {
    backgroundColor: colors.placeholder,
  },
})
