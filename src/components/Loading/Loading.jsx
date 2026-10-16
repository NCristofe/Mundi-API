import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export default function Loading({ label = 'Carregando...' }) {
  return (
    <View style={styles.container} accessibilityRole="progressbar" accessibilityLabel={label}>
      <ActivityIndicator color="#176b55" />
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 24,
  },
  label: {
    color: '#59665f',
    fontSize: 15,
  },
})
