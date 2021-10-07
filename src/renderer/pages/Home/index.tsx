import {
  Button,
  ButtonGroup,
  ControlGroup,
  InputGroup,
  Menu,
  MenuItem,
  Position,
} from "@blueprintjs/core"
import { Popover2 } from "@blueprintjs/popover2"
import cx from "classnames"
import React, { FC, memo, useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffectOnce } from "react-use"
import Page from "~/components/Page"
import { gap } from "~/configs/variables"
import { EmptyObject } from "~/global"
import useCachedState from "~/hooks/useCachedState"
import r from "~/utils/r"
import { MenuItemProps, menuItems } from "./configs"
import styles from "./styles.module.css"

const itemAlignmentsStackTokens = { padding: gap }
const container = cx("h-screen", "bg-center", "bg-no-repeat", "bg-contain")

const pickKeyAndText = r.pick<"key" | "text">(["key", "text"])

const Home: FC<EmptyObject> = () => {
  const navigate = useNavigate()
  const defaultItem = r.prop(0, menuItems)
  const [item, setItem] = useCachedState("default-create", defaultItem)
  const [searchText, setSearchText] = useState("")

  const add = useCallback(
    (menuItem?: MenuItemProps) => {
      const key = menuItem?.key || item?.key
      navigate(`/${key}/create`)
    },
    [item?.key, navigate],
  )

  const handleMenuItemClick = useCallback(
    (item?: MenuItemProps) => {
      setItem(pickKeyAndText(item) as MenuItemProps)
      add(item)
    },
    [add, setItem],
  )

  useEffectOnce(() => {
    menuItems.forEach(item => (item.onClick = () => handleMenuItemClick(item)))
  })

  const menu = useMemo(
    () => (
      <Menu>
        {menuItems.map(item => (
          <MenuItem {...item} />
        ))}
      </Menu>
    ),
    [],
  )

  return (
    <Page goBack={false}>
      <ButtonGroup>
        <Button onClick={add as any} icon="add" intent="primary">
          {item?.text}
        </Button>
        <Popover2 content={menu} position={Position.BOTTOM_RIGHT}>
          <Button intent="primary" icon="caret-down" />
        </Popover2>
      </ButtonGroup>
      <ControlGroup fill vertical={false}>
        <InputGroup
          leftIcon="search"
          placeholder="Search..."
          className={styles.search}
          value={searchText}
          fill
          onChange={e => setSearchText(e.target.value)}
        />
        {searchText.length > 0 && (
          <Button icon="delete" onClick={() => setSearchText("")} />
        )}
      </ControlGroup>
    </Page>
  )
}

export default memo(Home)
