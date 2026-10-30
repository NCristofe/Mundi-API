import { Modal, Pressable, StyleSheet, View } from 'react-native'
import PixelBox from '../PixelBox/PixelBox.jsx'
import PixelText from '../PixelText/PixelText.jsx'

export default function ConfirmDialog({ visible, message, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', onConfirm, onCancel }) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} accessibilityLabel={cancelLabel} />
        <PixelBox style={styles.dialog} contentStyle={styles.dialogContent}>
          <PixelText size={12} accessibilityRole="alert" style={styles.message}>
            {message}
          </PixelText>
          <View style={styles.actions}>
            <PixelBox style={styles.action} onPress={onCancel} accessibilityLabel={cancelLabel}>
              <PixelText size={10}>{cancelLabel}</PixelText>
            </PixelBox>
            <PixelBox style={styles.action} onPress={onConfirm} accessibilityLabel={confirmLabel}>
              <PixelText size={10}>{confirmLabel}</PixelText>
            </PixelBox>
          </View>
        </PixelBox>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  dialog: {
    width: '100%',
    maxWidth: 340,
  },
  dialogContent: {
    alignItems: 'stretch',
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 24,
    gap: 22,
  },
  message: {
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  action: {
    flex: 1,
    height: 44,
  },
})
