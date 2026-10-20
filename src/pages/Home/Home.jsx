import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CountryList from '../../components/CountryList/CountryList.jsx'
import Loading from '../../components/Loading/Loading.jsx'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import { getCountries } from '../../services/api.js'

const HEADER_HEIGHT = 60
const INTRO_PADDING_TOP = 28
const SEARCH_BAR_TOP_FROM_SCREEN = 567

function getCountryCode(country) {
  return country?.cca3 ?? country?.name?.common ?? country?.name
}

export default function Home() {
  const insets = useSafeAreaInsets()
  const [introHeaderHeight, setIntroHeaderHeight] = useState(0)
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const { favorites } = useFavorites()

  async function loadCountries() {
    setLoading(true)
    setError('')

    try {
      setCountries(await getCountries())
    } catch {
      setError('Não foi possível carregar os países.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCountries()
  }, [])

  const favoriteCodes = new Set(favorites.map(getCountryCode))

  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
    )
    .filter((country) => !showFavoritesOnly || favoriteCodes.has(getCountryCode(country)))

  const searchRowMarginTop = Math.max(
    0,
    SEARCH_BAR_TOP_FROM_SCREEN - insets.top - HEADER_HEIGHT - INTRO_PADDING_TOP - introHeaderHeight,
  )

  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <View onLayout={(event) => setIntroHeaderHeight(event.nativeEvent.layout.height)}>
          <Text style={styles.eyebrow}>EXPLORE O MUNDO</Text>
          <Text accessibilityRole="header" style={styles.title}>Descubra novos lugares.</Text>
          <Text style={styles.description}>Encontre países e conheça o que faz cada lugar único.</Text>
        </View>
        <View style={[styles.searchRow, { marginTop: searchRowMarginTop }]}>
          <SearchBar value={query} onChange={setQuery} style={styles.searchInput} />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              showFavoritesOnly ? 'Mostrar todos os países' : 'Mostrar apenas favoritos'
            }
            onPress={() => setShowFavoritesOnly((current) => !current)}
            style={[styles.favoriteButton, showFavoritesOnly && styles.favoriteButtonActive]}
          >
            <Text style={[styles.favoriteIcon, showFavoritesOnly && styles.favoriteIconActive]}>
              {showFavoritesOnly ? '★' : '☆'}
            </Text>
          </Pressable>
        </View>
      </View>
      {loading ? <Loading /> : null}
      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable accessibilityRole="button" onPress={loadCountries} style={styles.retryButton}>
            <Text style={styles.retryText}>Tentar novamente</Text>
          </Pressable>
        </View>
      ) : null}
      {!loading && !error ? <CountryList countries={filteredCountries} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  intro: {
    paddingTop: INTRO_PADDING_TOP,
    paddingBottom: 8,
  },
  eyebrow: {
    marginBottom: 8,
    color: '#176b55',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: '#202a31',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 36,
  },
  description: {
    marginTop: 8,
    marginBottom: 20,
    color: '#59665f',
    fontSize: 15,
    lineHeight: 22,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
  },
  favoriteButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
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
  favoriteButtonActive: {
    backgroundColor: '#176b55',
  },
  favoriteIcon: {
    fontSize: 22,
    color: '#59665f',
  },
  favoriteIconActive: {
    color: '#fff',
  },
  errorBox: {
    paddingVertical: 20,
  },
  errorText: {
    color: '#9b332b',
    fontSize: 15,
  },
  retryButton: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#176b55',
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
  },
})
