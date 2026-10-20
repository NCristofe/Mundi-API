import { Image, Pressable, StyleSheet, View } from 'react-native'
import { FavoriteIcon } from '../FavoriteButton/FavoriteButton.jsx'
import PixelBox from '../PixelBox/PixelBox.jsx'
import PixelText from '../PixelText/PixelText.jsx'

// Card da tela de favoritos (modo blocos): bandeira com coração no canto + nome
export default function CountryGridCard({ country, favorite = false, onPress, onToggleFavorite, style }) {
  return (
    <View style={[styles.card, style]}>
      <View>
        <PixelBox style={styles.flagBox} onPress={onPress} accessibilityLabel={country.name}>
          {country.flagUrl ? <Image source={{ uri: country.flagUrl }} style={styles.flag} /> : null}
        </PixelBox>
        <Pressable
          onPress={onToggleFavorite}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          accessibilityState={{ selected: favorite }}
          style={styles.heart}
        >
          <FavoriteIcon active={favorite} size={28} />
        </Pressable>
      </View>
      <PixelBox style={styles.nameBox} contentStyle={styles.nameContent} onPress={onPress}>
        <PixelText size={8} numberOfLines={3}>
          {country.name}
        </PixelText>
      </PixelBox>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 154,
    gap: 11,
  },
  flagBox: {
    height: 117,
  },
  flag: {
    width: 144,
    height: 107,
    resizeMode: 'cover',
  },
  heart: {
    position: 'absolute',
    top: -6,
    right: -6,
  },
  nameBox: {
    height: 44,
  },
  nameContent: {
    paddingHorizontal: 6,
  },
})
