import { Spinner, SpinnerSize } from "@fluentui/react"
import Editor, { useMonaco } from "@monaco-editor/react"
import { editor } from "monaco-editor"
import * as r from "ramda"
import React, { FC, memo, useCallback, useEffect, useState } from "react"
import Page from "~/components/Page"
import type { EmptyObject } from "~/global"
import useElectron from "~/hooks/useElectron"
import CommandBar from "./CommandBar"
import styles from "./styles.module.css"

const loading = <Spinner size={SpinnerSize.large} label="Loading..." />

const Create: FC<EmptyObject> = () => {
  const monaco = useMonaco()
  const electron = useElectron()
  const [path, setPath] = useState<string | undefined>()
  const [value, setValue] = useState("")

  useEffect(() => {
    if (r.isNil(monaco)) return

    import("~/vendors/monaco-editor-themes/Solarized-light.json").then(data => {
      monaco.editor.defineTheme("monokai", data as editor.IStandaloneThemeData)
      monaco.editor.setTheme("monokai")
    })
  }, [monaco])

  const open = useCallback(() => {
    electron.file
      .open()
      .then(([path, content]) => {
        setPath(path)
        setValue(content)
      })
      .catch(console.log)
  }, [electron.file])

  const saveAs = useCallback(() => {
    electron.file.saveAs(value, {}).then(path => setPath(path), [])
  }, [electron.file, value])

  const saveFile = useCallback(() => {
    if (path) {
      return electron.file
        .save(path, value)
        .then(() => console.log("save successfully!"))
        .catch((e: any) => console.error("save failed！", e))
    }
  }, [electron.file, path, value])

  const save = useCallback(async () => {
    try {
      if (r.isNil(path)) await saveAs()

      await saveFile()
      console.log("save successfully")
    } catch (e) {
      console.log(e, "save failed!")
    }
  }, [path, saveAs, saveFile])

  return (
    <Page>
      <CommandBar open={open} save={save} saveAs={saveAs} />
      <Editor
        language="javascript"
        className={styles.editor}
        loading={loading}
        value={value}
        options={{
          scrollbar: { horizontal: "hidden" },
          renderLineHighlight: "line",
          acceptSuggestionOnCommitCharacter: true,
          acceptSuggestionOnEnter: "on",
          accessibilitySupport: "auto",
          autoIndent: "keep",
          automaticLayout: true,
          codeLens: true,
          colorDecorators: true,
          lineHeight: 24,
          contextmenu: true,
          cursorBlinking: "blink",
          cursorSmoothCaretAnimation: false,
          cursorStyle: "line",
          disableLayerHinting: false,
          disableMonospaceOptimizations: false,
          dragAndDrop: false,
          fixedOverflowWidgets: false,
          folding: true,
          foldingStrategy: "auto",
          fontLigatures: false,
          formatOnPaste: false,
          formatOnType: false,
          hideCursorInOverviewRuler: false,
          highlightActiveIndentGuide: true,
          links: true,
          mouseWheelZoom: false,
          multiCursorMergeOverlapping: true,
          multiCursorModifier: "alt",
          overviewRulerBorder: true,
          overviewRulerLanes: 2,
          quickSuggestions: true,
          quickSuggestionsDelay: 100,
          readOnly: false,
          renderControlCharacters: false,
          renderFinalNewline: true,
          renderIndentGuides: true,
          renderWhitespace: "none",
          revealHorizontalRightPadding: 30,
          roundedSelection: true,
          rulers: [],
          scrollBeyondLastColumn: 5,
          scrollBeyondLastLine: true,
          selectOnLineNumbers: true,
          selectionClipboard: true,
          selectionHighlight: true,
          showFoldingControls: "mouseover",
          smoothScrolling: false,
          suggestOnTriggerCharacters: true,
          wordBasedSuggestions: true,
          wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
          wordWrap: "off",
          wordWrapBreakAfterCharacters: "\t})]?|&,;",
          wordWrapBreakBeforeCharacters: "{([+",
          wordWrapColumn: 80,
          wrappingIndent: "none",
        }}
      />
    </Page>
  )
}

export default memo(Create)
