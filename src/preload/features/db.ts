import level from "level"

const dbPath = import.meta.env.VITE_DATABASE_URL
const db = level(dbPath, { valueEncoding: "json" })

export default {
  get<T = any>(key: string) {
    return db.get(key) as Promise<T>
  },
  put(key: string, value: unknown) {
    return db.put(key, value)
  },
  delete(key: string) {
    return db.del(key)
  },
}
