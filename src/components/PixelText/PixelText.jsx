import { StyleSheet, Text } from 'react-native'
import { colors, fonts } from '../theme.js'

export default function PixelText({ children, size = 16, color = colors.text, style, ...props }) {
  return (
    <Text
      style={[styles.text, { fontSize: size, lineHeight: Math.round(size * 1.5), color }, style]}
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
