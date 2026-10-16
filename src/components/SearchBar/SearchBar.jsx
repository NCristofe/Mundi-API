import { StyleSheet, TextInput } from 'react-native'

export default function SearchBar({ value, onChange, placeholder = 'Buscar países' }) {
  return (
    <TextInput
        accessibilityLabel={placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#78847e"
        returnKeyType="search"
      />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    paddingHorizontal: 14,
    color: '#202a31',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dce5e1',
    borderRadius: 8,
    fontSize: 16,
  },
})
