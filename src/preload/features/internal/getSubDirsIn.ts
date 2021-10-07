import * as ra from "ramda-adjunct"
import execCommand from "./execCommand"

export default async function getSubDirsIn(parent: string) {
  try {
    if (ra.isTruthy(parent)) {
      return (await execCommand(`ls ${parent}`)).split("\n")
    }
    throw new Error("路径不能为空！")
  } catch (e) {
    return Promise.reject(e.message)
  }
}
