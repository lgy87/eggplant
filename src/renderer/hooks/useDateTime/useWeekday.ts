import { DateTime } from "./configs"
import useDateTime from "./useDateTime"

export default function useWeekday(format?: string) {
  return useDateTime(format || DateTime.Weekday)
}
