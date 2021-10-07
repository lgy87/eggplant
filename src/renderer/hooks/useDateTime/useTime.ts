import { DateTime } from "./configs"
import useDateTime from "./useDateTime"

export default function useTime(format?: string) {
  return useDateTime(format || DateTime.Time)
}
