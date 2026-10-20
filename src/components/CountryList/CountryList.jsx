import { FlatList, StyleSheet, Text } from 'react-native'
import CountryCard from '../CountryCard/CountryCard.jsx'

export default function CountryList({ countries = [] }) {
  return (
    <FlatList
      data={countries}
      keyExtractor={(country) => country.code}
      renderItem={({ item }) => <CountryCard country={item} />}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <Text style={styles.separator} />}
      ListEmptyComponent={<Text style={styles.empty}>Nenhum país para exibir.</Text>}
      keyboardShouldPersistTaps="handled"
    />
  )
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  separator: {
    height: 10,
  },
  empty: {
    paddingVertical: 20,
    color: '#59665f',
    fontSize: 15,
  },
})
