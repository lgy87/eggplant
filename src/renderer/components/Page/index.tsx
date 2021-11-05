import cx from "classnames"
import React, { CSSProperties, FC, useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import A from "~/components/A"
import { AnyFn } from "~/global"
import r from "~/utils/r"
import styles from "./styles.module.css"

const goBackClassNames = cx("select-none", "absolute", "z-50", styles.goBack)

type Props = {
  goBack?: false | AnyFn
  style?: CSSProperties
  className?: string
}

const Page: FC<Props> = ({ goBack, children, className, style }) => {
  const navigate = useNavigate()
  const hasNotGoBack = r.isFalse(goBack)

  const back = useCallback(() => navigate(-1), [navigate])
  const pageClassNames = useMemo(
    () =>
      cx(
        "h-screen",
        "relative",
        styles.page,
        hasNotGoBack || styles.goBackBar,
        className,
      ),
    [className, hasNotGoBack],
  )

  return (
    <div className={pageClassNames} style={style}>
      {hasNotGoBack || (
        <A className={goBackClassNames} onClick={goBack || back}>
          Go Back
        </A>
      )}
      {children}
    </div>
  )
}

export default Page
