import { FlatList, StyleSheet, View } from 'react-native'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import CountryListItem from '../CountryListItem/CountryListItem.jsx'
import PixelText from '../PixelText/PixelText.jsx'

export default function CountryList({ countries = [], onSelectCountry }) {
  const { favorites, toggleFavorite } = useFavorites()
  const favoriteCodes = new Set(favorites.map((favorite) => favorite.code))

  return (
    <FlatList
      data={countries}
      extraData={favorites}
      keyExtractor={(country) => country.code}
      renderItem={({ item }) => (
        <CountryListItem
          country={item}
          favorite={favoriteCodes.has(item.code)}
          onPress={() => onSelectCountry?.(item)}
          onToggleFavorite={() => toggleFavorite(item)}
        />
      )}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <PixelText size={10} style={styles.empty}>
          Nenhum país para exibir.
        </PixelText>
      }
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  separator: {
    height: 14,
  },
  empty: {
    paddingVertical: 20,
  },
})
