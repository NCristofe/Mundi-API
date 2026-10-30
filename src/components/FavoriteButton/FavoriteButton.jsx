import { Image, StyleSheet } from 'react-native'
import PixelBox from '../PixelBox/PixelBox.jsx'

const heartFilled = require('../../assets/icons/heart-filled.png')
const heartOutline = require('../../assets/icons/heart-empty.png')

export default function FavoriteButton({ active = false, onPress, width = 48, height = 48, iconSize = 28, style }) {
  return (
    <PixelBox
      onPress={onPress}
      style={[{ width, height }, style]}
      accessibilityLabel={active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      accessibilityState={{ selected: active }}
    >
      <FavoriteIcon active={active} size={iconSize} />
    </PixelBox>
  )
}

export function FavoriteIcon({ active, size = 28, style }) {
  return <Image source={active ? heartFilled : heartOutline} style={[{ width: size, height: size }, styles.icon, style]} />
}

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
})
