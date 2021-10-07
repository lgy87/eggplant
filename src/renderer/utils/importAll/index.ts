import * as r from "ramda"

function filename(path: string) {
  return r.pipe(
    r.split("/"),
    r.last,
    r.split("."),
    r.head,
    r.replace(/Slice$/, ""),
  )(path) as string
}

export default function importAll(ctx: __WebpackModuleApi.RequireContext) {
  return ctx.keys().reduce((accu, key) => {
    accu[filename(key)] = ctx(key)
    return accu
  }, {} as AnyObject)
}
