import { Icon, IconName } from "@blueprintjs/core"
import cx from "classnames"
import React, { FC, memo, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffectOnce } from "react-use"
import { Flex } from "rebass"
import { EmptyObject, Fn } from "~/global"
import { tabs } from "./configs"
import styles from "./styles.module.css"

type SelectHandler = Fn<number, void>
type Props = {
  active?: boolean
  icon: IconName
  text: string
  index: number
  onSelect?: SelectHandler
}

const klass = cx(
  "border-solid",
  "border-b",
  "border-gray-300",
  styles.navigation,
)
const Navigation: FC<EmptyObject> = () => {
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleSelect: SelectHandler = useCallback(
    index => {
      setSelectedIndex(index)
      navigate(tabs[index]?.text)
    },
    [navigate],
  )

  useEffectOnce(() => {
    navigate(tabs[selectedIndex]?.text)
  })

  return (
    <Flex className={klass}>
      {tabs.map(({ icon, text }, index) => (
        <MemoItem
          key={text}
          index={index}
          text={text}
          icon={icon}
          active={index === selectedIndex}
          onSelect={handleSelect}
        />
      ))}
    </Flex>
  )
}

const Item: FC<Props> = ({ active, index, icon, text, onSelect }) => {
  const klass = cx(
    "rounded-md",
    "cursor-pointer",
    "select-none",
    styles.tab,
    active && styles.active,
  )

  const handleClick = useCallback(() => onSelect?.(index), [index, onSelect])

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      className={klass}
      onClick={handleClick}
    >
      <Icon icon={icon} size={20} />
      {captialize(text)}
    </Flex>
  )
}

const MemoItem = memo(Item)
export default memo(Navigation)

function captialize(s: string) {
  return s[0].toUpperCase() + s.slice(1)
}
