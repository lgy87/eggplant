import { Popover2 } from "@blueprintjs/popover2"
import React, { ComponentProps, FC, ReactNode, useMemo } from "react"
import Content from "./Content"

type ContentProps = ComponentProps<typeof Content> & {
  children: ReactNode
}

const Component: FC<ContentProps> = ({ children, ...restProps }) => {
  const content = useMemo(() => <Content {...restProps} />, [restProps])

  return (
    <Popover2 autoFocus minimal canEscapeKeyClose content={content}>
      {children}
    </Popover2>
  )
}

export default Component
