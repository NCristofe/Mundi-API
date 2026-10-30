import { useMemo, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BackButton from '../../components/BackButton/BackButton.jsx'
import CountryGridCard from '../../components/CountryGridCard/CountryGridCard.jsx'
import CountryListItem from '../../components/CountryListItem/CountryListItem.jsx'
import PixelText from '../../components/PixelText/PixelText.jsx'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import ViewToggle from '../../components/ViewToggle/ViewToggle.jsx'
import { colors } from '../../components/theme.js'
import { useFavorites } from '../../context/FavoritesContext.jsx'

function normalizeText(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR')
}

export default function Favorites({ onBack }) {
  const insets = useSafeAreaInsets()
  const { favorites, toggleFavorite } = useFavorites()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  const filteredFavorites = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim())
    return favorites.filter((country) => normalizeText(country.name).includes(normalizedQuery))
  }, [favorites, query])

  function renderCountry({ item }) {
    const onToggleFavorite = () => toggleFavorite(item)

    return viewMode === 'list' ? (
      <CountryListItem country={item} favorite onToggleFavorite={onToggleFavorite} />
    ) : (
      <CountryGridCard country={item} favorite onToggleFavorite={onToggleFavorite} />
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <BackButton onPress={onBack} />
        <ViewToggle value={viewMode} onChange={setViewMode} />
      </View>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Pesquisar nos favoritos"
        style={styles.search}
      />

      <FlatList
        key={viewMode}
        data={filteredFavorites}
        keyExtractor={(country) => country.code}
        renderItem={renderCountry}
        numColumns={viewMode === 'grid' ? 2 : 1}
        contentContainerStyle={[
          styles.list,
          filteredFavorites.length === 0 && styles.emptyList,
        ]}
        columnWrapperStyle={viewMode === 'grid' ? styles.gridRow : undefined}
        ItemSeparatorComponent={viewMode === 'list' ? () => <View style={styles.separator} /> : null}
        ListEmptyComponent={
          <PixelText size={9} style={styles.emptyText}>
            Nenhum favorito encontrado.
          </PixelText>
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  search: {
    marginTop: 26,
  },
  list: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyText: {
    paddingHorizontal: 8,
  },
  separator: {
    height: 14,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 22,
  },
})
