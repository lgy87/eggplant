import { Button, ButtonGroup } from "@blueprintjs/core"
import { ICommandBarItemProps } from "@fluentui/react"
import cx from "classnames"
import React, { FC, memo } from "react"
import { VoidFn } from "~/global"
import styles from "./styles.module.css"

const classes = cx(styles.commandBar, "bg-white")

type Props = {
  open: VoidFn
  save: VoidFn
  saveAs: VoidFn
}

const CommandBar: FC<Props> = ({ open, save, saveAs }) => {
  items[1].onClick = open
  items[3].onClick = save

  return (
    <div className={styles.commandBar}>
      <ButtonGroup className={styles.group}>
        <Button icon="document" title="New File" />
        <Button icon="folder-open" title="Open File" />
        <Button icon="floppy-disk" title="Save" />
      </ButtonGroup>
      <ButtonGroup className={styles.group}>
        <Button icon="code" title="Code" />
        <Button icon="split-columns" title="Split" />
        <Button icon="eye-open" title="Preview" />
      </ButtonGroup>
    </div>
  )
}

export default memo(CommandBar)

const items: Array<ICommandBarItemProps> = [
  {
    key: "newItem",
    text: "New",
    iconProps: { iconName: "PageAdd" },
    subMenuProps: {
      items: [
        {
          key: "emailMessage",
          text: "Email message",
          iconProps: { iconName: "Mail" },
          ["data-automation-id"]: "newEmailButton", // optional
        },
      ],
    },
  },
  {
    key: "open",
    text: "Open...",
    iconProps: { iconName: "OpenFolderHorizontal" },
  },
  {
    key: "language",
    text: "Language",
    iconProps: { iconName: "CollapseMenu" },
  },

  {
    key: "download",
    text: "Save",
    iconProps: { iconName: "Save" },
    onClick: () => console.log("Download"),
  },
]
