import { contextBridge } from "electron"
import * as fse from "fs-extra"
import db from "./features/db"
import * as dialogs from "./features/dialogs"
import * as file from "./features/file"

const apiKey = "electron"

/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const api = {
  versions: process.versions,
  fse,
  file,
  dialogs,
  db,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-var-requires
  ;(window as any).electronRequire = require
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any)[apiKey] = api
}
