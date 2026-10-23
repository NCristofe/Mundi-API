import { Image, StyleSheet, View, useWindowDimensions } from 'react-native'
import { colors } from '../theme.js'

const flagsArt = require('../../assets/images/bandeiras.png')

// Proporção da arte exportada do Figma (402×499)
const ART_WIDTH = 402
const ART_HEIGHT = 499
const FADE_STEPS = 8

// Mosaico inclinado de bandeiras do topo da tela inicial.
// A arte começa no topo, na largura da tela, e é cortada pela parte de baixo; o fade leva as bandeiras até o fundo.
export default function FlagMosaic({ height = 360, fadeColor = colors.background, style }) {
  const { width: screenWidth } = useWindowDimensions()

  return (
    <View style={[styles.container, { height }, style]} pointerEvents="none">
      <Image source={flagsArt} style={{ width: screenWidth, height: (screenWidth * ART_HEIGHT) / ART_WIDTH }} />
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
