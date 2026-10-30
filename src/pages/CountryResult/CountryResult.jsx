import { useEffect, useRef, useState } from 'react'
import { BackHandler, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BackButton from '../../components/BackButton/BackButton.jsx'
import CountryHeader from '../../components/CountryHeader/CountryHeader.jsx'
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton.jsx'
import InfoField from '../../components/InfoField/InfoField.jsx'
import Loading from '../../components/Loading/Loading.jsx'
import MapButton from '../../components/MapButton/MapButton.jsx'
import PixelText from '../../components/PixelText/PixelText.jsx'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import { colors } from '../../components/theme.js'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import { findCountry } from '../../services/countriesApi.js'
import CountryMap from '../CountryMap/CountryMap.jsx'

// Medidas da tela de resultado do Figma, em um frame de 402 de largura
const FRAME_WIDTH = 402
const MAX_SCALE = 1.25 // evita elementos gigantes em tablet e web

export default function CountryResult({ country, onBack, onSelectCountry }) {
  const insets = useSafeAreaInsets()
  const { width: screenWidth } = useWindowDimensions()
  const scrollRef = useRef(null)
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState('')
  const [mapOpen, setMapOpen] = useState(false)
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.some((favorite) => favorite.code === country.code)

  const scale = Math.min(screenWidth / FRAME_WIDTH, MAX_SCALE)

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (mapOpen) setMapOpen(false)
      else onBack()
      return true
    })
    return () => subscription.remove()
  }, [mapOpen, onBack])

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false })
  }, [country.code])

  async function handleSubmit() {
    const search = query.trim()
    if (!search) return

    setSearching(true)
    setError('')

    try {
      const found = await findCountry(search)
      if (found) {
        setQuery('')
        onSelectCountry(found)
      } else {
        setError('Nenhum país encontrado.')
      }
    } catch {
      setError('Não foi possível buscar o país.')
    } finally {
      setSearching(false)
    }
  }

  if (mapOpen) {
    return <CountryMap country={country} onBack={() => setMapOpen(false)} />
  }

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.screen}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingTop: insets.top + 18 * scale, paddingBottom: insets.bottom + 57 * scale }}
    >
      <BackButton onPress={onBack} style={{ marginLeft: 16 * scale }} />
      <FavoriteButton
        active={isFavorite}
        onPress={() => toggleFavorite(country)}
        width={40 * scale}
        height={40 * scale}
        iconSize={24 * scale}
        style={[styles.favorite, { top: insets.top + 14 * scale, right: 38 * scale }]}
      />

      <View style={[styles.content, { width: 327 * scale, marginTop: 23 * scale }]}>
        <SearchBar value={query} onChange={setQuery} onSubmit={handleSubmit} />
        {searching ? <Loading label="Buscando..." /> : null}
        {error ? (
          <PixelText size={10} style={styles.error}>
            {error}
          </PixelText>
        ) : null}

        <CountryHeader country={country} style={{ marginTop: 39 * scale }} />
        <MapButton
          url={country.mapUrl}
          onPress={country.coordinates ? () => setMapOpen(true) : undefined}
          style={{ marginTop: 27 * scale }}
        />

        <View style={{ marginTop: 44 * scale, gap: 44 * scale }}>
          <InfoField icon="capital" label="Capital" value={country.capital} />
          <InfoField icon="population" label="População" value={country.population} />
          <InfoField icon="currency" label="Moeda" value={country.currency} />
          <InfoField icon="continent" label="Continente" value={country.continent} />
          <InfoField icon="language" label="Idioma" value={country.language} />
          <InfoField icon="phone" label="Código telefônico" value={country.callingCode} />
          <InfoField icon="area" label="Área" value={country.area} />
          <InfoField icon="hemisphere" label="Hemisfério" value={country.hemisphere} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  favorite: {
    position: 'absolute',
  },
  content: {
    alignSelf: 'center',
  },
  error: {
    marginTop: 14,
    color: colors.error,
  },
})
