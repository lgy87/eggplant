import Editor, { useMonaco } from "@monaco-editor/react"
import DOMPurify from "dompurify"
import marked from "marked"
import { editor } from "monaco-editor"
import * as r from "ramda"
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Fill, LeftResizable, Top, ViewPort } from "react-spaces"
import Page from "~/components/Page"
import type { EmptyObject } from "~/global"
import useCachedState from "~/hooks/useCachedState"
import useElectron from "~/hooks/useElectron"
import toaster from "~/utils/toaster"
import CommandBar from "./CommandBar"
import { views } from "./configs"
import Preview from "./Preview"

const Create: FC<EmptyObject> = () => {
  const monaco = useMonaco()
  const electron = useElectron()
  const [path, setPath] = useState<string | undefined>()
  const [value, setValue] = useState("")
  const [view, setView] = useState(views.both)
  const [leftViewSize, setLeftViewSize] = useCachedState(
    "code-view-width",
    "50%",
  )
  const originalValue = useRef("")

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
        originalValue.current = content
      })
      .catch(console.log)
  }, [electron.file])

  const saveAs = useCallback(async () => {
    return electron.file
      .saveAs(value, {
        defaultPath: path,
        filters: [{ name: "All Files", extensions: ["*"] }],
      })
      .then(path => setPath(path))
      .then(() => (originalValue.current = value))
  }, [electron.file, path, value])

  const saveFile = useCallback(async () => {
    if (value === originalValue.current) return

    return electron.file
      .save(path!, value)
      .then(() => (originalValue.current = value))
  }, [electron.file, path, value])

  const save = useCallback(async () => {
    try {
      await (r.isNil(path) ? saveAs() : saveFile())

      toaster.primary({ message: "Save successfully!" })
    } catch (e) {
      toaster.error({ message: "Save failed!" })
    }
  }, [path, saveAs, saveFile])

  const showCodeOnly = useCallback(() => setView(views.codeOnly), [])
  const showPreviewOnly = useCallback(() => setView(views.previewOnly), [])
  const showBoth = useCallback(() => setView(views.both), [])

  const Container = useMemo(
    () => (view === views.codeOnly ? Fill : LeftResizable),
    [view],
  )
  const isPreviewOnly = view === views.previewOnly
  const isCodeOnly = view === views.codeOnly
  const html = useMemo(() => DOMPurify.sanitize(marked(value)), [value])

  return (
    <Page>
      <ViewPort>
        <Top size={37}>
          <CommandBar
            view={view}
            open={open}
            save={save}
            saveAs={saveAs}
            showCodeOnly={showCodeOnly}
            showPreviewOnly={showPreviewOnly}
            showBoth={showBoth}
          />
        </Top>
        <Fill>
          {isPreviewOnly || (
            <Container size={leftViewSize} onResizeEnd={setLeftViewSize as any}>
              <Editor
                language="markdown"
                value={value}
                onChange={setValue as any}
              />
            </Container>
          )}
          {isCodeOnly || (
            <Fill>
              <Preview html={html} />
            </Fill>
          )}
        </Fill>
      </ViewPort>
    </Page>
  )
}

export default memo(Create)
