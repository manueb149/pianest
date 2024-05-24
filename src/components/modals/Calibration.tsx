import { Modal } from '@mantine/core'
import { useLocalStore } from '../../store/intex'

interface Props {
  opened: boolean
  close?: () => void
}

export const CalibrationModal: React.FC<Props> = ({ opened, close }) => {
  const { middleCKey } = useLocalStore()

  return (
    <Modal.Root
      opened={opened}
      onClose={() => {
        close && close()
      }}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title style={{ fontWeight: 'bold' }}>Calibrate Piano</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'left' }}>
            {middleCKey ? 'Key captured!' : 'Press the middle C note'}
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}

export default CalibrationModal
