import * as remoteMain from "@electron/remote/main"
import { app, BrowserWindow, Menu } from "electron"
import { join } from "path"
import * as ra from "ramda-adjunct"
import { format } from "url"
import applicationMenu from "./menu"
import { platform } from "./utils"

const gotTheLock = app.requestSingleInstanceLock()
gotTheLock || app.quit()

const env = import.meta.env

if (env.MODE === "development") {
  app
    .whenReady()
    .then(() => import("electron-devtools-installer"))
    .then(({ default: installExtension }) => {
      const REACT_DEVELOPER_TOOLS = "fmkadmapgofadopljbjfkapdkoienihi"
      return installExtension(REACT_DEVELOPER_TOOLS)
    })
    .catch(e => console.error("Failed install extension:", e))
}

let mainWindow: BrowserWindow | null = null

async function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: join(__dirname, "../preload/index.cjs.js"),
      contextIsolation: env.MODE !== "test",
    },
  })

  const indexHTML = join(__dirname, "../renderer/index.html")
  const url =
    env.MODE === "development"
      ? env.VITE_DEV_SERVER_URL
      : format(new URL(`file:///${indexHTML}`))

  await mainWindow.loadURL(url)
  mainWindow.maximize()
  mainWindow.show()
  remoteMain.enable(mainWindow.webContents)

  if (env.DEV) mainWindow.webContents.openDevTools()
}

app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

app.on("window-all-closed", () => platform.mac || app.quit())

app
  .whenReady()
  .then(remoteMain.initialize)
  .then(setApplicationMenu)
  .then(createWindow)
  .then(() => {
    app.on("activate", function () {
      if (ra.lengthEq(0, BrowserWindow.getAllWindows())) createWindow()
    })
  })
  .catch(e => console.error("Failed create window:", e))

// Auto-updates
if (env.PROD) {
  app
    .whenReady()
    .then(() => import("electron-updater"))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch(e => console.error("Failed check updates:", e))
}

function setApplicationMenu() {
  Menu.setApplicationMenu(applicationMenu)
}
