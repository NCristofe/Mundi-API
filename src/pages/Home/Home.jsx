import { useEffect, useState } from 'react'
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CountryList from '../../components/CountryList/CountryList.jsx'
import FlagMosaic from '../../components/FlagMosaic/FlagMosaic.jsx'
import GlobeWithClouds from '../../components/GlobeWithClouds/GlobeWithClouds.jsx'
import HeroText from '../../components/HeroText/HeroText.jsx'
import Loading from '../../components/Loading/Loading.jsx'
import PixelBox from '../../components/PixelBox/PixelBox.jsx'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import { colors } from '../../components/theme.js'
import { searchCountries } from '../../services/countriesApi.js'

const heart = require('../../assets/icons/heart.png')

// Proporções extraídas da tela inicial do Figma (a altura da tela é a referência)
const GUTTER = 20
const MOSAIC_RATIO = 0.5
const SEARCH_RATIO = 0.53
const GLOBE_RATIO = 0.79
const SEARCH_DEBOUNCE_MS = 400

export default function Home({ onOpenFavorites }) {
  const insets = useSafeAreaInsets()
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  async function loadCountries(search = query) {
    setLoading(true)
    setError('')

    try {
      setCountries(await searchCountries(search.trim()))
    } catch {
      setError('Não foi possível carregar os países.')
    } finally {
      setLoading(false)
    }
  }

  // A busca acontece na API; o debounce evita uma requisição por tecla
  useEffect(() => {
    const timer = setTimeout(() => loadCountries(query), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [query])

  // Sem texto na busca, a tela mostra o texto de destaque e o globo.
  // Com busca, a área abaixo da busca vira a lista de países.
  const showResults = query.trim().length > 0
  const showList = showResults && !loading && !error

  const mosaicHeight = Math.round(screenHeight * MOSAIC_RATIO)
  const searchTop = Math.round(screenHeight * SEARCH_RATIO)
  const globeTop = Math.round(screenHeight * GLOBE_RATIO)
  const globeWidth = Math.min(screenWidth - 20, 394)

  return (
    <View style={styles.container}>
      <FlagMosaic height={mosaicHeight} style={styles.mosaic} />

      {!showResults ? (
        <GlobeWithClouds width={globeWidth} style={[styles.globe, { top: globeTop, left: (screenWidth - globeWidth) / 2 }]} />
      ) : null}

      <View style={[styles.content, { paddingTop: searchTop, paddingBottom: insets.bottom }]}>
        <View style={styles.searchRow}>
          <SearchBar value={query} onChange={setQuery} style={styles.searchInput} />
          <PixelBox
            onPress={onOpenFavorites}
            style={styles.favoriteButton}
            accessibilityLabel="Abrir favoritos"
          >
            <Image source={heart} style={styles.heart} />
          </PixelBox>
        </View>

        {loading ? <Loading /> : null}

        {showList ? <CountryList countries={countries} /> : null}
        {!showResults ? <HeroText style={styles.hero} /> : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mosaic: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  globe: {
    position: 'absolute',
  },
  content: {
    flex: 1,
    paddingHorizontal: GUTTER,
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
  },
  heart: {
    width: 28,
    height: 28,
  },
  hero: {
    marginTop: 40,
  },
})
