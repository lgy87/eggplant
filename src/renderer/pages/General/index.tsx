import { FormGroup, Radio, RadioGroup, Slider } from "@blueprintjs/core"
import React, { FC, memo, useCallback, useState } from "react"
import { useTitle } from "react-use"
import useWindowSize from "~/hooks/useWindowSize"
import Label from "../Theme/Label"

const orientationLabel = <Label>Orientation:</Label>
const candidatesLabel = <Label>Candidates: </Label>

const General: FC<{}> = props => {
  const [candidates, setCandidates] = useState(8)
  useWindowSize(500, 600)
  useTitle("General")

  const handleChange = useCallback((x, b) => {
    console.log(x, b)
  }, [])

  const handleCandidatesChange = useCallback((value: number) => {
    setCandidates(value)
  }, [])

  return (
    <>
      <FormGroup label={orientationLabel} inline>
        <RadioGroup inline onChange={handleChange}>
          <Radio label="Vertical" value="0" />
          <Radio label="Horizontal" value="1" />
        </RadioGroup>
      </FormGroup>
      <FormGroup label={candidatesLabel} inline helperText="No. of candidates">
        <Slider
          min={3}
          max={9}
          data-field="sfasd"
          value={candidates}
          intent="primary"
          onChange={handleCandidatesChange}
        />
      </FormGroup>
    </>
  )
}

export default memo(General)
