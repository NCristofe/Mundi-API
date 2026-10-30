import { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import FlagViewer from '../FlagViewer/FlagViewer.jsx'
import PixelBox from '../PixelBox/PixelBox.jsx'
import PixelText from '../PixelText/PixelText.jsx'

// Topo da tela de resultado: nome do país + bandeira grande, que amplia ao tocar
export default function CountryHeader({ country, style }) {
  const [flagOpen, setFlagOpen] = useState(false)

  return (
    <View style={[styles.header, style]}>
      <PixelBox style={styles.nameBox} contentStyle={styles.nameContent}>
        <PixelText numberOfLines={2} adjustsFontSizeToFit accessibilityRole="header">
          {country.name}
        </PixelText>
      </PixelBox>
      <PixelBox
        style={styles.flagBox}
        onPress={country.flagUrl ? () => setFlagOpen(true) : undefined}
        accessibilityLabel={`Ampliar bandeira de ${country.name}`}
      >
        {country.flagUrl ? (
          <Image source={{ uri: country.flagUrl }} style={styles.flag} accessibilityLabel={`Bandeira de ${country.name}`} />
        ) : null}
      </PixelBox>
      <FlagViewer visible={flagOpen} uri={country.flagUrl} name={country.name} onClose={() => setFlagOpen(false)} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: 254,
    alignSelf: 'center',
    gap: 17,
  },
  nameBox: {
    height: 48,
  },
  nameContent: {
    paddingHorizontal: 8,
  },
  flagBox: {
    height: 193,
  },
  flag: {
    width: 244,
    height: 183,
    resizeMode: 'cover',
  },
})
