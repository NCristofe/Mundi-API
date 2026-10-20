import { Image, StyleSheet, View } from 'react-native'
import FavoriteButton from '../FavoriteButton/FavoriteButton.jsx'
import PixelBox from '../PixelBox/PixelBox.jsx'
import PixelText from '../PixelText/PixelText.jsx'

// Linha da tela de favoritos (modo lista): bandeira + nome + coração
export default function CountryListItem({ country, favorite = false, onPress, onToggleFavorite, style }) {
  return (
    <View style={[styles.row, style]}>
      <PixelBox style={styles.flagBox} contentStyle={styles.flagContent} onPress={onPress} accessibilityLabel={country.name}>
        {country.flagUrl ? <Image source={{ uri: country.flagUrl }} style={styles.flag} /> : null}
      </PixelBox>
      <PixelBox style={styles.nameBox} contentStyle={styles.nameContent} onPress={onPress} accessibilityLabel={country.name}>
        <PixelText size={8} numberOfLines={3}>
          {country.name}
        </PixelText>
      </PixelBox>
      <FavoriteButton active={favorite} onPress={onToggleFavorite} width={48} height={51} iconSize={32} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 13,
  },
  flagBox: {
    width: 67,
    height: 51,
  },
  flagContent: {
    padding: 0,
  },
  flag: {
    width: 57,
    height: 41,
    resizeMode: 'cover',
  },
  nameBox: {
    flex: 1,
    height: 51,
  },
  nameContent: {
    paddingHorizontal: 8,
  },
})
