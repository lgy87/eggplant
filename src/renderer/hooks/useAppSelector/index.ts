import { TypedUseSelectorHook, useSelector } from "react-redux"
import { RootState } from "~/store"

const useAppSelector = useSelector
export default useAppSelector as TypedUseSelectorHook<RootState>
