import remote from "@electron/remote"

function currentWindow() {
  return remote.getCurrentWindow()
}

export async function setSize(width: number, height: number, animate = true) {
  return currentWindow().setSize(width, height, animate)
}

export async function getSize() {
  return currentWindow().getSize()
}

export async function setPosition(x: number, y: number, animate = true) {
  return currentWindow().setPosition(x, y, animate)
}

export async function getPosition() {
  return currentWindow().getPosition()
}
