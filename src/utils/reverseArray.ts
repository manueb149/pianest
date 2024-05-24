export const reverseArray = <T>(inputArray: T[]) => {
  return inputArray.reduce((previous, current) => {
    return [current, ...previous]
  }, [] as T[])
}
