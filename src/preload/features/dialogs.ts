import { dialog } from "@electron/remote"

export async function file(options?: Electron.OpenDialogOptions) {
  return dialog.showOpenDialog({
    properties: ["openFile"],
    ...options,
  })
}

export async function dir(defaultPath?: string) {
  return dialog.showOpenDialog({
    properties: ["openDirectory"],
    defaultPath,
  })
}

export async function save(options: Electron.SaveDialogOptions) {
  return dialog.showSaveDialog(options)
}
