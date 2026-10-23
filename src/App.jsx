import { PressStart2P_400Regular, useFonts } from '@expo-google-fonts/press-start-2p'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { colors } from './components/theme.js'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import Home from './pages/Home/Home.jsx'
import Splash from './pages/Splash/Splash.jsx'

export default function App() {
  const [fontsLoaded] = useFonts({ PressStart2P_400Regular })
  const [splashDone, setSplashDone] = useState(false)

  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <View style={styles.root}>
          <StatusBar style="dark" />
          {!splashDone ? <Splash onFinish={() => setSplashDone(true)} /> : null}
          {splashDone && fontsLoaded ? <Home /> : null}
        </View>
      </FavoritesProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
