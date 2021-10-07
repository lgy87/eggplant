import { useInterval } from "react-use"
import { VoidFn } from "~/global"

const interval = 60 * 1000

export default function useMinuteTick(callback: VoidFn) {
  return useInterval(callback, interval)
}
