import { StyleSheet, Text, View } from 'react-native'

export default function Favorites() {
  return <View style={styles.page}><Text accessibilityRole="header" style={styles.title}>Favoritos</Text></View>
}

const styles = StyleSheet.create({ page: { flex: 1 }, title: { fontSize: 24, fontWeight: '700' } })
