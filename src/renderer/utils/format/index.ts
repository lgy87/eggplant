import { format } from "date-fns/fp"
import { date, dateTime, time } from "~/configs/format"
import type { Timestamp } from "~/global"

export default function formatDateTime(timestamp: Timestamp) {
  return format(dateTime, timestamp)
}

export function formatDate(timestamp: Timestamp) {
  return format(date, timestamp)
}

export function formatTime(timestamp: Timestamp) {
  return format(time, timestamp)
}
