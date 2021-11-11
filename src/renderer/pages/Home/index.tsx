import cx from "classnames"
import React, { FC, memo } from "react"
import { Route, Routes } from "react-router-dom"
import { useTitle } from "react-use"
import Page from "~/components/Page"
import { EmptyObject } from "~/global"
import useWindowSize from "~/hooks/useWindowSize"
import About from "../About"
import General from "../General"
import Theme from "../Theme"
import Navigation from "./Navigation"
import styles from "./styles.module.css"

const klass = cx("overflow-y-scroll", styles.content)

const Home: FC<EmptyObject> = () => {
  useWindowSize(540, 300)
  useTitle("Home")

  return (
    <Page goBack={false}>
      <Navigation />
      <div className={klass}>
        <Routes>
          <Route path="theme" element={<Theme />} />
          <Route path="general" element={<General />} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    </Page>
  )
}

export default memo(Home)
