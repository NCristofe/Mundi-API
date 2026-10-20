import { PressStart2P_400Regular, useFonts } from '@expo-google-fonts/press-start-2p'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../components/BackButton/BackButton.jsx'
import CountryGridCard from '../../components/CountryGridCard/CountryGridCard.jsx'
import CountryHeader from '../../components/CountryHeader/CountryHeader.jsx'
import CountryListItem from '../../components/CountryListItem/CountryListItem.jsx'
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton.jsx'
import FlagMosaic from '../../components/FlagMosaic/FlagMosaic.jsx'
import GlobeWithClouds from '../../components/GlobeWithClouds/GlobeWithClouds.jsx'
import HeroText from '../../components/HeroText/HeroText.jsx'
import InfoField from '../../components/InfoField/InfoField.jsx'
import MapButton from '../../components/MapButton/MapButton.jsx'
import PixelBox from '../../components/PixelBox/PixelBox.jsx'
import PixelText from '../../components/PixelText/PixelText.jsx'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import ViewToggle from '../../components/ViewToggle/ViewToggle.jsx'
import { colors } from '../../components/theme.js'
import { searchCountries } from '../../services/countriesApi.js'

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <PixelText size={10} style={styles.sectionTitle}>
        {title}
      </PixelText>
      {children}
    </View>
  )
}

export default function ComponentsDemo() {
  const [fontsLoaded] = useFonts({ PressStart2P_400Regular })
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [selected, setSelected] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    const timer = setTimeout(async () => {
      setLoading(true)
      setError('')
      try {
        const result = await searchCountries(query.trim())
        if (cancelled) return
        setCountries(result)
        setSelected((current) => result.find((country) => country.code === current?.code) ?? result[0] ?? null)
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message ?? err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }, 400)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query])

  function toggleFavorite(code) {
    setFavorites((current) => (current.includes(code) ? current.filter((item) => item !== code) : [...current, code]))
  }

  if (!fontsLoaded) {
    return <ActivityIndicator style={styles.fontLoading} color={colors.text} />
  }

  const listed = countries.slice(0, 6)

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <PixelText size={14} style={styles.pageTitle}>
            Componentes Mundi
          </PixelText>

          <Section title="PixelBox / PixelText">
            <PixelBox style={styles.demoBox}>
              <PixelText>Caixa base</PixelText>
            </PixelBox>
            <PixelBox style={styles.demoBox} onPress={() => {}}>
              <PixelText>Pressionável</PixelText>
            </PixelBox>
          </Section>

          <Section title="BackButton / ViewToggle">
            <View style={styles.toolbar}>
              <BackButton onPress={() => setSelected(null)} />
              <ViewToggle value={viewMode} onChange={setViewMode} />
            </View>
          </Section>

          <Section title="SearchBar / FavoriteButton">
            <View style={styles.searchRow}>
              <SearchBar value={query} onChange={setQuery} style={styles.searchInput} />
              <FavoriteButton
                active={selected ? favorites.includes(selected.code) : false}
                onPress={() => selected && toggleFavorite(selected.code)}
              />
            </View>
            <SearchBar placeholder="Pesquisar nos favoritos" />
            {loading ? <ActivityIndicator color={colors.text} /> : null}
            {error ? (
              <PixelText size={10} style={styles.error}>
                {error}
              </PixelText>
            ) : null}
          </Section>

          <Section title="FlagMosaic">
            <FlagMosaic flags={countries.map((country) => country.flagUrl).filter(Boolean)} height={260} />
          </Section>

          <Section title="HeroText">
            <HeroText />
          </Section>

          <Section title="GlobeWithClouds">
            <GlobeWithClouds width={300} style={styles.center} />
          </Section>

          <Section title="CountryListItem">
            {listed.map((country) => (
              <CountryListItem
                key={country.code}
                country={country}
                favorite={favorites.includes(country.code)}
                onPress={() => setSelected(country)}
                onToggleFavorite={() => toggleFavorite(country.code)}
              />
            ))}
          </Section>

          <Section title="CountryGridCard">
            <View style={styles.grid}>
              {listed.map((country) => (
                <CountryGridCard
                  key={country.code}
                  country={country}
                  favorite={favorites.includes(country.code)}
                  onPress={() => setSelected(country)}
                  onToggleFavorite={() => toggleFavorite(country.code)}
                />
              ))}
            </View>
          </Section>

          {selected ? (
            <Section title="CountryHeader / MapButton / InfoField">
              <CountryHeader country={selected} />
              <MapButton url={selected.mapUrl} />
              <InfoField icon="capital" label="Capital" value={selected.capital} />
              <InfoField icon="population" label="População" value={selected.population} />
              <InfoField icon="currency" label="Moeda" value={selected.currency} />
              <InfoField icon="continent" label="Continente" value={selected.continent} />
              <InfoField icon="language" label="Idioma" value={selected.language} />
              <InfoField icon="phone" label="Código telefônico" value={selected.callingCode} />
              <InfoField icon="area" label="Área" value={selected.area} />
              <InfoField icon="hemisphere" label="Hemisfério" value={selected.hemisphere} />
            </Section>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  fontLoading: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 38,
    paddingVertical: 24,
    gap: 40,
  },
  pageTitle: {
    marginBottom: -8,
  },
  section: {
    gap: 20,
  },
  sectionTitle: {
    textAlign: 'left',
    color: colors.placeholder,
  },
  demoBox: {
    height: 56,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchRow: {
    flexDirection: 'row',
    gap: 9,
  },
  searchInput: {
    flex: 1,
  },
  error: {
    color: '#C00000',
  },
  center: {
    alignSelf: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 24,
  },
})
