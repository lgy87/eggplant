import * as ra from "ramda-adjunct"
import { useCallback, useRef, useState } from "react"
import { useEffectOnce } from "react-use"
import type { Fn } from "~/global"
import storage from "~/utils/storage"

export default function useCachedState<T = unknown>(
  key: string,
  initialState: T | null,
) {
  const [cachedValue, setCachedValue] = useState(initialState)
  const fromCache = useRef(false)

  useEffectOnce(() => {
    storage
      .getItem<T>(key)
      .then(cached => {
        fromCache.current = true
        if (ra.isNotNil(cached)) {
          return setCachedValue(cached)
        }
      })
      .catch(e => {
        const { message = `读取缓存失败: [${key}]` } = e
        console.log(message)
      })
  })

  const set = useCallback(
    value => {
      setCachedValue(value)
      storage.setItem(key, value)
    },
    [key],
  )

  return [cachedValue, set, fromCache.current] as [T, Fn<T, void>, boolean]
}
