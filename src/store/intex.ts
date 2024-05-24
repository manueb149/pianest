import { create } from 'zustand'
import { KeyNote } from '../models/KeyNote'

export interface StoreState {
  MIDIDevices: MIDIInput[]
  middleCKey: number | null
  matchLetter: string | null
  lastSelectedKey: KeyNote | null
  isCalibrationModalOpen: boolean
  selectedDevice: MIDIInput | null
}

export interface StoreActions {
  setMIDIDevices: (devices: StoreState['MIDIDevices']) => void
  setSelectedDevice: (device: StoreState['selectedDevice']) => void
  setMatchLetter: (letter: StoreState['matchLetter']) => void
  setMiddleC: (key: StoreState['middleCKey']) => void
  setLastSelectedKey: (key: StoreState['lastSelectedKey']) => void
  setToggleCalibrationModal: (value?: StoreState['isCalibrationModalOpen']) => void
}

export const useLocalStore = create<StoreState & StoreActions>()((set) => ({
  MIDIDevices: [],
  selectedDevice: null,
  matchLetter: null,
  middleCKey: null,
  lastSelectedKey: null,
  isCalibrationModalOpen: false,
  setMIDIDevices: (devices) => set({ MIDIDevices: devices }),
  setSelectedDevice: (device) => set({ selectedDevice: device }),
  setMatchLetter: (letter) => set({ matchLetter: letter }),
  setMiddleC: (key) => set({ middleCKey: key }),
  setLastSelectedKey: (key) => set({ lastSelectedKey: key }),
  setToggleCalibrationModal: (value) =>
    set((state) => ({
      isCalibrationModalOpen: typeof value === 'boolean' ? value : !state.isCalibrationModalOpen,
    })),
}))
