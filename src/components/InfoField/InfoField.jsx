import { Image, StyleSheet, View } from 'react-native'
import PixelBox from '../PixelBox/PixelBox.jsx'
import PixelText from '../PixelText/PixelText.jsx'

export const infoIcons = {
  capital: require('../../assets/icons/capital.png'),
  population: require('../../assets/icons/population.png'),
  currency: require('../../assets/icons/currency.png'),
  continent: require('../../assets/icons/continent.png'),
  language: require('../../assets/icons/language.png'),
  phone: require('../../assets/icons/phone.png'),
  area: require('../../assets/icons/area.png'),
  hemisphere: require('../../assets/icons/hemisphere.png'),
}

// Bloco da tela de resultado: título em cima, ícone + valor embaixo
export default function InfoField({ label, value, icon, style }) {
  return (
    <View style={[styles.field, style]}>
      <PixelBox style={styles.labelBox}>
        <PixelText>{label}</PixelText>
      </PixelBox>
      <View style={styles.row}>
        <PixelBox style={styles.iconBox}>
          <Image source={typeof icon === 'string' ? infoIcons[icon] : icon} style={styles.icon} />
        </PixelBox>
        <PixelBox style={styles.valueBox} contentStyle={styles.valueContent}>
          <PixelText numberOfLines={2} adjustsFontSizeToFit>
            {value ?? '—'}
          </PixelText>
        </PixelBox>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  field: {
    gap: 15,
  },
  labelBox: {
    height: 57,
  },
  row: {
    flexDirection: 'row',
    gap: 15,
  },
  iconBox: {
    width: 57,
    height: 57,
  },
  icon: {
    width: 35,
    height: 35,
  },
  valueBox: {
    flex: 1,
    height: 57,
  },
  valueContent: {
    paddingHorizontal: 8,
  },
})
