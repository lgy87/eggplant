import React, { lazy, memo } from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import Suspense from "~/components/Suspense"
import Home from "~/pages/Home"
import "./App.css"

const Theme = lazy(() => import("~/pages/Theme"))
const Shortcuts = lazy(() => import("~/pages/Shortcuts"))

function App() {
  return (
    <HashRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/theme" element={<Theme />} />
          <Route path="/shortcuts" element={<Shortcuts />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default memo(App)
