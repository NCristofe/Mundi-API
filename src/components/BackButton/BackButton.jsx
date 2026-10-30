import { Image, Pressable, StyleSheet } from 'react-native'

const circle = require('../../assets/icons/back-circle-surface.png')
const arrow = require('../../assets/icons/back-arrow.png')

export default function BackButton({ onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Voltar"
      hitSlop={8}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
    >
      <Image source={circle} style={styles.circle} />
      <Image source={arrow} style={styles.arrow} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  circle: {
    position: 'absolute',
    width: 35,
    height: 35,
  },
  arrow: {
    width: 10,
    height: 16,
    marginLeft: -2,
  },
})
