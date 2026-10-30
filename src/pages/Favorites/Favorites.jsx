import { useEffect, useMemo, useState } from 'react'
import { BackHandler, FlatList, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BackButton from '../../components/BackButton/BackButton.jsx'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog.jsx'
import CountryListItem from '../../components/CountryListItem/CountryListItem.jsx'
import PixelText from '../../components/PixelText/PixelText.jsx'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import ViewToggle from '../../components/ViewToggle/ViewToggle.jsx'
import { colors } from '../../components/theme.js'
import { useFavorites } from '../../context/FavoritesContext.jsx'

function normalizeText(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR')
}

export default function Favorites({ onBack, onSelectCountry }) {
  const insets = useSafeAreaInsets()
  const { favorites, toggleFavorite } = useFavorites()
  const [query, setQuery] = useState('')
  const [countryToRemove, setCountryToRemove] = useState(null)
  // Lista fixada ao abrir a tela: quem é desfavoritado continua visível, com o coração vazio
  const [listedCountries] = useState(favorites)
  const favoriteCodes = new Set(favorites.map((favorite) => favorite.code))
  const filteredFavorites = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim())
    return listedCountries.filter((country) => normalizeText(country.name).includes(normalizedQuery))
  }, [listedCountries, query])

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack()
      return true
    })
    return () => subscription.remove()
  }, [onBack])

  function handleToggleFavorite(country) {
    if (favoriteCodes.has(country.code)) setCountryToRemove(country)
    else toggleFavorite(country)
  }

  function confirmRemoval() {
    toggleFavorite(countryToRemove)
    setCountryToRemove(null)
  }

  function renderCountry({ item }) {
    return (
      <CountryListItem
        country={item}
        favorite={favoriteCodes.has(item.code)}
        onPress={() => onSelectCountry(item)}
        onToggleFavorite={() => handleToggleFavorite(item)}
      />
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <BackButton onPress={onBack} />
        <ViewToggle value="list" showGrid={false} />
      </View>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Pesquisar nos favoritos"
        style={styles.search}
      />

      <FlatList
        data={filteredFavorites}
        extraData={favorites}
        keyExtractor={(country) => country.code}
        renderItem={renderCountry}
        contentContainerStyle={[
          styles.list,
          filteredFavorites.length === 0 && styles.emptyList,
        ]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <PixelText size={10} style={styles.emptyText}>
            Nenhum favorito encontrado.
          </PixelText>
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />

      <ConfirmDialog
        visible={countryToRemove !== null}
        message={`Tem certeza que quer tirar ${countryToRemove?.name} dos favoritos?`}
        confirmLabel="Tirar"
        onConfirm={confirmRemoval}
        onCancel={() => setCountryToRemove(null)}
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
})
