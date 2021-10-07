import * as fse from "fs-extra"
import { file, save as save_ } from "./dialogs"

export async function open() {
  return file()
    .then(resp => {
      if (resp.canceled) throw new Error("You canceled!")
      return resp.filePaths[0]
    })
    .then(path =>
      fse
        .readFile(path, { encoding: "utf-8" })
        .then(content => [path, content] as const),
    )
}

export const save = fse.writeFile

export async function saveAs(
  content: string,
  options: Electron.SaveDialogOptions,
) {
  return save_(options)
    .then(resp => {
      if (resp.canceled) throw new Error("You canceled!")
      return resp.filePath!
    })
    .then(path => save(path, content).then(() => path))
}
