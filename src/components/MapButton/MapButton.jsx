import { Image, Linking, StyleSheet, View } from 'react-native'
import PixelBox from '../PixelBox/PixelBox.jsx'
import PixelText from '../PixelText/PixelText.jsx'

const globeIcon = require('../../assets/icons/globe.png')

export default function MapButton({ url, onPress, style }) {
  const handlePress = onPress ?? (url ? () => Linking.openURL(url) : undefined)

  return (
    <View style={[styles.row, style]}>
      <PixelBox style={styles.label} onPress={handlePress} accessibilityLabel="Ver no mapa">
        <PixelText>Ver no Mapa →</PixelText>
      </PixelBox>
      <PixelBox style={styles.iconBox} onPress={handlePress} accessibilityLabel="Ver no mapa">
        <Image source={globeIcon} style={styles.icon} />
      </PixelBox>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  label: {
    flex: 1,
    height: 56,
  },
  iconBox: {
    width: 57,
    height: 57,
  },
  icon: {
    width: 35,
    height: 35,
  },
})
