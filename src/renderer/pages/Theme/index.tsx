import { Button, FormGroup, MenuItem } from "@blueprintjs/core"
import { ItemRenderer, Select } from "@blueprintjs/select"
import React, { memo, useCallback, useState } from "react"
import { useEffectOnce, useTitle } from "react-use"
import Page from "~/components/Page"
import useElectron from "~/hooks/useElectron"
import toaster from "~/utils/toaster"
import type { Theme, Themes } from "../../../../types/theme"
import Label from "./Label"

const ThemeSelect = Select.ofType<Theme>()

const Theme_ = () => {
  const electron = useElectron()
  const [themes, setThemes] = useState([] as Themes)
  const [currentTheme, setCurrentTheme] = useState("" as Theme["name"])

  useEffectOnce(() => {
    electron.window.setSize(300, 400)
    electron.theme
      .all()
      .then(setThemes)
      .catch(() => toaster.warning({ message: "读取theme列表失败！" }))
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
    setCurrentTheme(item.name)
  }, [])

  return (
    <Page>
      <FormGroup
        label={<Label>Theme</Label>}
        inline
        style={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          // border: "1px solid red",
        }}
      >
        <ThemeSelect
          items={themes}
          itemRenderer={renderTheme}
          onItemSelect={handleClick}
          filterable={false}
          popoverProps={{ minimal: true }}
        >
          <Button fill rightIcon="caret-down">
            {currentTheme}
          </Button>
        </ThemeSelect>
      </FormGroup>
      <FormGroup
        label={<Label>42</Label>}
        inline
        style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
      ></FormGroup>
    </Page>
  )
}

export default memo(Theme_)
