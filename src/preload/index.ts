import { contextBridge } from "electron"
import features from "./features"

const apiKey = "electron"

/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const api = {
  versions: process.versions,
  ...features,
} as const

export type ExposedInMainWorld = Readonly<typeof api>

if (import.meta.env.MODE !== "test") {
  /**
   * The "Main World" is the JavaScript context that your main renderer code runs in.
   * By default, the page you load in your renderer executes code in this world.
   *
   * @see https://www.electronjs.org/docs/api/context-bridge
   */
  contextBridge.exposeInMainWorld(apiKey, api)
} else {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any)[apiKey] = api
}
