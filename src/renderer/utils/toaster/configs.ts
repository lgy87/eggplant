import { IconName, Intent } from "@blueprintjs/core"

export type Item = {
  icon: IconName
  intent: Intent
}
export type Configs = Record<
  "show" | "primary" | "success" | "warning" | "error",
  Item
>
export default {
  show: {
    // use defaults, nothing to do.
  },
  primary: {
    icon: "info-sign",
    intent: Intent.PRIMARY,
  },
  success: {
    icon: "tick",
    intent: Intent.SUCCESS,
  },
  warning: {
    icon: "hand",
    intent: Intent.WARNING,
  },
  error: {
    icon: "warning-sign",
    intent: Intent.DANGER,
  },
} as Configs
