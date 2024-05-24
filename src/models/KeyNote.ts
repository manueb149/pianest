export class KeyNote {
  constructor(
    /** Type of keypress*/
    public command?: number,
    /** Key number in the board*/
    public key?: number,
    /** How fast the key was pressed*/
    public velocity?: number,
    /** Key note letter from: C D E F G A B*/
    public letter?: string
  ) {
    return {
      command: this.command,
      key: this.key,
      velocity: this.velocity,
      letter: this.letter,
    }
  }
}
