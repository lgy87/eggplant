import * as r from "ramda"
import * as ra from "ramda-adjunct"

export enum Devices {
  web = "web",
  android = "android",
  iPhone = "iPhone",
  iPad = "iPad",
}

export type Device = Readonly<{
  isWeb: boolean
  isAndroid: boolean
  isIPhone: boolean
  isIPad: boolean
  isNotWeb: boolean
  isNotAndroid: boolean
  isNotIPhone: boolean
  isNotIPad: boolean
}>

export function factory(ua: string): Device {
  const detect = (device: string) => new RegExp(device, "i").test(ua)

  const isAndroid = detect(Devices.android)
  const isIPhone = detect(Devices.iPhone)
  const isIPad = detect(Devices.iPad)
  const isWeb = r.all(ra.isFalse, [isAndroid, isIPhone, isIPad])

  return {
    isWeb,
    isAndroid,
    isIPhone,
    isIPad,
    isNotWeb: r.not(isWeb),
    isNotAndroid: r.not(isAndroid),
    isNotIPhone: r.not(isIPhone),
    isNotIPad: r.not(isIPad),
  }
}

export default factory(window.navigator.userAgent)
