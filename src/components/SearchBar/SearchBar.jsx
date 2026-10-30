import { Image, StyleSheet, TextInput } from 'react-native'
import PixelBox from '../PixelBox/PixelBox.jsx'
import { colors, fonts } from '../theme.js'

const searchIcon = require('../../assets/icons/search.png')

export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Pesquise o país..', style }) {
  return (
    <PixelBox style={[styles.wrapper, style]} contentStyle={styles.content}>
      <Image source={searchIcon} style={styles.icon} />
      <TextInput
        accessibilityLabel={placeholder}
        style={[styles.input, !value && styles.inputEmpty]}
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        returnKeyType="search"
        autoCorrect={false}
      />
    </PixelBox>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 48,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
    gap: 7,
  },
  icon: {
    width: 22,
    height: 22,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    paddingHorizontal: 0,
    color: colors.text,
    fontFamily: fonts.pixel,
    fontSize: 10,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  inputEmpty: {
    textAlign: 'center',
  },
})
