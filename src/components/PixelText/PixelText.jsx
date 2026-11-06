import { StyleSheet, Text } from 'react-native'
import { useTheme } from '../../context/ThemeContext.jsx'
import { fonts } from '../theme.js'

export default function PixelText({ children, size = 16, color, style, ...props }) {
  const { colors } = useTheme()

  return (
    <Text
      style={[styles.text, { fontSize: size, lineHeight: Math.round(size * 1.5), color: color ?? colors.text }, style]}
      {...props}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.pixel,
    textAlign: 'center',
  },
})
