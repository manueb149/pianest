import { StoreState } from '../store/intex'

export function onSelectedMIDIUpdate(
  device: MIDIInput,
  setSelectedDevice?: (device: StoreState['selectedDevice']) => void,
  debug = false
) {
  const { name, state } = device
  if (debug) console.log(`${name}: %s, device: %o`, state, device)

  if (state === 'disconnected') onDisconnect()

  function onDisconnect() {
    device.onstatechange = () => {}
    device.onmidimessage = () => {}
    setSelectedDevice && setSelectedDevice(null)
  }
}
