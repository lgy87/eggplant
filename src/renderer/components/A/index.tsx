import React, { AnchorHTMLAttributes, FC, memo } from "react"
import r from "~/utils/r"

const TARGET_BLANK = "_blank"
const SECURITY_REL = "noopener noreferrer"
const isTargetBlank = r.equals(TARGET_BLANK)

type Rel = string | undefined
type Target = Rel

const A: FC<AnchorHTMLAttributes<unknown>> = ({
  rel,
  children,
  ...restProps
}) => {
  const newRel = makeSecurityRel(rel, restProps.target)

  return (
    <a {...restProps} rel={newRel}>
      {children}
    </a>
  )
}

function makeSecurityRel(rel: Rel, target: Target) {
  if (isTargetBlank(target!))
    return [rel, SECURITY_REL].filter(Boolean).join(" ")

  return rel
}

export default memo(A)
