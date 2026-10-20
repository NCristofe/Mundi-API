import { StyleSheet } from 'react-native'
import PixelText from '../PixelText/PixelText.jsx'
import { colors } from '../theme.js'

// Texto de destaque da tela inicial ("Digite o nome de um país")
export default function HeroText({ children = 'Digite o nome de um país', style }) {
  return (
    <PixelText size={24} style={[styles.text, style]}>
      {children}
    </PixelText>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#000000',
    textShadowColor: colors.white,
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 1,
  },
})
