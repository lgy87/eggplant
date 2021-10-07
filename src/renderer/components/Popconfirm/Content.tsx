import { Button, ButtonGroup, Classes, H5, Intent } from "@blueprintjs/core"
import cx from "classnames"
import * as ra from "ramda-adjunct"
import { FC, memo } from "react"
import styles from "./styles.module.css"

type CallbackHandler = () => void
type Props = {
  title: string
  cancelButtonText: string
  confirmButtonText: string
  onCancel?: CallbackHandler
  onConfirm: CallbackHandler
  cancelButtonIntent?: Intent
  confirmButtonIntent?: Intent
}

const Component: FC<Props> = ({
  title,
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onConfirm,
  cancelButtonIntent,
  confirmButtonIntent,
}) => {
  const className = cx(styles.button, Classes.POPOVER_DISMISS)

  return (
    <div className={styles.content}>
      <H5>{title}</H5>
      <ButtonGroup>
        <Button
          className={className}
          onClick={onCancel || ra.noop}
          intent={cancelButtonIntent || Intent.NONE}
        >
          {cancelButtonText}
        </Button>
        <Button
          className={Classes.POPOVER_DISMISS}
          intent={confirmButtonIntent || Intent.DANGER}
          onClick={onConfirm || ra.noop}
        >
          {confirmButtonText}
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default memo(Component)
