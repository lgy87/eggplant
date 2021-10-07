import * as r from "ramda"

export enum Modes {
  prod = "production",
  dev = "development",
  test = "test",
}

export type Mode = Readonly<{
  current: string
  isProd: boolean
  isDev: boolean
  isTest: boolean
  isNotProd: boolean
  isNotDev: boolean
  isNotTest: boolean
}>

export function factory(process: NodeJS.Process): Mode {
  const current = r.pathOr(Modes.prod, ["env", "NODE_ENV"], process)
  const isMode = r.equals(current)

  const isProd = isMode(Modes.prod)
  const isDev = isMode(Modes.dev)
  const isTest = isMode(Modes.test)

  return {
    current,
    isProd,
    isDev,
    isTest,
    isNotProd: r.not(isProd),
    isNotDev: r.not(isDev),
    isNotTest: r.not(isTest),
  }
}

export default factory(process)
