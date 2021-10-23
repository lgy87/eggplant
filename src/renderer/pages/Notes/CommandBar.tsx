import { Button, ButtonGroup } from "@blueprintjs/core"
import React, { FC, memo } from "react"
import { useNavigate } from "react-router-dom"
import { VoidFn } from "~/global"
import { views } from "./configs"
import styles from "./styles.module.css"

type Props = {
  open: VoidFn
  save: VoidFn
  saveAs: VoidFn
  showCodeOnly: VoidFn
  showPreviewOnly: VoidFn
  showBoth: VoidFn
  view: views
}

const CommandBar: FC<Props> = ({
  open,
  save,
  saveAs,
  showBoth,
  showCodeOnly,
  showPreviewOnly,
  view,
}) => {
  const navigate = useNavigate()

  return (
    <div className={styles.commandBar}>
      <ButtonGroup className={styles.group}>
        <Button icon="document" title="New File" />
        <Button icon="folder-open" title="Open File" onClick={open} />
        <Button icon="floppy-disk" title="Save" onClick={save} />
        <Button icon="inbox" title="Save" onClick={saveAs} />
      </ButtonGroup>
      <ButtonGroup className={styles.group}>
        <Button
          icon="code"
          title="Code"
          onClick={showCodeOnly}
          disabled={view === views.codeOnly}
        />
        <Button
          icon="split-columns"
          title="Split"
          onClick={showBoth}
          disabled={view === views.both}
        />
        <Button
          icon="eye-open"
          title="Preview"
          onClick={showPreviewOnly}
          disabled={view === views.previewOnly}
        />
      </ButtonGroup>
      <ButtonGroup className={styles.group}>
        <Button
          icon="cog"
          title="Settings"
          onClick={() => navigate("/settings")}
        />
      </ButtonGroup>
    </div>
  )
}

export default memo(CommandBar)
