import { getMIDIDevices } from './getMIDIDevices'

export function onAllMIDIUpdate(
  event: Event | MIDIConnectionEvent,
  setMIDIDevices?: (devices: MIDIInput[]) => void,
  debug = false
) {
  if (event.type === 'statechange' && event instanceof MIDIConnectionEvent) {
    if (event?.port?.type === 'input') {
      const devices = event.target as MIDIAccess
      setMIDIDevices && setMIDIDevices([...getMIDIDevices(devices.inputs)])
      if (debug) console.log('All inputs change: ', event)
    }
  }
}
