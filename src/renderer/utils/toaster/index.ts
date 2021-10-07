import { IToastProps, Position, Toaster } from "@blueprintjs/core"
import { Fn } from "~/global"
import r from "~/utils/r"
import configs, { Item } from "./configs"

type Action = typeof toaster.show

const toaster = Toaster.create({
  position: Position.TOP,
})

const mapped = r.mapObjIndexed<Item, Fn<IToastProps, string>>(
  config => (options: IToastProps) =>
    toaster.show({
      ...options,
      ...config,
    }),
  configs,
) as Record<keyof typeof configs, Action>

export default r.merge(toaster, mapped)
