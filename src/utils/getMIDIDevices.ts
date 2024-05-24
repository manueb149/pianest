export function getMIDIDevices(devicesInputs: MIDIAccess['inputs']) {
  const connectedDevices: MIDIInput[] = []
  devicesInputs.forEach((value) => {
    connectedDevices.push(value)
  })
  return connectedDevices
}
