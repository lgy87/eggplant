import { ipcRenderer } from "electron"
import FROM_RENDERER from "~/configs/electron"
import uuid from "~/utils/uuid"

function ipcGet(ipcObject: AnyObject, domain: string) {
  if (ipcObject[domain]) return ipcObject[domain]

  function topicGet(domainObject: AnyObject, topic: string) {
    if (domainObject[topic]) return domainObject[topic]

    function fnGet(topicObject: AnyObject, fn: string) {
      topicObject[fn] = (...args: Array<unknown>) =>
        new Promise(resolve => {
          const sid = uuid()

          ipcRenderer
            .once(sid, (_, resp) => resolve(resp))
            .send(FROM_RENDERER, `${domain}/${topic}#${fn}`, sid, ...args)
        })

      return topicObject[fn]
    }

    domainObject[topic] = new Proxy({}, { get: fnGet })
    return domainObject[topic]
  }

  ipcObject[domain] = new Proxy({}, { get: topicGet })
  return ipcObject[domain]
}

export default new Proxy({}, { get: ipcGet }) as any
