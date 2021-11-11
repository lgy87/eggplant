import camelCase from "camelcase"
import fse from "fs-extra"
import yaml from "yaml"
import type { PresetColorSchemes, Style, StyleItem } from "../../../types/theme"
import r from "../../renderer/utils/r"
import path from "./path"

type AnyObject = Record<string, any>

export async function colorSchemes() {
  const key = "preset_color_schemes"

  try {
    const content = await fse.readFile(
      path.preferencePath + "/squirrel.yaml",
      "utf8",
    )

    const parsed = yaml.parse(content)[key] || {}
    const normalized = normalize(parsed) as PresetColorSchemes
    Object.entries(normalized).forEach(([key, value]) => {
      value.id = key
    })

    return normalized
  } catch (e) {
    return {}
  }
}

export async function style() {
  const key = "patch"
  type StyleType = Style<StyleItem>

  try {
    const style = await fse.readFile(
      path.preferencePath + "/squirrel.custom.yaml",
      "utf8",
    )

    const parsed = yaml.parse(style)[key]
    const adjusted = adjustKey(parsed)
    const normalized = normalize(adjusted) as StyleType

    return normalized.style || {}
  } catch (e) {
    return {}
  }
}

export async function defaults() {
  const key = "patch"

  try {
    const defaults = await fse.readFile(
      path.preferencePath + "/default.custom.yaml",
      "utf8",
    )
    const parsed = yaml.parse(defaults)[key]
    const adjusted = adjustKey(parsed)
    const normalized = normalize(adjusted)

    return normalized.style || {}
  } catch (e) {
    return {}
  }
}

export async function current() {
  try {
    const customized = await Promise.all([style(), defaults()])
    return r.mergeAll(customized)
  } catch (e) {
    return []
  }
}

function normalize(obj: AnyObject) {
  if (!obj) return obj
  if (typeof obj !== "object") return obj

  const result = {} as AnyObject
  Object.keys(obj).forEach(
    key => (result[camelCase(key)] = normalize(obj[key])),
  )
  return result
}

function adjustKey(obj: AnyObject) {
  if (!obj) return obj
  if (typeof obj !== "object") return obj

  const result = {} as AnyObject
  const keys = Object.keys(obj)

  keys.forEach(key => {
    const adjusted = adjustKey(obj[key])

    if (!key.includes("/")) return (result[key] = adjusted)
    key.split("/").reduceRight((accu, item) => ({ [item]: accu }), adjusted)
  })

  return result
}
