import { Image, StyleSheet, View } from 'react-native'

const globe = require('../../assets/images/globe.png')
const cloud = require('../../assets/images/cloud.png')

// Medidas da Splashscreen do Figma, com o globo de 394px como referência
const BASE_WIDTH = 394
const GLOBE_RATIO = 451 / 456
const CLOUD_RATIO = 279 / 435

export default function GlobeWithClouds({ width = BASE_WIDTH, style }) {
  const scale = width / BASE_WIDTH
  const leftCloudWidth = 203 * scale
  const rightCloudWidth = 193 * scale

  return (
    <View style={[{ width, height: width * GLOBE_RATIO }, style]} accessibilityRole="image" accessibilityLabel="Globo">
      <Image source={globe} style={{ width, height: width * GLOBE_RATIO }} />
      <Image
        source={cloud}
        style={[styles.cloud, { left: -6 * scale, top: 138 * scale, width: leftCloudWidth, height: leftCloudWidth * CLOUD_RATIO }]}
      />
      <Image
        source={cloud}
        style={[
          styles.cloud,
          styles.flipped,
          { left: 205 * scale, top: 196 * scale, width: rightCloudWidth, height: rightCloudWidth * CLOUD_RATIO },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cloud: {
    position: 'absolute',
  },
  flipped: {
    transform: [{ rotate: '180deg' }],
  },
})
