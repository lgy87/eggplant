import { FocusStyleManager } from "@blueprintjs/core"
import { initializeIcons } from "@fluentui/react"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

FocusStyleManager.onlyShowFocusOnTabs()

initializeIcons(undefined, { disableWarnings: true })

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
)
