import { app, BrowserWindow, Menu, MenuItem } from "electron"
import { capitalize, platform } from "./utils"

const file = {
  label: "File",
  submenu: [
    {
      label: "New File",
      accelerator: "CmdOrCtrl + N",
      click() {},
    },
    {
      label: "Open File",
      accelerator: "CmdOrCtrl + O",
      click() {},
    },
    {
      label: "Save File",
      accelerator: "CmdOrCtrl + S",
    },
    {
      label: "Save File As...",
      accelerator: "Shift + CmdOrCtrl + S",
    },
    { type: "separator" },
    {
      label: "Export HTML",
      accelerator: "Shift + CmdOrCtrl + Alt + S",
    },
  ],
}
const edit = {
  label: "Edit",
  submenu: [
    {
      label: "Undo",
      accelerator: "CmdOrCtrl + Z",
      role: "undo",
    },
    {
      label: "Redo",
      accelerator: "Shift + CmdOrCtrl + Z",
      role: "undo",
    },
    {
      type: "separator",
    },
    {
      label: "Cut",
      accelerator: "CmdOrCtrl + X",
      role: "cut",
    },
    {
      label: "Copy",
      accelerator: "CmdOrCtrl + C",
      role: "copy",
    },
    {
      label: "Paste",
      accelerator: "CmdOrCtrl + V",
      role: "paste",
    },
    {
      type: "separator",
    },
    {
      label: "Select All",
      accelerator: "CmdOrCtrl + A",
      role: "selectall",
    },
  ],
}

const windowOnMac = [
  { type: "separator" },
  { label: "Bring All to Front", role: "role" },
]

const window = {
  label: "Window",
  role: "window",
  submenu: [
    {
      label: "Minimize",
      accelerator: "CmdOrCtrl + M",
      role: "minimize",
    },
    {
      label: "Close",
      accelerator: "CmdOrCtrl + W",
      role: "close",
    },
    ...(platform.mac ? windowOnMac : []),
  ],
}

const help = {
  label: "Help",
  role: "help",
  submenu: [
    { type: "separator" },
    {
      label: "Toggle Developer Tools",
      click(_: unknown, focusedWindow: BrowserWindow) {
        focusedWindow && focusedWindow.webContents.openDevTools()
      },
    },
  ],
}

const template = [file, edit, window, help] as unknown as Array<MenuItem>

if (platform.mac) {
  const appName = capitalize(app.getName())

  const application = {
    label: app.getName(),
    submenu: [
      {
        label: `About ${appName}`,
        role: "about",
      },
      { type: "separator" },
      {
        label: "Services",
        role: "services",
        submenu: [],
      },
      {
        label: `Hide ${appName}`,
        accelerator: "Cmd + Alt + H",
        role: "hide",
      },
      {
        label: "Show All",
        role: "unhide",
      },
      {
        type: "separator",
      },
      {
        label: `Quit ${appName}`,
        accelerator: "Cmd + Q",
        click: app.quit,
      },
    ],
  } as unknown as MenuItem

  template.unshift(application)
}

export default Menu.buildFromTemplate(template)
