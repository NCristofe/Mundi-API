import { StyleSheet } from 'react-native'
import PixelText from '../PixelText/PixelText.jsx'
import { colors } from '../theme.js'

export default function HeroText({ children = 'Descubra cada\npaís do mundo', size = 24, style }) {
  return (
    <PixelText
      size={size}
      accessibilityRole="header"
      style={[styles.text, { lineHeight: Math.round(size * 1.1) }, style]}
    >
      {children}
    </PixelText>
  )
}

const styles = StyleSheet.create({
  text: {
    color: colors.border,
    textShadowColor: colors.white,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
})
