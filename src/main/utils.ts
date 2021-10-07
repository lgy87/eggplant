import * as r from "ramda"

const isPlatform = r.equals(process.platform)
const darwin = "darwin"
const freebsd = "freebsd"
const linux = "linux"
const win = "win32"

export const platform = {
  mac: isPlatform(darwin),
  win: isPlatform(win),
  linux: isPlatform(linux),
  freebsd: isPlatform(freebsd),
}

export function capitalize(s: string) {
  const [head, ...rest] = s
  return head.toUpperCase() + rest.join("")
}
