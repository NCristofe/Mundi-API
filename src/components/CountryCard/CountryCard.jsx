import { Image, StyleSheet, Text, View } from 'react-native'

export default function CountryCard({ country }) {
  const name = country?.name ?? 'País'
  const flag = country?.flagUrl
  const capital = country?.capital ?? 'Sem capital informada'

  return (
    <View style={styles.card}>
      {flag && <Image style={styles.flag} source={{ uri: flag }} accessibilityLabel={`Bandeira de ${name}`} />}
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.capital}>{capital}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    minHeight: 88,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e7e4',
  },
  flag: {
    width: 68,
    height: 46,
    borderRadius: 3,
    backgroundColor: '#edf1ef',
  },
  details: {
    flex: 1,
  },
  name: {
    color: '#202a31',
    fontSize: 16,
    fontWeight: '700',
  },
  capital: {
    marginTop: 4,
    color: '#59665f',
    fontSize: 14,
  },
})
