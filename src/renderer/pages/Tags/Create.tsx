import { Button, Divider, FormGroup, InputGroup, Tag } from "@blueprintjs/core"
import cx from "classnames"
import React, {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useMemo,
  useReducer,
  useRef,
} from "react"
import { useEffectOnce, useSetState } from "react-use"
import Page from "~/components/Page"
import { EmptyObject } from "~/global"
import useDB from "~/hooks/useDB"
import formatDateTime from "~/utils/format"
import nextIDs from "~/utils/nextIDs"
import r from "~/utils/r"
import styles from "./styles.module.css"

const submitClassNames = cx(styles.submit, "ml-auto")

type Fields = {
  ID: number
  name: string
  description?: string
  createdAt?: number
}

const DB_KEY = "tags"
const defaultFields = r.always({ name: "", description: "" })

const Create: FC<EmptyObject> = () => {
  const now = useMemo(() => formatDateTime(Date.now()), [])
  const db = useDB()
  const [fields, setFields] = useSetState(defaultFields() as Fields)
  const tags = useRef([] as Array<Fields>)
  const [, forceUpdate] = useReducer(r.inc, 0)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { target } = e
      const field = target.getAttribute("data-field") as keyof Fields
      const { value } = target

      setFields({ [field]: value })
    },
    [setFields],
  )

  const add = useCallback(async () => {
    const nextTagID = await nextIDs.tagID()
    tags.current.push({
      ...fields,
      ID: nextTagID,
      createdAt: Date.now(),
    })

    try {
      await db.put(DB_KEY, tags.current)
      setFields(defaultFields())
      await nextIDs.updateTagID()
    } catch (e) {
      console.error(e)
    }
  }, [db, fields, setFields])

  const remove = useCallback(
    async (ID: number) => {
      const removed = r.reject(r.propEq("ID", ID), tags.current)
      await db.put(DB_KEY, removed)
      tags.current = removed
      forceUpdate()
    },
    [db],
  )

  useEffectOnce(() => {
    db.get(DB_KEY)
      .then(items => (tags.current = items))
      .then(forceUpdate)
  })

  return (
    <Page className={styles.page}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 500,
          margin: "0 auto",
        }}
      >
        <FormGroup label="Tag Name" labelInfo="(required)">
          <InputGroup
            data-field="name"
            value={fields.name}
            onChange={handleChange}
            leftIcon="tag"
          />
        </FormGroup>
        <FormGroup label="Description">
          <InputGroup
            data-field="description"
            value={fields.description}
            onChange={handleChange}
            leftIcon="comment"
          />
        </FormGroup>
        <FormGroup label="Create At">
          <InputGroup
            data-field="description"
            value={now}
            onChange={handleChange}
            leftIcon="time"
            disabled
          />
        </FormGroup>
        <Button
          intent="primary"
          className={submitClassNames}
          onClick={add}
          disabled={fields?.name?.length <= 0}
        >
          Submit
        </Button>
        <Divider className={styles.divider}></Divider>
        <div>
          {tags?.current.map((tag, index) => {
            return (
              <Tag
                key={index}
                large
                minimal
                intent="primary"
                onRemove={() => remove(tag.ID)}
                className={styles.tag}
                title={tag?.description}
              >
                {tag.name}
              </Tag>
            )
          })}
        </div>
      </div>
    </Page>
  )
}

export default memo(Create)
