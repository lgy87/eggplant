import React, { FC, memo } from "react"

type Props = {
  html: string
}

const Preview: FC<Props> = props => {
  return <div dangerouslySetInnerHTML={{ __html: props.html }} />
}

export default memo(Preview)
