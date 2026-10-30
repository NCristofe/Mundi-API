import { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, useWindowDimensions, View } from 'react-native'
import GlobeWithClouds from '../../components/GlobeWithClouds/GlobeWithClouds.jsx'
import { colors } from '../../components/theme.js'

const GUTTER = 16
const MAX_GLOBE_WIDTH = 394 // tamanho de referência do Figma; evita o globo gigante em tablet e web
const FLOAT_HALF_CYCLE_MS = 400
const FLOAT_CYCLES = 2
const HOLD_MS = 400
const EXIT_MS = 500

// Splashscreen animada: globo, nuvem esquerda e nuvem direita têm valores animados próprios.
// Linha do tempo: giro do globo (1,1s) → nuvens (~0,95s) → flutuação (~1,6s) → pausa → saída (0,5s) ≈ 4,55s.
export default function Splash({ onFinish }) {
  const { width: screenWidth } = useWindowDimensions()
  const globeWidth = Math.min(screenWidth - GUTTER * 2, MAX_GLOBE_WIDTH)

  const globeScale = useRef(new Animated.Value(0)).current
  const globeOpacity = useRef(new Animated.Value(0)).current
  const globeSpin = useRef(new Animated.Value(0)).current
  const globeFloat = useRef(new Animated.Value(0)).current

  const leftCloudX = useRef(new Animated.Value(-screenWidth)).current
  const leftCloudFloat = useRef(new Animated.Value(0)).current
  const rightCloudX = useRef(new Animated.Value(screenWidth)).current
  const rightCloudFloat = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const float = (value, distance) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: distance,
            duration: FLOAT_HALF_CYCLE_MS,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: FLOAT_HALF_CYCLE_MS,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
        { iterations: FLOAT_CYCLES },
      )

    const animation = Animated.sequence([
      // 1. Entrada: o globo surge dando uma volta completa
      Animated.parallel([
        Animated.timing(globeScale, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.timing(globeOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(globeSpin, {
          toValue: 1,
          duration: 1100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      // 2. Com o globo parado, as nuvens entram pelos lados em momentos diferentes
      Animated.parallel([
        Animated.timing(leftCloudX, {
          toValue: 0,
          duration: 700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(250),
          Animated.timing(rightCloudX, {
            toValue: 0,
            duration: 700,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]),

      // 3. Flutuação: cada parte sobe e desce no seu ritmo (nuvens em fases opostas)
      Animated.parallel([
        float(globeFloat, -8),
        float(leftCloudFloat, -6),
        float(rightCloudFloat, 6),
      ]),

      Animated.delay(HOLD_MS),

      // 4. Saída: o globo encolhe e cada nuvem sai pelo seu lado
      Animated.parallel([
        Animated.timing(globeScale, {
          toValue: 0,
          duration: EXIT_MS,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(globeOpacity, { toValue: 0, duration: EXIT_MS, useNativeDriver: true }),
        Animated.timing(leftCloudX, {
          toValue: -screenWidth,
          duration: EXIT_MS,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(rightCloudX, {
          toValue: screenWidth,
          duration: EXIT_MS,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ])

    animation.start(({ finished }) => {
      if (finished) onFinish?.()
    })

    return () => animation.stop()
  }, [])

  const globeStyle = {
    opacity: globeOpacity,
    transform: [
      { scale: globeScale },
      { translateY: globeFloat },
      {
        rotate: globeSpin.interpolate({ inputRange: [0, 1], outputRange: ['-360deg', '0deg'] }),
      },
    ],
  }

  const leftCloudStyle = {
    transform: [{ translateX: leftCloudX }, { translateY: leftCloudFloat }],
  }

  const rightCloudStyle = {
    transform: [{ translateX: rightCloudX }, { translateY: rightCloudFloat }],
  }

  return (
    <View style={styles.container}>
      <GlobeWithClouds
        width={globeWidth}
        globeStyle={globeStyle}
        leftCloudStyle={leftCloudStyle}
        rightCloudStyle={rightCloudStyle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
})
