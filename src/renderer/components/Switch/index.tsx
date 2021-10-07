import { Switch as BPSwitch } from "@blueprintjs/core"
import cx from "classnames"
import React, { ComponentProps, FC, memo, useMemo } from "react"
import "./styles.css"
import styles from "./styles.module.css"

type BPSwitchProps = ComponentProps<typeof BPSwitch>

type Props = Omit<BPSwitchProps, "checked" | "value"> & {
  value: BPSwitchProps["checked"]
}

const Switch: FC<Props> = ({ value, className, ...restProps }) => {
  const klass = useMemo(() => cx(className, styles.switch), [className])

  return <BPSwitch className={klass} {...restProps} checked={value} />
}

export default memo(Switch)
