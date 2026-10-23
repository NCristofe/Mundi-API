import { Animated, Image, StyleSheet, View } from 'react-native'

const globe = require('../../assets/images/globe.png')
const cloud = require('../../assets/images/cloud.png')

// Medidas da Splashscreen do Figma, com o globo de 394px como referência
const BASE_WIDTH = 394
const GLOBE_RATIO = 451 / 456
const CLOUD_RATIO = 279 / 435

// globeStyle, leftCloudStyle e rightCloudStyle recebem estilos animados (Animated.Value)
// e são aplicados nos wrappers, não nas imagens, para não sobrescrever a rotação da nuvem da direita.
export default function GlobeWithClouds({ width = BASE_WIDTH, style, globeStyle, leftCloudStyle, rightCloudStyle }) {
  const scale = width / BASE_WIDTH
  const height = width * GLOBE_RATIO
  const leftCloudWidth = 203 * scale
  const rightCloudWidth = 193 * scale

  return (
    <View style={[{ width, height }, style]} accessibilityRole="image" accessibilityLabel="Globo">
      <Animated.View style={[StyleSheet.absoluteFill, globeStyle]}>
        <Image source={globe} style={{ width, height }} />
      </Animated.View>
      <Animated.View
        style={[
          styles.cloud,
          { left: -6 * scale, top: 138 * scale, width: leftCloudWidth, height: leftCloudWidth * CLOUD_RATIO },
          leftCloudStyle,
        ]}
      >
        <Image source={cloud} style={styles.fill} />
      </Animated.View>
      <Animated.View
        style={[
          styles.cloud,
          { left: 205 * scale, top: 196 * scale, width: rightCloudWidth, height: rightCloudWidth * CLOUD_RATIO },
          rightCloudStyle,
        ]}
      >
        <Image source={cloud} style={[styles.fill, styles.flipped]} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  cloud: {
    position: 'absolute',
  },
  fill: {
    width: '100%',
    height: '100%',
  },
  flipped: {
    transform: [{ rotate: '180deg' }],
  },
})
