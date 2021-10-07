import { Button as BPButton } from "@blueprintjs/core"
import { ComponentProps, FC, useMemo } from "react"
import { usePrimary } from "~/hooks/useTheme"

type Props = ComponentProps<typeof BPButton> & {
  primary?: boolean
}

const Button: FC<Props> = ({ style, primary, ...restProps }) => {
  const primaryColor = usePrimary()
  const colorStyle = useMemo(() => (primary ? { color: primaryColor } : {}), [
    primary,
    primaryColor,
  ])
  const theStyle = useMemo(
    () => ({
      padding: 2,
      ...colorStyle,
      ...style,
    }),
    [colorStyle, style],
  )

  return <BPButton style={theStyle} small minimal {...restProps} />
}

export default Button
