import { Button, ControlGroup, FormGroup, MenuItem } from "@blueprintjs/core"
import { ItemRenderer, Select } from "@blueprintjs/select"
import React, { memo, useCallback, useMemo, useState } from "react"
import { useEffectOnce, useTitle } from "react-use"
import useElectron from "~/hooks/useElectron"
import toaster from "~/utils/toaster"
import type {
  PresetColorSchemes,
  StyleItem,
  Theme,
} from "../../../../types/theme"
import Label from "./Label"
import styles from "./styles.module.css"

const ThemeSelect = Select.ofType<Theme>()
const themeLabel = <Label>Theme</Label>
const emptyLabel = <Label></Label>
const previewLabel = <Label>Preview</Label>

const Theme_ = () => {
  const electron = useElectron()
  const [colorSchemes, setColorSchemes] = useState({} as PresetColorSchemes)
  const [style, setStyle] = useState({} as StyleItem)
  const [currentTheme, setCurrentTheme] = useState(style.colorScheme)

  const schemes = useMemo(() => Object.values(colorSchemes), [colorSchemes])

  useEffectOnce(() => {
    electron.window.setSize(400, 400)
  })

  useEffectOnce(() => {
    electron.theme
      .colorSchemes()
      .then(setColorSchemes)
      .catch(() => toaster.warning({ message: "读取colorSchemes列表失败！" }))
  })

  useEffectOnce(() => {
    electron.theme
      .style()
      .then(resp => {
        setStyle(resp)
        setCurrentTheme(resp.colorScheme)
      })
      .catch(() => toaster.warning({ message: "读取自定义设置失败！" }))
  })

  useTitle("Color Theme")

  const renderTheme: ItemRenderer<Theme> = useCallback(
    (item, { handleClick }) => {
      return (
        <MenuItem
          key={item.name}
          text={item.name}
          active={item.name === currentTheme}
          onClick={handleClick}
        />
      )
    },
    [currentTheme],
  )

  const handleClick = useCallback((item: Theme) => {
    console.log("=+++++", item)
    setCurrentTheme(item.name)
  }, [])

  return (
    <>
      <FormGroup label={themeLabel} inline>
        <ThemeSelect
          items={schemes}
          itemRenderer={renderTheme}
          onItemSelect={handleClick}
          filterable={false}
          popoverProps={{ minimal: true, popoverClassName: styles.select }}
        >
          <Button fill rightIcon="caret-down">
            {currentTheme}
          </Button>
        </ThemeSelect>
      </FormGroup>
      <FormGroup label={emptyLabel} inline>
        <ControlGroup>
          <Button icon="trash">Remove</Button>
          <Button icon="duplicate">Duplicate</Button>
        </ControlGroup>
      </FormGroup>
      <FormGroup label={previewLabel} inline>
        <Button fill rightIcon="caret-down">
          {currentTheme}
        </Button>
      </FormGroup>
    </>
  )
}

export default memo(Theme_)
