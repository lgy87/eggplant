import React, { ComponentProps, FC, memo } from "react"
import Label from "~/components/Label"

type Props = ComponentProps<typeof Label>

const Label_: FC<Props> = props => {
  return <Label textRight width={80} {...props} />
}

export default memo(Label_)
