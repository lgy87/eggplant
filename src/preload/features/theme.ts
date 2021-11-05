import fse from "fs-extra"
import yaml from "yaml"
import type { Themes } from "../../../types/theme"
import path from "./path"

export async function all() {
  try {
    const content = await fse.readFile(
      path.preferencePath + "/squirrel.yaml",
      "utf8",
    )

    const { preset_color_schemes } = yaml.parse(content) || {}
    return Object.values(preset_color_schemes) as Themes
  } catch (e) {
    return []
  }
}
