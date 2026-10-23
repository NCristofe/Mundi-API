import { Image, StyleSheet, useWindowDimensions } from 'react-native'

const heroText = require('../../assets/images/digite-o-nome.png')

// Tamanho nativo da arte exportada do Figma (313×52); reduz só quando a tela é estreita
const HERO_WIDTH = 313
const HERO_HEIGHT = 52
const SIDE_MARGIN = 40

// Texto de destaque da tela inicial ("Digite o nome de um país"), usando a arte do Figma
export default function HeroText({ style }) {
  const { width: screenWidth } = useWindowDimensions()
  const width = Math.min(HERO_WIDTH, screenWidth - SIDE_MARGIN)

  return (
    <Image
      source={heroText}
      accessibilityRole="header"
      accessibilityLabel="Digite o nome de um país"
      style={[styles.text, { width, height: (width * HERO_HEIGHT) / HERO_WIDTH }, style]}
    />
  )
}

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
  },
})
