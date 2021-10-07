import { DateTime } from "./configs"
import useDateTime from "./useDateTime"

export default function useDate(format?: string) {
  return useDateTime(format || DateTime.Date)
}
