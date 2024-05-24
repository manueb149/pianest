import { StoreState } from '../store/intex'
import { KeyNote } from './KeyNote'

class DeviceSetupSingleton {
  private static instance: DeviceSetupSingleton
  public middleCKey: number | null = null
  public selectedKey: KeyNote | null = null
  public matchKey: string | null = null
  /**
   * Quantity of keys (12) in the base center of a piano
   */
  public keysPerBlock = 12

  private constructor() {}

  public static getInstance(): DeviceSetupSingleton {
    if (!DeviceSetupSingleton.instance) {
      DeviceSetupSingleton.instance = new DeviceSetupSingleton()
    }
    return DeviceSetupSingleton.instance
  }

  /**
   * method to set the middle C note
   */
  public setMiddleC(key: number | null, stateSetter?: (key: StoreState['middleCKey']) => void) {
    this.middleCKey = key
    stateSetter && stateSetter(key)
  }
  /**
   * method to set the selected note
   */
  public setSelectedKey(
    key: KeyNote | null,
    stateSetter?: (key: StoreState['lastSelectedKey']) => void
  ) {
    this.selectedKey = key
    stateSetter && stateSetter(key)
  }
  /**
   * method to set the note to match
   */
  public setMatchKey(key: string | null, stateSetter?: (key: StoreState['matchLetter']) => void) {
    this.matchKey = key
    stateSetter && stateSetter(key)
  }
}

export const DeviceSetup = DeviceSetupSingleton.getInstance()
