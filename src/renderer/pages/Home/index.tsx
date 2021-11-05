import React, { FC, memo } from "react"
import { useNavigate } from "react-router-dom"
import { useTitle } from "react-use"
import Page from "~/components/Page"
import Tabs from "~/components/Tabs"
import { EmptyObject } from "~/global"
import useWindowSize from "~/hooks/useWindowSize"

const Home: FC<EmptyObject> = () => {
  const navigate = useNavigate()

  useWindowSize(240, 200)
  useTitle("Home")

  return (
    <Page goBack={false}>
      <Tabs></Tabs>
    </Page>
  )
}

export default memo(Home)
