import { Card, Elevation } from "@blueprintjs/core"
import React, { ComponentProps, CSSProperties, FC, useMemo } from "react"
import styles from "./styles.module.css"
import { Size } from "./types"

type CardProps = ComponentProps<typeof Card>
type Props = Partial<CardProps> & {
  height?: Size
  style?: CSSProperties
}

const Section: FC<Props> = ({ height, style, children, ...restProps }) => {
  const theStyle = useMemo(() => ({ height, ...style }), [height, style])

  return (
    <Card
      style={theStyle}
      className={styles.section}
      elevation={Elevation.ONE}
      {...restProps}
    >
      {children}
    </Card>
  )
}

export default Section
