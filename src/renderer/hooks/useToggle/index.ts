import { useMemo } from "react"
import { useToggle as useToggle_ } from "react-use"

function useToggle(initialState: boolean) {
  const [state, set] = useToggle_(initialState)

  const actions = useMemo(
    () => ({
      setTrue() {
        set(true)
      },
      setFalse() {
        set(false)
      },
      toggle() {
        set(!state)
      },
    }),
    [set, state],
  )

  return [state, actions] as const
}

export default useToggle
