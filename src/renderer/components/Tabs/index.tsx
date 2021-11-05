import React, { memo } from "react"
import { Flex } from "rebass"

const Tabs = props => {
  return (
    <Flex className="!mx-8 !my-8" style={{ border: "1px solid red" }}>
      <Flex></Flex>
      <Flex></Flex>
    </Flex>
  )
}

export default memo(Tabs)
