import { Button, Icon } from "@blueprintjs/core"
import cx from "classnames"
import React, { ComponentProps, FC, Fragment, memo, useCallback } from "react"
import { useCopyToClipboard, useTitle } from "react-use"
import { Box, Flex } from "rebass"
import logoPNG from "~/assets/images/logo.png"
import A from "~/components/A"
import { EmptyObject } from "~/global"
import useElectron from "~/hooks/useElectron"
import useWindowSize from "~/hooks/useWindowSize"
import toaster from "~/utils/toaster"
import { libraries } from "./configs"
import styles from "./styles.module.css"

const logo = <img src={logoPNG} width={100} className="opacity-80" />
const title = <h1 className={styles.header}>Rime Settings</h1>
const version = <p>0.0.1</p>

function Title() {
  return (
    <h1 className={styles.header}>
      李光耀<sub className={styles.sub}>作品</sub>
    </h1>
  )
}

function SubTitle() {
  return (
    <h2 className={styles.subTitle}>
      热爱技术，喜欢探求复杂问题的简单解决方案！
    </h2>
  )
}

function Header() {
  return (
    <>
      <Title />
      <SubTitle />
    </>
  )
}

const Caption: FC<{ value: string }> = props => {
  return <caption className="text-left font-bold">{props.value}</caption>
}

type RowProps = { title: string }
const Row: FC<RowProps> = ({ title, children }) => {
  return (
    <tr>
      <td className={styles.thead}>{title}</td>
      <td>{children}</td>
    </tr>
  )
}

type TableProps = { caption: string }
const Table: FC<TableProps> = ({ caption, children }) => {
  return (
    <table>
      <Caption value={caption} />
      <tbody>{children}</tbody>
    </table>
  )
}

const klass = cx(styles.about, "select-none")
const header = <Header />

function WhatIUsed() {
  const electron = useElectron()
  const openWebsite = electron.shell.openExternal
  const { length } = libraries

  return (
    <Table caption="使用的技术:">
      <Row title="Library:">
        {libraries.map(({ name, homepage }, index) => (
          <Fragment key={name}>
            <A className={styles.link} onClick={() => openWebsite(homepage)}>
              {name}
            </A>
            {index !== length - 1 && ", "}
          </Fragment>
        ))}
      </Row>
    </Table>
  )
}
const whatIUsed = <WhatIUsed />

type ButtonProps = ComponentProps<typeof Button>
const Button_: FC<ButtonProps> = props => {
  return <Button small className={styles.button} {...props} />
}

const CopyButton: FC<ButtonProps> = ({ value, ...restProps }) => {
  const [, copyToClipboard] = useCopyToClipboard()

  const copy = useCallback(() => {
    copyToClipboard(value as string)
    toaster.primary({
      message: "Copy successfully!",
      timeout: 1000,
    })
  }, [copyToClipboard, value])

  return <Button_ icon="clipboard" onClick={copy} {...restProps} />
}

const emailMe = (
  <Button small title="Email Me" className={styles.button}>
    <a href="mailto: lgy87@foxmail.com">
      <Icon icon="envelope" />
    </a>
  </Button>
)

type Row_Props = RowProps & { value: string }
const Row_: FC<Row_Props> = ({ title, value, children }) => {
  return (
    <Row title={title + ":"}>
      {value}
      <CopyButton title={"Copy " + title} value={value} />
      {children}
    </Row>
  )
}

const qq = <Row_ title="QQ" value="759646703" />
const wechat = <Row_ title="WeChat" value="759646703" />
const email = (
  <Row_ title="Email" value="lgy87@foxmail.com">
    {emailMe}
  </Row_>
)

const About: FC<EmptyObject> = () => {
  useWindowSize(326, 501)
  useTitle("About")

  return (
    <Box className={klass}>
      <Flex className={styles.summary}>
        <Box>{logo}</Box>
        <Box className="text-center flex-grow pt-6">
          {title}
          {version}
        </Box>
      </Flex>
      {header}
      <Table caption="联系我:">
        {qq}
        {wechat}
        {email}
      </Table>
      {whatIUsed}
    </Box>
  )
}

export default memo(About)
