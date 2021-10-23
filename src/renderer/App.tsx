import React, { lazy, memo } from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import Suspense from "~/components/Suspense"
import Home from "~/pages/Home"
import "./App.css"

const Tags = lazy(() => import("~/pages/Tags"))
const Notes = lazy(() => import("~/pages/Notes"))
const Settings = lazy(() => import("~/pages/Settings"))

function App() {
  return (
    <HashRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags/*" element={<Tags />} />
          <Route path="/notes/*" element={<Notes />} />
          <Route path="/settings/*" element={<Settings />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default memo(App)
