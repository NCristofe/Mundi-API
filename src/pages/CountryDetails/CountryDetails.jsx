import { StyleSheet, Text, View } from 'react-native'

export default function CountryDetails() {
  return <View style={styles.page}><Text accessibilityRole="header" style={styles.title}>Detalhes do país</Text></View>
}

const styles = StyleSheet.create({ page: { flex: 1 }, title: { fontSize: 24, fontWeight: '700' } })
