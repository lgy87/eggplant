import { createElement, FC, HTMLAttributes } from "react"

const Div: FC<HTMLAttributes<HTMLDivElement>> = props => {
  return createElement("div", {
    role: "button",
    tabIndex: -1,
    "aria-hidden": true,
    ...props,
  })
}

export default Div
