import './App.scss'
import { cn } from './utils/cn'
import { useEffect } from 'react'
import { KeyNote } from './models/KeyNote'
import { Device } from './components/Device'
import { useLocalStore } from './store/intex'
import { useRefSignal } from './hooks/useRefSignal'
import { DeviceSetup } from './models/DeviceSetup'
import { getMIDIDevices } from './utils/getMIDIDevices'
import { onAllMIDIUpdate } from './utils/onAllMIDIUpdate'
import { randomRangeNumber } from './utils/randomRangeNumber'
import { CalibrationModal } from './components/modals/Calibration'
import { onSelectedMIDIUpdate } from './utils/onSelectedMIDIUpdate'
import { onSelectedMIDIMessage } from './utils/onSelectedMIDIMessage'
// import MIDISounds from 'midi-sounds-react'

const KeysPick = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

export const App = () => {
  const {
    middleCKey,
    matchLetter,
    MIDIDevices,
    selectedDevice,
    isCalibrationModalOpen,
    lastSelectedKey,
    setMiddleC,
    setMatchLetter,
    setMIDIDevices,
    setSelectedDevice,
    setLastSelectedKey,
    setToggleCalibrationModal,
  } = useLocalStore()
  const middleCKeySignal = useRefSignal(middleCKey)
  const selectedDeviceSignal = useRefSignal(selectedDevice)
  const isCalibrationModalOpenSignal = useRefSignal(isCalibrationModalOpen)

  // const midiSounds = useRef(null)

  const handleDeviceSetup = (device: MIDIInput) => {
    if (selectedDevice?.id !== device.id) {
      if (!middleCKey) {
        setToggleCalibrationModal(true)
        setEvents(device)
      } else {
        clearEvents(selectedDevice)
        setToggleCalibrationModal(true)
        setEvents(device)
      }
    } else {
      clearEvents(device)
    }
  }

  function setEvents(device: MIDIInput) {
    if (selectedDevice) return
    device.onmidimessage = function (event) {
      onMidiMessage.call(this, event)
    }
    device.onstatechange = function () {
      onSelectedMIDIUpdate(device, setSelectedDevice)
    }
  }

  function clearEvents(device: MIDIInput | null) {
    if (!device) return
    setSelectedDevice(null)
    DeviceSetup.setMiddleC(null, setMiddleC)
    device.onmidimessage = () => {}
    device.onstatechange = () => {}
  }

  function onMidiMessage(this: MIDIInput, event: MIDIMessageEvent) {
    if (!isCalibrationModalOpenSignal.current && !middleCKeySignal.current) return

    onSelectedMIDIMessage(event, {
      onKeyPress: (keyNote) => {
        if (!selectedDeviceSignal.current || keyNote.letter === undefined) {
          console.log('Setting %s as device', this.name)
          setSelectedDevice(this)
          DeviceSetup.setMiddleC(keyNote.key || null, setMiddleC)
          setTimeout(() => {
            setToggleCalibrationModal(false)
          }, 1500)
        }

        // midiSounds?.current?.playChordNow(1, [keyNote.key], 2.5)
        DeviceSetup.setSelectedKey(keyNote, setLastSelectedKey)
        const nextKey = KeysPick[randomRangeNumber(0, KeysPick.length - 1)]

        if (!DeviceSetup?.selectedKey?.letter) {
          DeviceSetup.setMatchKey(nextKey)
          setMatchLetter(nextKey)
        } else if (DeviceSetup?.matchKey === DeviceSetup?.selectedKey?.letter) {
          setTimeout(() => {
            const emptyKeyNote = new KeyNote()
            DeviceSetup.setMatchKey(nextKey)
            DeviceSetup.setSelectedKey(emptyKeyNote)
            setMatchLetter(nextKey)
          }, 100)
        }
      },
      debug: true,
    })
  }

  const isMatchCorrect = (letter: string | null) => {
    if (letter === DeviceSetup?.selectedKey?.letter) {
      return 'matched'
    } else if (DeviceSetup.selectedKey?.letter === undefined) {
      return ''
    } else {
      return 'not-matched'
    }
  }

  const handleCloseCalibration = () => {
    setToggleCalibrationModal(false)
  }

  useEffect(() => {
    navigator
      .requestMIDIAccess()
      .then((result) => {
        result.onstatechange = function (event: Event) {
          onAllMIDIUpdate(event, setMIDIDevices)
        }

        setMIDIDevices([...getMIDIDevices(result.inputs)])
      })
      .catch((error) => {
        console.log('error: ', error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* <MIDISounds
        ref={(ref: any) => (midiSounds.current = ref)}
        appElementName="root"
        instruments={[1]}
      /> */}
      <CalibrationModal opened={isCalibrationModalOpen} close={handleCloseCalibration} />
      <section className="midi-settings">
        <div id="title">
          <h3>MIDI Devices</h3>
        </div>
        <div id="devices">
          {MIDIDevices.map((device) => (
            <Device
              key={device.id}
              device={device}
              onClick={() => {
                handleDeviceSetup(device)
              }}
            />
          ))}
        </div>
      </section>
      <main>
        <div className="match-key">
          <div className="match-key-title">Match</div>
          <div className={cn('match-key-letter', isMatchCorrect(matchLetter))}>{matchLetter}</div>
        </div>
      </main>
      <div className="selected-key">Last selected key: {lastSelectedKey?.letter}</div>
    </>
  )
}

export default App
