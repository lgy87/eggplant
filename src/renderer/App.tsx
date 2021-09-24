import Editor from "@monaco-editor/react"
import React from "react"

function App() {
  return (
    <Editor
      height="100vh"
      options={{}}
      defaultLanguage="javascript"
      defaultValue="function hello() {"
    />
  )
}

export default App
