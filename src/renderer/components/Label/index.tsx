import { Label as BPLabel } from "@blueprintjs/core"
import React, { ComponentProps, FC, memo, useMemo } from "react"

type Props = ComponentProps<typeof BPLabel> & {
  textRight?: boolean
}

const Label: FC<Props> = ({ style, textRight, width, ...restProps }) => {
  const theStyle = useMemo(
    () => ({
      width,
      textAlign: textRight ? ("right" as const) : ("left" as const),
      ...style,
    }),
    [style, textRight, width],
  )

  return <BPLabel style={theStyle} {...restProps} />
}

export default memo(Label)
