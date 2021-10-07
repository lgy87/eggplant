import { useCallback, useState } from "react"
import { VoidFn } from "~/global"

function random(max: number, min: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export default function useRandom(max: number, min = 0) {
  const [value, set] = useState(() => random(max, min))

  const refresh = useCallback(() => set(random(max, min)), [max, min])

  return [value, refresh] as [number, VoidFn]
}
