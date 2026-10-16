import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import Header from './components/Header/Header.jsx'
import Home from './pages/Home/Home.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'

export default function App() {
  return (
    <FavoritesProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <Header />
        <View style={styles.page}>
          <Home />
        </View>
      </SafeAreaView>
    </FavoritesProvider>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7f6',
  },
  page: {
    flex: 1,
    paddingHorizontal: 20,
  },
})
