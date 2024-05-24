import { HTMLProps } from 'react'
import { cn } from '../utils/cn'
import { useLocalStore } from '../store/intex'

interface DeviceProps extends HTMLProps<HTMLDivElement> {
  device: MIDIInput
}

export const Device: React.FC<DeviceProps> = ({ device, ...htmlProps }) => {
  const { selectedDevice, middleCKey } = useLocalStore()

  const isDeviceSelected = (id?: string) => {
    if (id === selectedDevice?.id && middleCKey) return 'selected-device'
    return ''
  }

  return (
    <div {...htmlProps} className={cn('midi-device', isDeviceSelected(device.id))} key={device.id}>
      {device.name}
    </div>
  )
}

export default Device
