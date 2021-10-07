import type { ExposedInMainWorld } from "../../../preload"

type IDs = {
  tag: number
}

const KEY = "IDs"
const { db } = (window as any).electron as ExposedInMainWorld
const nextIDs = () => db.get<IDs>(KEY)
const initID = 0
const defaultIDs = {
  tag: initID,
}

async function get(key: keyof typeof defaultIDs) {
  try {
    return ((await nextIDs())?.[key] || 0) + 1
  } catch {
    await db.put(KEY, defaultIDs)
    return initID + 1
  }
}

async function update(key: keyof typeof defaultIDs) {
  try {
    const ids = await nextIDs()
    const nextID = (ids?.[key] || 0) + 1
    await db.put(KEY, { ...ids, [key]: nextID })
  } catch {
    await db.put(KEY, { ...defaultIDs, [key]: initID + 1 })
  }
}

export default {
  tagID() {
    return get("tag")
  },
  updateTagID() {
    return update("tag")
  },
}
