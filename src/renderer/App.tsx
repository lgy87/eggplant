import React, { memo } from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import Suspense from "~/components/Suspense"
import Home from "~/pages/Home"
import "./App.css"

function App() {
  return (
    <HashRouter>
      <Suspense>
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default memo(App)
