import { MenuItemProps as BPMenuItemProps } from "@blueprintjs/core"

export type MenuItemProps = BPMenuItemProps & { key: string }
export const menuItems = [
  { icon: "manually-entered-data", text: "Note", key: "notes" },
  { icon: "tag", text: "Tag", key: "tags" },
] as Array<MenuItemProps>
