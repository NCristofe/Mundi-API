import { useEffect, useState } from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CountryList from '../../components/CountryList/CountryList.jsx'
import { FavoriteIcon } from '../../components/FavoriteButton/FavoriteButton.jsx'
import FlagMosaic from '../../components/FlagMosaic/FlagMosaic.jsx'
import GlobeWithClouds from '../../components/GlobeWithClouds/GlobeWithClouds.jsx'
import HeroText from '../../components/HeroText/HeroText.jsx'
import Loading from '../../components/Loading/Loading.jsx'
import PixelBox from '../../components/PixelBox/PixelBox.jsx'
import PixelText from '../../components/PixelText/PixelText.jsx'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import { colors } from '../../components/theme.js'
import { findCountry, searchCountries } from '../../services/countriesApi.js'

// Medidas da tela inicial do Figma, em um frame de 402×874
const FRAME_WIDTH = 402
const FRAME_HEIGHT = 874
const MAX_SCALE = 1.25 // evita elementos gigantes em tablet e web
const GUTTER = 20
const SEARCH_DEBOUNCE_MS = 400

export default function Home({ onSelectCountry, onOpenFavorites }) {
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

  async function handleSubmit() {
    const search = query.trim()
    if (!search) return

    setLoading(true)
    setError('')

    try {
      const found = await findCountry(search)
      if (found) onSelectCountry(found)
      else setError('Nenhum país encontrado.')
    } catch {
      setError('Não foi possível buscar o país.')
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

  // Tamanhos seguem a largura da tela; posições verticais seguem a altura
  const scale = Math.min(screenWidth / FRAME_WIDTH, MAX_SCALE)
  const yOf = (figmaY) => Math.round((figmaY / FRAME_HEIGHT) * screenHeight)

  const searchTop = yOf(454)
  const searchHeight = 48 * scale
  const globeWidth = 394 * scale

  return (
    <View style={styles.container}>
      <FlagMosaic height={yOf(415)} style={styles.mosaic} />

      {!showResults ? (
        <GlobeWithClouds
          width={globeWidth}
          style={[styles.globe, { top: yOf(653), left: (screenWidth - globeWidth) / 2 }]}
          leftCloudStyle={{ top: 46 * scale }}
          rightCloudStyle={{ top: 149 * scale }}
        />
      ) : null}

      <View style={[styles.content, { paddingTop: searchTop, paddingBottom: insets.bottom }]}>
        <View style={[styles.searchRow, { width: 327 * scale, gap: 9 * scale }]}>
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
            style={[styles.searchInput, { height: searchHeight }]}
          />
          <PixelBox
            onPress={onOpenFavorites}
            style={{ width: searchHeight, height: searchHeight }}
            accessibilityLabel="Abrir favoritos"
          >
            <FavoriteIcon active size={28 * scale} />
          </PixelBox>
        </View>

        {showResults && loading ? <Loading /> : null}

        {showResults && error ? (
          <PixelText size={10} style={styles.error}>
            {error}
          </PixelText>
        ) : null}

        {showList ? (
          <View style={[styles.results, { width: 327 * scale }]}>
            <CountryList countries={countries} onSelectCountry={onSelectCountry} />
          </View>
        ) : null}
        {!showResults ? (
          <HeroText size={24 * scale} style={{ marginTop: yOf(574) - searchTop - searchHeight }} />
        ) : null}
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
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
  },
  results: {
    flex: 1,
    alignSelf: 'center',
  },
  error: {
    marginTop: 20,
    color: colors.error,
  },
})
