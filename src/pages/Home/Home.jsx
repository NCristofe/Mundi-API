import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import CountryList from '../../components/CountryList/CountryList.jsx'
import Loading from '../../components/Loading/Loading.jsx'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import { getCountries } from '../../services/api.js'

export default function Home() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
  )

  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <Text style={styles.eyebrow}>EXPLORE O MUNDO</Text>
        <Text accessibilityRole="header" style={styles.title}>Descubra novos lugares.</Text>
        <Text style={styles.description}>Encontre países e conheça o que faz cada lugar único.</Text>
        <SearchBar value={query} onChange={setQuery} />
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
    paddingTop: 28,
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
