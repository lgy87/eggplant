declare global {
  interface Window {
    __wxjs_environment?: "miniprogram"
  }
}

const platforms = {
  sunflower: /sunflower/i,
  wechat: /MicroMessenger/i,
  chanjet: /chanjet/i,
  qiandaola: /qiandaola/i,
  qq: /qq/i,
  wechatMiniProgram: /miniProgram/,
}

export type Platform = Readonly<{
  sunflower: boolean
  wechat: boolean
  chanjet: boolean
  qiandaola: boolean
  qq: boolean
  wechatMiniProgram: boolean
}>

export function factory(ua: string): Platform {
  const detect = (re: RegExp) => re.test(ua)

  const sunflower = detect(platforms.sunflower)
  const wechat = detect(platforms.wechat)
  const chanjet = detect(platforms.chanjet)
  const qiandaola = detect(platforms.qiandaola)
  const qq = detect(platforms.qq)
  const wechatMiniProgram =
    detect(platforms.wechatMiniProgram) ||
    // eslint-disable-next-line no-underscore-dangle
    window.__wxjs_environment === "miniprogram"

  return {
    sunflower,
    wechat,
    chanjet,
    qiandaola,
    qq,
    wechatMiniProgram,
  }
}

export default factory(window.navigator.userAgent)
