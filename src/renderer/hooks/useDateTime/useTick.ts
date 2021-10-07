import { useInterval } from "react-use"
import { VoidFn } from "~/global"

export default function useTick(callback: VoidFn) {
  return useInterval(callback, 1000)
}
