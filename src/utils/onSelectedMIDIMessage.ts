import { KeyNote } from '../models/KeyNote'
import { DeviceSetup } from '../models/DeviceSetup'
import { KeyCommand, KeyLetterLeftHand, KeyLetterRightHand, KeyNumber } from '../models'

export function onSelectedMIDIMessage(
  event: MIDIMessageEvent,
  options?: {
    onKeyPress?: (keyNote: KeyNote) => void
    debug?: boolean
  }
) {
  const command = event?.data?.slice(0, 1)[0]
  const key = event?.data?.slice(1, 2)[0]
  const velocity = event?.data?.slice(2, 3)[0]

  if (command === KeyCommand.KeyPress) {
    const keyNote = new KeyNote(command, key, velocity, keyIdentifier(key))
    options?.onKeyPress && options.onKeyPress(keyNote)

    if (options?.debug) console.log(`Input Data -> %o`, keyNote)
  }
}

function keyIdentifier(key?: number) {
  if (typeof key !== 'number' || typeof DeviceSetup.middleCKey !== 'number') return
  const keyDistance = key - DeviceSetup.middleCKey
  if (keyDistance >= KeyNumber['C']) {
    const index = Math.abs(keyDistance % DeviceSetup.keysPerBlock)
    return KeyLetterRightHand[index]
  } else {
    const index = (Math.abs(keyDistance) % DeviceSetup.keysPerBlock) - 1
    return index === -1 ? KeyLetterRightHand[KeyNumber['C']] : KeyLetterLeftHand[index]
  }
}
