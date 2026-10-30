import { StyleSheet, View } from 'react-native'
import PixelText from '../PixelText/PixelText.jsx'

export default function Loading({ label = 'Carregando...' }) {
  return (
    <View style={styles.container} accessibilityRole="progressbar" accessibilityLabel={label}>
      <PixelText size={10}>{label}</PixelText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
  },
})
