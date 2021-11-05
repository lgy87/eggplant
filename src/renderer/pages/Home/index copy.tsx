import { Button } from "@blueprintjs/core"
import React, { FC, memo } from "react"
import { useNavigate } from "react-router-dom"
import { useTitle } from "react-use"
import { Box, Flex } from "rebass"
import Page from "~/components/Page"
import { EmptyObject } from "~/global"
import useWindowSize from "~/hooks/useWindowSize"
import styles from "./styles.module.css"

const Home: FC<EmptyObject> = () => {
  const navigate = useNavigate()

  useWindowSize(240, 200)
  useTitle("Home")

  return (
    <Page goBack={false}>
      <Flex
        className="h-screen"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box className="w-4/5">
          <Button
            fill
            className={styles.btn}
            onClick={() => navigate("/theme")}
          >
            Color Theme
          </Button>
          <Button fill className={styles.btn}>
            Color Theme
          </Button>
          <Button
            fill
            className={styles.btn}
            onClick={() => navigate("/shortcuts")}
          >
            Shortcuts
          </Button>
        </Box>
      </Flex>
    </Page>
  )
}

export default memo(Home)
