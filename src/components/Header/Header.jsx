import { StyleSheet, Text, View } from 'react-native'

export default function Header() {
  return (
    <View style={styles.header}>
      <Text accessibilityRole="header" style={styles.title}>
        Mundi
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dce5e1',
  },
  title: {
    color: '#176b55',
    fontSize: 21,
    fontWeight: '700',
  },
})
