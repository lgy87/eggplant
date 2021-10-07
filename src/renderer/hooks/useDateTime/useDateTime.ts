import { addSeconds, format } from "date-fns/fp"
import { useState } from "react"
import { DateTime } from "./configs"
import useMinuteTick from "./useMinuteTick"

export default function useDateTime(fmt: DateTime | string) {
  const [time, setTime] = useState(new Date())
  useMinuteTick(() => setTime(addSeconds(1)))

  return format(fmt, time)
}
