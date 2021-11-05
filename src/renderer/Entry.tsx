import { FocusStyleManager, useHotkeys } from "@blueprintjs/core"
import React, { useMemo } from "react"
import ReactDOM from "react-dom"
import App from "./App"

FocusStyleManager.onlyShowFocusOnTabs()

ReactDOM.render(<Entry />, document.getElementById("root"))

function Entry() {
  const hotkeys = useMemo(
    () => [
      {
        combo: "cmd + r",
        global: true,
        label: "Reload",
        onKeyDown: () => location.reload(),
      },
    ],
    [],
  )
  const { handleKeyUp } = useHotkeys(hotkeys)

  return (
    <div className="entry" onKeyUp={handleKeyUp}>
      <App />
    </div>
  )
}
