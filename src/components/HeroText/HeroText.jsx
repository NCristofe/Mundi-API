import { StyleSheet } from 'react-native'
import PixelText from '../PixelText/PixelText.jsx'
import { useThemedStyles } from '../../context/ThemeContext.jsx'

export default function HeroText({ children = 'Descubra cada\npaís do mundo', size = 24, style }) {
  const styles = useThemedStyles(createStyles)
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

const createStyles = (colors) =>
  StyleSheet.create({
    text: {
      color: colors.heroText,
      textShadowColor: colors.heroShadow,
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
    },
  })
