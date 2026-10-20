import { Pressable, StyleSheet, View } from 'react-native'
import { colors, pixel } from '../theme.js'

// Caixa base do design: fundo cinza, borda preta de 5px e sombra dura deslocada 6px.
// A sombra é uma View atrás da caixa porque `elevation` no Android não faz sombra sem blur.
export default function PixelBox({ children, onPress, style, contentStyle, accessibilityLabel, accessibilityState }) {
  const content = (pressed) => (
    <>
      <View style={styles.shadow} />
      <View style={[styles.box, pressed && styles.pressed, contentStyle]}>{children}</View>
    </>
  )

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={style}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={accessibilityState}
      >
        {({ pressed }) => content(pressed)}
      </Pressable>
    )
  }

  return <View style={style}>{content(false)}</View>
}

const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    top: pixel.shadowOffset,
    left: pixel.shadowOffset,
    right: -pixel.shadowOffset,
    bottom: -pixel.shadowOffset,
    backgroundColor: colors.shadow,
  },
  box: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: pixel.borderWidth,
    borderColor: colors.border,
  },
  pressed: {
    transform: [{ translateX: pixel.shadowOffset / 2 }, { translateY: pixel.shadowOffset / 2 }],
  },
})
