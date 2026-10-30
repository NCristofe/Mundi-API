import { useEffect, useState } from 'react'
import { Image, Modal, Pressable, StyleSheet, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BackButton from '../BackButton/BackButton.jsx'
import PixelBox from '../PixelBox/PixelBox.jsx'
import { pixel } from '../theme.js'

const DEFAULT_RATIO = 4 / 3
const SIDE_MARGIN = 20
const MAX_HEIGHT_RATIO = 0.7

// Mostra a bandeira inteira e ampliada; as proporções variam de país para país
export default function FlagViewer({ visible, uri, name, onClose }) {
  const insets = useSafeAreaInsets()
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const [ratio, setRatio] = useState(DEFAULT_RATIO)

  useEffect(() => {
    if (!visible || !uri) return
    Image.getSize(uri, (width, height) => setRatio(width / height), () => setRatio(DEFAULT_RATIO))
  }, [visible, uri])

  const border = pixel.borderWidth * 2
  const maxWidth = screenWidth - SIDE_MARGIN * 2 - border - pixel.shadowOffset
  const maxHeight = screenHeight * MAX_HEIGHT_RATIO
  const flagWidth = Math.min(maxWidth, maxHeight * ratio)
  const flagHeight = flagWidth / ratio

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose} accessibilityLabel="Fechar bandeira">
        <BackButton onPress={onClose} style={[styles.back, { top: insets.top + 12, left: 16 }]} />
        <PixelBox style={{ width: flagWidth + border, height: flagHeight + border }}>
          <Image
            source={{ uri }}
            style={{ width: flagWidth, height: flagHeight }}
            accessibilityLabel={`Bandeira de ${name} ampliada`}
          />
        </PixelBox>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  back: {
    position: 'absolute',
  },
})
