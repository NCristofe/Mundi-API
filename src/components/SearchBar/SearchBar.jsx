import { StyleSheet, TextInput, View } from 'react-native'

export default function SearchBar({ value, onChange, placeholder = 'Buscar países', style }) {
  return (
    <View style={[styles.wrapper, style]}>
      <TextInput
        accessibilityLabel={placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#78847e"
        returnKeyType="search"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 48,
    backgroundColor: '#EBEBEB',
    borderWidth: 5,
    borderColor: '#000000',
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    color: '#202a31',
    fontSize: 16,
  },
})
