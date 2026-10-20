import { StatusBar } from 'expo-status-bar'
import { Image, StyleSheet, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Header from './components/Header/Header.jsx'
import Home from './pages/Home/Home.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="dark" />
          <Header />
          <View style={styles.page}>
            <Home />
          </View>
          <View style={styles.footer}>
            <Image
              source={require('./assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </SafeAreaView>
      </FavoritesProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D1FFF2',
  },
  page: {
    flex: 1,
    paddingHorizontal: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#D1FFF2',
  },
  logo: {
    width: 160,
    height: 45,
  },
})
