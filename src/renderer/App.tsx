import React, { lazy, memo } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Suspense from "~/components/Suspense"
import "./App.css"

const Home = lazy(() => import("~/pages/Home"))
const Tags = lazy(() => import("~/pages/Tags"))
const Notes = lazy(() => import("~/pages/Notes"))

function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags/*" element={<Tags />} />
          <Route path="/notes/*" element={<Notes />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default memo(App)
