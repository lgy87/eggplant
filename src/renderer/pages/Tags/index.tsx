import React, { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const Create = lazy(() => import("./Create"))

export default () => {
  return (
    <Routes>
      <Route path="create" element={<Create />} />
    </Routes>
  )
}
