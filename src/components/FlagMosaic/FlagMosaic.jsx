import { Image, StyleSheet, View } from 'react-native'
import { colors } from '../theme.js'

const COLUMNS = 6
const ROWS = 6
const FADE_STEPS = 8

// Mosaico inclinado de bandeiras do topo da tela inicial.
// As bandeiras vêm da API (lista de URLs) e se repetem até preencher a grade.
export default function FlagMosaic({ flags = [], height = 360, fadeColor = colors.background, style }) {
  const tiles = flags.length ? Array.from({ length: COLUMNS * ROWS }, (_, index) => flags[index % flags.length]) : []

  return (
    <View style={[styles.container, { height }, style]} pointerEvents="none">
      <View style={styles.grid}>
        {tiles.map((uri, index) => (
          <View key={index} style={styles.tile}>
            <Image source={{ uri }} style={styles.flag} />
          </View>
        ))}
      </View>
      <View style={styles.fade}>
        {Array.from({ length: FADE_STEPS }, (_, step) => (
          <View key={step} style={[styles.fadeStep, { backgroundColor: fadeColor, opacity: (step + 1) / FADE_STEPS }]} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  grid: {
    position: 'absolute',
    top: -60,
    left: -80,
    width: COLUMNS * 102,
    flexDirection: 'row',
    flexWrap: 'wrap',
    transform: [{ rotate: '-10deg' }],
  },
  tile: {
    width: 102,
    height: 79,
    padding: 2,
  },
  flag: {
    flex: 1,
    borderWidth: 3,
    borderColor: colors.border,
    resizeMode: 'cover',
  },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '45%',
  },
  fadeStep: {
    flex: 1,
  },
})
