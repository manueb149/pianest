import { useEffect, useRef } from 'react'

export function useRefSignal<T>(initialValue: T) {
  // const [state, setState] = useState<T>(initialValue)
  // const stateRef = useRef<T>(state)

  // const setRefState = (value: T) => {
  //   stateRef.current = value
  //   setState(value)
  // }

  // return [stateRef, setRefState]
  const stateRef = useRef<T>(initialValue)

  useEffect(() => {
    stateRef.current = initialValue
  }, [initialValue])

  return stateRef
}

export default useRefSignal
