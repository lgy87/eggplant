import { Button } from "@blueprintjs/core"
import React, { FC, memo } from "react"
import { Box, Flex } from "rebass"
import Page from "~/components/Page"
import useWindowSize from "~/hooks/useWindowSize"

const Shortcuts: FC<{}> = props => {
  useWindowSize(300, 200)

  return (
    <Page>
      <Flex className="justify-center">
        <Box className="w-4/5">
          <Button fill>Click me to Record...</Button>
        </Box>
      </Flex>
    </Page>
  )
}

export default memo(Shortcuts)
